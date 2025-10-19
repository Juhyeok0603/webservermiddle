export type Project = {
  id: string;
  title: string;
  description: string;
  tech?: string[];
  link?: string;
  image?: string;
};

export const projects: Project[] = [];
