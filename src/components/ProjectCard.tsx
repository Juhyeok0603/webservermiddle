import Image from 'next/image';
import { Project } from '../data/projects';

function GitHubIcon({ className = 'inline-block w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.55 0-.27-.01-1-.02-1.95-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.45.11-3.02 0 0 .97-.31 3.18 1.18a11.03 11.03 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.5 3.17-1.18 3.17-1.18.63 1.57.24 2.73.12 3.02.74.81 1.18 1.83 1.18 3.09 0 4.43-2.69 5.4-5.25 5.69.41.36.77 1.07.77 2.16 0 1.56-.01 2.82-.01 3.2 0 .3.2.66.79.55C20.71 21.38 24 17.08 24 12 24 5.73 18.27.5 12 .5z" />
    </svg>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const isGitHub = typeof project.id === 'string' && project.id.startsWith('gh-');

  if (isGitHub) {
    return (
      <article className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white/90">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
              <a href={project.link} className="hover:underline text-black">{project.title}</a>
            </h3>
            {project.description && <p className="text-sm text-gray-700 mb-2">{project.description}</p>}
            {project.tech && <p className="text-xs text-gray-500">{project.tech.join(' · ')}</p>}
          </div>
          <div className="flex-shrink-0 ml-3">
            <a href={project.link} aria-label={`Open ${project.title} on GitHub`} className="text-gray-700 hover:text-black">
              <GitHubIcon className="w-6 h-6 text-black" />
            </a>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="border rounded-lg p-4 flex gap-4 items-start hover:shadow-md transition-shadow bg-white/90">
      <div className="w-28 h-20 rounded overflow-hidden bg-gray-100 flex-shrink-0">
        {project.image ? (
          <Image src={project.image} alt={project.title} width={160} height={120} className="object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-1 text-black">{project.title}</h3>
        <p className="text-sm text-gray-700 mb-2">{project.description}</p>
        {project.tech && (
          <p className="text-xs text-gray-500">{project.tech.join(' · ')}</p>
        )}
        {project.link && (
          <p className="mt-2"><a className="text-sm text-blue-600 underline" href={project.link}>바로가기</a></p>
        )}
      </div>
    </article>
  );
}
