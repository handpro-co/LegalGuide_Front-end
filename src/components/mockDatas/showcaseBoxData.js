import { useEffect, useState } from "react";

const showcaseBoxData = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        "http://localhost:3000/api/previous-projects"
      );
      const data = await response.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);
  console.log(projects);

  return projects;
};
export default showcaseBoxData;
