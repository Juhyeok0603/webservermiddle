import PortfolioHeader from '../components/PortfolioHeader';
import GitHubGrid from '../components/GitHubGrid';
import { getGitHubRepos } from '../lib/github';
import { Project } from '../data/projects';

export default async function Home() {
  const name = '윤주혁';
  const role = '중부대학교 정보보호학전공';
  const email = 'juhyeok20603@gmail.com';


  const ghUsername = process.env.GITHUB_USERNAME || 'juhyeok0603';
  const ghToken = process.env.GITHUB_TOKEN;

  let ghProjects: Project[] = [];
  try {
    ghProjects = await getGitHubRepos(ghUsername, ghToken);
  } catch (e) {
    console.warn('Failed to fetch GitHub repos', e);
  }

  const projects = ghProjects; 

  return (
    <div className="min-h-screen px-6 py-12 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-4xl mx-auto">
        <PortfolioHeader name={name} role={role} email={email} />

        <main className="mt-8 grid gap-6">
          <section className="card p-6">
            
            <div className="flex flex-wrap gap-4 mt-3">
              <div className="text-sm text-gray-600"><strong>동아리:</strong> 멋쟁이사자처럼 13기</div>
              <div className="text-sm text-gray-600"><strong>기술:</strong> Node.js · Next.js · Python · Express · 웹 보안</div>
              <div className="text-sm text-gray-600"><strong>학력:</strong> 중부대학교 정보보호학과 재학 중</div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">소셜</h3>
              <div className="flex items-center gap-3">
                <a href="https://github.com/juhyeok0603" className="text-sky-600 hover:underline">GitHub</a>
                <a href="https://clerk-app-1-liard.vercel.app/" className="text-sky-600 hover:underline">수업VerCel</a>
              </div>
            </div>
          </section>

          <section className="card p-6">
            <h2 className="text-xl font-semibold mb-4">프로젝트</h2>
            <GitHubGrid projects={projects} />
          </section>

          <section className="text-center text-sm text-gray-600 mt-6">
            <p>이 페이지는 Next.js로 제작되었습니다. 더 궁금한 점이 있으면 오른쪽 상단의 이메일로 연락 주세요.</p>
          </section>
        </main>
      </div>
    </div>
  );
}
