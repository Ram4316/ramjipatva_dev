import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const GITHUB_REPO = process.env.GITHUB_REPO!;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "master";
const FILE_PATH = "public/projects.json";

async function getFileSha(): Promise<{ content: string; sha: string }> {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}?ref=${GITHUB_BRANCH}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Cache-Control": "no-cache",
      },
    }
  );
  const data = await res.json();
  return {
    content: Buffer.from(data.content, "base64").toString("utf-8"),
    sha: data.sha,
  };
}

async function saveToGitHub(projects: object[]) {
  const { sha } = await getFileSha();
  const content = Buffer.from(JSON.stringify(projects, null, 2)).toString("base64");
  await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Update projects via admin panel",
        content,
        sha,
        branch: GITHUB_BRANCH,
      }),
    }
  );
}

// Extract Cloudinary public_id from URL
function getCloudinaryPublicId(url: string): string | null {
  if (!url.includes("cloudinary.com")) return null;
  // e.g. https://res.cloudinary.com/cloud/image/upload/v123/portfolio/projects/abc.jpg
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
  return match ? match[1] : null;
}

async function deleteCloudinaryImages(images: string[]) {
  for (const url of images) {
    const publicId = getCloudinaryPublicId(url);
    if (publicId) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch {
        // ignore individual failures
      }
    }
  }
}

function isAuthed(req: NextRequest) {
  return req.cookies.get("admin_auth")?.value === "true";
}

// GET — fetch all projects
export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { content } = await getFileSha();
  return NextResponse.json(JSON.parse(content));
}

// POST — add new project
export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const newProject = await req.json();
  const { content } = await getFileSha();
  const projects = JSON.parse(content);
  const maxId = projects.reduce((max: number, p: { id: number }) => Math.max(max, p.id), 0);
  newProject.id = maxId + 1;
  projects.unshift(newProject);
  await saveToGitHub(projects);
  return NextResponse.json({ success: true, project: newProject });
}

// PUT — update project OR reorder (if body has `reordered: true`)
export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();

  // Reorder: body = { reordered: true, projects: [...] }
  if (body.reordered) {
    await saveToGitHub(body.projects);
    return NextResponse.json({ success: true });
  }

  // Normal update
  const { content } = await getFileSha();
  const projects = JSON.parse(content);
  const idx = projects.findIndex((p: { id: number }) => p.id === body.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  projects[idx] = body;
  await saveToGitHub(projects);
  return NextResponse.json({ success: true });
}

// DELETE — remove project + delete Cloudinary images
export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  const { content } = await getFileSha();
  const projects = JSON.parse(content);
  const project = projects.find((p: { id: number }) => p.id === id);

  // Delete Cloudinary images
  if (project?.images?.length) {
    await deleteCloudinaryImages(project.images);
  }

  const updated = projects.filter((p: { id: number }) => p.id !== id);
  await saveToGitHub(updated);
  return NextResponse.json({ success: true });
}
