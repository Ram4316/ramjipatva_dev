"use client";

import { useState, useEffect, useRef } from "react";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  images: string[];
  technologies: string[];
  features: string[];
  liveUrl: string;
  githubUrl: string;
  status: "Completed" | "In Progress";
}

const EMPTY: Omit<Project, "id"> = {
  title: "",
  category: "Full Stack",
  description: "",
  longDescription: "",
  images: [],
  technologies: [],
  features: [],
  liveUrl: "",
  githubUrl: "",
  status: "Completed",
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [reordering, setReordering] = useState(false);
  const [toast, setToast] = useState("");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<Project, "id">>(EMPTY);
  const [techInput, setTechInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // Drag state
  const dragIndex = useRef<number | null>(null);
  const dragOverIndex = useRef<number | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const login = async () => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      loadProjects();
    } else {
      setLoginError("Wrong password");
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setProjects([]);
  };

  const loadProjects = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/projects");
    if (res.ok) setProjects(await res.json());
    setLoading(false);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    return data.url;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const url = await uploadImage(file);
      urls.push(url);
    }
    setForm(f => ({ ...f, images: [...f.images, ...urls] }));
    setUploading(false);
    showToast(`${urls.length} image(s) uploaded`);
  };

  const removeImage = (idx: number) => {
    setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));
  };

  const addTech = () => {
    if (techInput.trim()) {
      setForm(f => ({ ...f, technologies: [...f.technologies, techInput.trim()] }));
      setTechInput("");
    }
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setForm(f => ({ ...f, features: [...f.features, featureInput.trim()] }));
      setFeatureInput("");
    }
  };

  const openAdd = () => {
    setEditingProject(null);
    setForm(EMPTY);
    setTechInput("");
    setFeatureInput("");
    setShowForm(true);
  };

  const openEdit = (p: Project) => {
    setEditingProject(p);
    setForm({ ...p });
    setTechInput("");
    setFeatureInput("");
    setShowForm(true);
  };

  const saveProject = async () => {
    if (!form.title || !form.description) return showToast("Title and description required");
    setSaving(true);
    if (editingProject) {
      await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: editingProject.id }),
      });
      showToast("Project updated ✓");
    } else {
      await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      showToast("Project added ✓");
    }
    setSaving(false);
    setShowForm(false);
    loadProjects();
  };

  const deleteProject = async (id: number) => {
    await fetch("/api/admin/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setDeleteConfirm(null);
    showToast("Project deleted ✓");
    loadProjects();
  };

  // Drag handlers
  const handleDragStart = (index: number) => {
    dragIndex.current = index;
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    dragOverIndex.current = index;
  };

  const handleDrop = async () => {
    const from = dragIndex.current;
    const to = dragOverIndex.current;
    if (from === null || to === null || from === to) return;

    const reordered = [...projects];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(to, 0, moved);
    setProjects(reordered);

    dragIndex.current = null;
    dragOverIndex.current = null;

    // Save new order to GitHub
    setReordering(true);
    await fetch("/api/admin/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reordered: true, projects: reordered }),
    });
    setReordering(false);
    showToast("Order saved ✓");
  };

  useEffect(() => {
    fetch("/api/admin/projects").then(r => {
      if (r.ok) { setAuthed(true); loadProjects(); }
    });
  }, []);

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 shadow-xl">
          <h1 className="text-2xl font-bold mb-2 text-center">Admin Panel</h1>
          <p className="text-muted-foreground text-sm text-center mb-6">ramjipatva.dev</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && login()}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          {loginError && <p className="text-red-500 text-xs mb-3">{loginError}</p>}
          <button onClick={login} className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg text-sm animate-in fade-in">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div>
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <p className="text-xs text-muted-foreground">ramjipatva.dev — Projects Manager</p>
        </div>
        <div className="flex gap-3 items-center">
          {reordering && <span className="text-xs text-muted-foreground">Saving order...</span>}
          <a href="/" target="_blank" className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-muted transition-colors">
            View Site →
          </a>
          <button onClick={logout} className="px-4 py-2 bg-muted rounded-lg text-sm hover:bg-muted/80 transition-colors">
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-primary">{projects.length}</div>
            <div className="text-xs text-muted-foreground mt-1">Total Projects</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-green-500">{projects.filter(p => p.status === "Completed").length}</div>
            <div className="text-xs text-muted-foreground mt-1">Completed</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-yellow-500">{projects.filter(p => p.status === "In Progress").length}</div>
            <div className="text-xs text-muted-foreground mt-1">In Progress</div>
          </div>
        </div>

        {/* Projects list */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Projects</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Drag rows to reorder — order reflects on portfolio</p>
          </div>
          <button onClick={openAdd} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            + Add Project
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading...</div>
        ) : (
          <div className="space-y-2">
            {projects.map((p, index) => (
              <div
                key={p.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={e => handleDragOver(e, index)}
                onDrop={handleDrop}
                className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 cursor-grab active:cursor-grabbing hover:border-primary/30 transition-colors"
              >
                {/* Drag handle */}
                <div className="text-muted-foreground/40 hover:text-muted-foreground flex-shrink-0 select-none text-lg">
                  ⠿
                </div>

                {/* Order number */}
                <div className="w-6 text-center text-xs text-muted-foreground font-mono flex-shrink-0">
                  {index + 1}
                </div>

                {/* Thumbnail */}
                <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                  {p.images?.[0] ? (
                    <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No img</div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold truncate text-sm">{p.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${p.status === "Completed" ? "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"}`}>
                      {p.status}
                    </span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full flex-shrink-0">
                      {p.category}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{p.description}</p>
                  <div className="flex gap-1 mt-1.5 flex-wrap">
                    {p.technologies?.slice(0, 4).map(t => (
                      <span key={t} className="text-xs bg-muted px-1.5 py-0.5 rounded">{t}</span>
                    ))}
                    {(p.technologies?.length || 0) > 4 && (
                      <span className="text-xs text-muted-foreground">+{p.technologies.length - 4}</span>
                    )}
                  </div>
                </div>

                {/* Image count */}
                <div className="text-xs text-muted-foreground flex-shrink-0">
                  {p.images?.length || 0} img{(p.images?.length || 0) !== 1 ? "s" : ""}
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(p)} className="px-3 py-1.5 border border-border rounded-lg text-xs hover:bg-muted transition-colors">
                    Edit
                  </button>
                  {deleteConfirm === p.id ? (
                    <div className="flex gap-1">
                      <button onClick={() => deleteProject(p.id)} className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs">
                        Confirm
                      </button>
                      <button onClick={() => setDeleteConfirm(null)} className="px-3 py-1.5 border border-border rounded-lg text-xs">
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteConfirm(p.id)} className="px-3 py-1.5 border border-red-500/30 text-red-500 rounded-lg text-xs hover:bg-red-500/10 transition-colors">
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center overflow-y-auto py-8 px-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-2xl shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-card rounded-t-2xl z-10">
              <h2 className="text-lg font-semibold">{editingProject ? "Edit Project" : "Add Project"}</h2>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground text-2xl leading-none">×</button>
            </div>

            <div className="p-6 space-y-5">
              {/* Title + Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Title *</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="Project name" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none">
                    {["Full Stack", "Frontend", "Mobile", "SaaS", "Data Visualization"].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Status</label>
                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as "Completed" | "In Progress" }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none">
                  <option>Completed</option>
                  <option>In Progress</option>
                </select>
              </div>

              {/* Short Description */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Short Description *</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  rows={2} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  placeholder="One line description shown on card" />
              </div>

              {/* Long Description */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Full Description</label>
                <textarea value={form.longDescription} onChange={e => setForm(f => ({ ...f, longDescription: e.target.value }))}
                  rows={3} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  placeholder="Detailed description shown in modal" />
              </div>

              {/* Images */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  Images <span className="text-muted-foreground/60">(uploaded to Cloudinary)</span>
                </label>
                <label className={`flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors text-sm text-muted-foreground ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                  {uploading ? "Uploading to Cloudinary..." : "Click to upload images"}
                </label>
                {form.images.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {form.images.map((img, i) => (
                      <div key={i} className="relative group">
                        <img src={img} alt="" className="w-16 h-16 object-cover rounded-lg border border-border" />
                        <button onClick={() => removeImage(i)}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Technologies */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Tech Stack</label>
                <div className="flex gap-2">
                  <input value={techInput} onChange={e => setTechInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTech())}
                    className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none"
                    placeholder="e.g. React (press Enter)" />
                  <button onClick={addTech} className="px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm">Add</button>
                </div>
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {form.technologies.map((t, i) => (
                    <span key={i} className="flex items-center gap-1 bg-muted px-2 py-1 rounded text-xs">
                      {t}
                      <button onClick={() => setForm(f => ({ ...f, technologies: f.technologies.filter((_, j) => j !== i) }))} className="text-muted-foreground hover:text-foreground">×</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Features</label>
                <div className="flex gap-2">
                  <input value={featureInput} onChange={e => setFeatureInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addFeature())}
                    className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none"
                    placeholder="e.g. Real-time updates (press Enter)" />
                  <button onClick={addFeature} className="px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm">Add</button>
                </div>
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {form.features.map((f, i) => (
                    <span key={i} className="flex items-center gap-1 bg-muted px-2 py-1 rounded text-xs">
                      {f}
                      <button onClick={() => setForm(ff => ({ ...ff, features: ff.features.filter((_, j) => j !== i) }))} className="text-muted-foreground hover:text-foreground">×</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* URLs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Live URL</label>
                  <input value={form.liveUrl} onChange={e => setForm(f => ({ ...f, liveUrl: e.target.value }))}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none"
                    placeholder="https://..." />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">GitHub URL</label>
                  <input value={form.githubUrl} onChange={e => setForm(f => ({ ...f, githubUrl: e.target.value }))}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none"
                    placeholder="https://github.com/..." />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-border flex justify-end gap-3 sticky bottom-0 bg-card rounded-b-2xl">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-muted transition-colors">
                Cancel
              </button>
              <button onClick={saveProject} disabled={saving}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
                {saving ? "Saving..." : editingProject ? "Update Project" : "Add Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
