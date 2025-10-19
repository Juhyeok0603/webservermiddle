"use client";

import { useState } from 'react';
import ProjectCard from './ProjectCard';
import { Project } from '../data/projects';

export default function GitHubGrid({ projects }: { projects: Project[] }) {
  const [expanded, setExpanded] = useState(false);
  const initialCount = 9; // 3 rows x 3 columns

  const visible = expanded ? projects : projects.slice(0, initialCount);

  return (
    <div>
      <div className="projects-grid">
        {visible.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      {projects.length > initialCount && (
        <div className="mt-6 text-center">
          <button
            className="px-5 py-2 rounded-md bg-white border border-gray-300 inline-flex items-center gap-2 shadow-sm hover:shadow-md transition"
            onClick={() => setExpanded((s) => !s)}
          >
            <span className="text-sm text-gray-700">{expanded ? '접기' : `더보기 (${projects.length - initialCount} 더보기)`}</span>
            <svg className={`w-4 h-4 text-gray-600 transform ${expanded ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
