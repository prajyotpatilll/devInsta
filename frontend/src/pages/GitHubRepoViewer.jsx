import { useState, useEffect } from "react";

const GitHubRepoViewer = ({ repoUrl }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPath, setCurrentPath] = useState(""); // Keeps track of the folder path
  const [fileContent, setFileContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Extract owner and repo from URL
  const extractRepoDetails = (url) => {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (match) {
      return { owner: match[1], repo: match[2] };
    }
    return null;
  };

  useEffect(() => {
    const repoDetails = extractRepoDetails(repoUrl);
    if (!repoDetails) {
      setError("Invalid GitHub repository URL");
      setLoading(false);
      return;
    }

    const { owner, repo } = repoDetails;
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${currentPath}`;

    const fetchFiles = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch repository");
        const data = await response.json();
        setFiles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [repoUrl, currentPath]); // Refetch data when currentPath changes

  // Fetch file content when a file is clicked
  const fetchFileContent = async (file) => {
    setSelectedFile(file.name);
    setFileContent("Loading...");

    try {
      const rawUrl = file.download_url;
      const response = await fetch(rawUrl);
      const text = await response.text();
      setFileContent(text);
    } catch (error) {
      setFileContent("Failed to load file content.");
    }
  };

  // Handle folder navigation
  const handleFolderClick = (folderName) => {
    setCurrentPath((prev) => (prev ? `${prev}/${folderName}` : folderName));
  };

  // Handle going back to the previous directory
  const goBack = () => {
    setCurrentPath((prev) => prev.split("/").slice(0, -1).join("/"));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-[80%]" >
      <h2>Repository: {repoUrl}</h2>

      {/* Show "Back" button if inside a subfolder */}
      {currentPath && (
        <button onClick={goBack}>⬅️ Back</button>
      )}

      <ul>
        {files.map((file) => (
          <li key={file.path}>
            {file.type === "dir" ? (
              <button onClick={() => handleFolderClick(file.name)}>📁 {file.name}</button>
            ) : (
              <button onClick={() => fetchFileContent(file)}>📄 {file.name}</button>
            )}
          </li>
        ))}
      </ul>

      {selectedFile && (
        <div>
          <h3>📄 {selectedFile}</h3>
          <pre className="bg-gray-800 rounded-md" style={{  padding: "10px", borderRadius: "5px", whiteSpace: "pre-wrap" }}>
            {fileContent}
          </pre>
        </div>
      )}
    </div>
  );
};

export default GitHubRepoViewer;
