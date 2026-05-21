import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const GITHUB_REPO = process.env.GITHUB_REPO!;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "master";
const FILE_PATH = "public/categories.json";

async function getFileSha(): Promise<{ content: string; sha: string }> {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}?ref=${GITHUB_BRANCH}`,
    { headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, "Cache-Control": "no-cache" } }
  );
  const data = await res.json();
  return { content: Buffer.from(data.content, "base64").toString("utf-8"), sha: data.sha };
}

async function saveToGitHub(categories: string[]) {
  const { sha } = await getFileSha();
  const content = Buffer.from(JSON.stringify(categories, null, 2)).toString("base64");
  await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`,
    {
      method: "PUT",
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Update categories via admin panel",
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

// GET
export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { content } = await getFileSha();
  return NextResponse.json(JSON.parse(content));
}

// POST — add category
export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { name } = await req.json();
  if (!name?.trim()) return NextResponse.json({ error: "Name required" }, { status: 400 });
  const { content } = await getFileSha();
  const categories: string[] = JSON.parse(content);
  if (categories.includes(name.trim())) return NextResponse.json({ error: "Already exists" }, { status: 400 });
  categories.push(name.trim());
  await saveToGitHub(categories);
  return NextResponse.json({ success: true, categories });
}

// DELETE — remove category
export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { name } = await req.json();
  const { content } = await getFileSha();
  const categories: string[] = JSON.parse(content).filter((c: string) => c !== name);
  await saveToGitHub(categories);
  return NextResponse.json({ success: true, categories });
}
