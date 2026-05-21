import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const GITHUB_REPO = process.env.GITHUB_REPO!;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "master";
const FILE_PATH = "public/projects.json";

async function getFileSha(): Promise<{ content: string; sha: string }> {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}?ref=${GITHUB_BRANCH}`,
    { headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, "Cache-Control": "no-cache" } }
  );
  const data = await res.json();
  return { content: Buffer.from(data.content, "base64").toString("utf-8"), sha: data.sha };
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

// PUT — update project
export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const updated = await req.json();
  const { content } = await getFileSha();
  const projects = JSON.parse(content);
  const idx = projects.findIndex((p: { id: number }) => p.id === updated.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  projects[idx] = updated;
  await saveToGitHub(projects);
  return NextResponse.json({ success: true });
}

// DELETE — remove project
export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  const { content } = await getFileSha();
  const projects = JSON.parse(content).filter((p: { id: number }) => p.id !== id);
  await saveToGitHub(projects);
  return NextResponse.json({ success: true });
}
