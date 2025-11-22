/**
 * Projects Client Component
 * Example client component for projects page
 */

"use client";

import { useProjects, useDeleteProject, useUpdateProject } from "@/lib/hooks";
import { useProjectsStore } from "@/lib/stores";
import { useEffect, useState } from "react";
import { Trash2, Edit2, FolderKanban } from "lucide-react";

export function ProjectsClient() {
  const { data: projects, isLoading, error, refetch } = useProjects();
  const { mutate: deleteProject } = useDeleteProject();
  const { mutate: updateProject } = useUpdateProject();
  const { setProjects, searchQuery } = useProjectsStore();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    if (projects) {
      setProjects(projects);
    }
  }, [projects, setProjects]);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProject(id);
    }
  };

  const handleEdit = (id: string, currentName: string) => {
    setEditingId(id);
    setEditName(currentName);
  };

  const handleSave = (id: string) => {
    if (editName.trim()) {
      updateProject({ id, name: editName });
      setEditingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 mb-4">Failed to load projects</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  const filteredProjects =
    projects?.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        <p className="text-gray-500 mt-1">
          {filteredProjects.length} project
          {filteredProjects.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="divide-y">
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <FolderKanban className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>No projects found</p>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {editingId === project.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onBlur={() => handleSave(project.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSave(project.id);
                        if (e.key === "Escape") setEditingId(null);
                      }}
                      className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                  ) : (
                    <h3 className="font-medium text-gray-900">
                      {project.name}
                    </h3>
                  )}
                  <p className="text-sm text-gray-500 mt-1">{project.path}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleEdit(project.id, project.name)}
                    className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
                    title="Edit project"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                    title="Delete project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
