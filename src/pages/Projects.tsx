import React, { useEffect, useState } from 'react';
import './Projects.css';
import { FaReact, FaNodeJs, FaAws, FaDatabase, FaDocker, FaAngular, FaGithub, FaGitlab, FaGoogle, FaJava, FaJenkins, FaMicrosoft, FaPython, FaVuejs } from 'react-icons/fa';
import { SiRubyonrails, SiPostgresql, SiMongodb, SiMaterialdesign, SiHtml5, SiCss3, SiJquery, SiAwsamplify, SiFirebase, SiTerraform, SiArgo } from 'react-icons/si';
import { Project } from '../types';
import { getProjects } from '../queries/getProjects';
import { GrDeploy, GrKubernetes } from "react-icons/gr";

// Import project images
import crmImage from '../images/crm.png';
import letsxchangeImage from '../images/letsxchange-.png';
import utilisationImage from '../images/rdbms.png';
import vaackImage from '../images/sphera.png';
import startupsImage from '../images/geo.png';
import myalphadojoImage from '../images/mcp.png';

const techIcons: { [key: string]: JSX.Element } = {
  "NodeJS": <FaNodeJs />,
  "AWS": <FaAws />,
  "PostgreSQL": <SiPostgresql />,
  "MongoDB": <SiMongodb />,
  "HTML5": <SiHtml5 />,
  "CSS3": <SiCss3 />,
  "AWS-ECS": <SiAwsamplify />,
  'ECS': <FaAws />,
  'Docker': <FaDocker />,
  'CI/CD': <FaGitlab />,
  'GitHub': <FaGithub />,
  'Netlify': <GrDeploy />,
  'Firebase': <SiFirebase />,
  'GCP': <FaGoogle />,
  'Azure': <FaMicrosoft />, 
  'Java': <FaJava />,
  'Spring Boot': <FaJava />,
  'Python': <FaPython />,
  'Node.js': <FaNodeJs />,
  'Hibernate': <FaJava />,
  'Maven': <FaJava />,
  'Gradle': <FaJava />,
  'React': <FaReact />,
  'Next.js': <FaReact />,
  'Redux': <FaReact />,
};


const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  
  useEffect(() => { 
    async function fetchProjects() {
      const data = await getProjects();
      
      // Map the imported images to the projects
      const imageMap: { [key: string]: string } = {
        'TE Connect CV Dashboard': crmImage,
        'Chalo On Tour AI Itinerary App': letsxchangeImage,
        'SQL to Neo4j Aura Migration & Graph Explorer': utilisationImage,
        'SpheraTech Immersive Learning': vaackImage,
        'GeoRiskAccess: Risk Factor Prediction': startupsImage,
        'AI Personal Hub (MCP)': myalphadojoImage
      };
      
      const projectsWithImages = data.map(project => ({
        ...project,
        image: {
          url: imageMap[project.title] || crmImage // fallback image
        }
      }));
      
      setProjects(projectsWithImages);
    }
    
    fetchProjects()
  }, [])
  
  if (projects.length === 0) return <div>Loading...</div>;

  return (
    <div className="projects-container">
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card"
            style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
          >
            <img src={project.image.url} alt={project.title} className="project-image" />
            <div className="project-details">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-used">
                {project.techUsed.split(', ').map((tech, i) => (
                  <span key={i} className="tech-badge">
                    {techIcons[tech] || "🔧"} {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
