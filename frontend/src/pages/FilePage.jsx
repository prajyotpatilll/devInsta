import { useSearchParams } from "react-router-dom";
import GitHubRepoViewer from "./GitHubRepoViewer";


const FilePage = () => {
  const [searchParams] = useSearchParams();
  const repoUrl = searchParams.get("repo"); // ✅ Get the GitHub link from the query

  console.log("Received GitHub Repo URL:", repoUrl);

  return (
    <div  className=" flex items-center justify-center">
      
      {repoUrl ? (
        <GitHubRepoViewer repoUrl={repoUrl} />
      ) : (
        <p>Error: No repository URL provided.</p>
      )}
    </div>
  );
};

export default FilePage;
