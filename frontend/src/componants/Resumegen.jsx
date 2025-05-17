import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const Resumegen = ({ user }) => {
  const resumeRef = useRef(null);

  const downloadPDF = () => {
    window.scrollTo(0, 0);
    const input = resumeRef.current;

    html2canvas(input, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${user.name}_Resume.pdf`);
    });
  };

  return (
    <>
      <style>{`
        #resume {
          position: absolute;
          left: -9999px;
          top: 0;
          max-width: 850px;
          margin: 30px auto;
          padding: 40px 50px;
          background: #fff !important;
          color: #000 !important;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          font-size: 15px;
          line-height: 1.6;
          box-sizing: border-box;
          border-radius: 6px;
          box-shadow: none;
          user-select: none;
        }
        #resume * {
          background: #fff !important;
          color: #000 !important;
        }
        #resume h1 {
          font-size: 28px;
          margin-bottom: 5px;
          font-weight: 700;
        }
        #resume h2 {
          font-size: 20px;
          margin: 30px 0 10px;
          font-weight: 600;
          border-bottom: 1px solid #ddd;
          padding-bottom: 4px;
        }
        #resume a {
          color: #0000ee !important;
          text-decoration: none;
          word-break: break-word;
          background: #fff !important;
        }
        #resume a:hover {
          text-decoration: underline;
        }
        #resume ul {
          margin-left: 20px;
          padding-left: 0;
          background: #fff !important;
        }
        #resume li {
          margin-bottom: 6px;
          background: #fff !important;
        }
        .section-subtitle {
          font-weight: 600;
          font-size: 16px;
          margin-bottom: 6px;
          background: #fff !important;
        }
        .contact-info {
          margin-bottom: 15px;
          font-style: italic;
          background: #fff !important;
        }
        button.download-btn {
          display: block;
          margin: 20px auto;
          background: #000;
          color: #fff;
          padding: 10px 25px;
          font-size: 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        button.download-btn:hover {
          background: #222;
        }
      `}</style>

      {/* Hidden Resume Container */}
      <div id="resume" ref={resumeRef}>
        <h1>{user.name}</h1>
        <p className="contact-info">
          {user.role} | {user.city} | {user.phone} <br />
          {user.email} |{" "}
          <a href={user.github} target="_blank" rel="noreferrer">
            {user.github}
          </a>{" "}
          |{" "}
          <a href={user.linkedin} target="_blank" rel="noreferrer">
            {user.linkedin}
          </a>
        </p>

        <h2>About Me</h2>
        <p>{user.description}</p>

        <h2>Education</h2>
        <p>
          <strong>{user.education.degreename}</strong> <br />
          {user.education.college}, {user.education.city} |{" "}
          {user.education.startyear} - {user.education.completeyear}
        </p>

        <h2>Technical Skills</h2>
        <p>{user.skills.map((skill) => skill.name).join(", ")}</p>

        <h2>Projects</h2>
        {user.projects.slice(0, 3).map((project, idx) => (
          <div key={idx} style={{ marginBottom: 18, background: "#fff" }}>
            <p className="section-subtitle">{project.name}</p>
            <p className="pb-2">
              <strong>Technologies:</strong> {project.technologies.join(", ")}
            </p>
            {project.live_preview_link && (
              <p>
                <strong>Link:</strong>{" "}
                <a
                  href={project.live_preview_link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.live_preview_link}
                </a>
              </p>
            )}
            <ul>
              {project.description?.split("\n").map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        ))}

        {user.resume && (
          <p style={{ marginTop: 30 }}>
            <strong>Portfolio:</strong>{" "}
            <a href={user.resume} target="_blank" rel="noreferrer">
              {user.resume}
            </a>
          </p>
        )}
      </div>

      {/* Download Button */}
      <button onClick={downloadPDF} className="download-btn">
        Download Resume
      </button>
    </>
  );
};

export default Resumegen;
