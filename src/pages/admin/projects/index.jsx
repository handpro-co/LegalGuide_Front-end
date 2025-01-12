import { useState, useEffect } from "react";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { parseCookies } from "nookies"; // Utility for parsing cookies in Next.js

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const token = cookies.token;

  // If there is no token, redirect to the sign-in page
  if (!token) {
    return {
      redirect: {
        destination: "/admin", // Redirect to the login page
        permanent: false,
      },
    };
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If token is valid, pass the user data to the page
    return {
      props: { user: decoded }, // You can pass the user data if needed
    };
  } catch (error) {
    // If the token is invalid, redirect to the login page
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }
}

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);

  // Fetch projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("/api/previous-projects", { method: "GET" });
      const data = await response.json();
      setProjects(data || []);
    };
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/previous-projects/?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Filter out the deleted project from the list
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== id)
        );
      } else {
        console.error("Error deleting project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  if (!Array.isArray(projects)) {
    console.error("Expected projects to be an array, but got:", projects);
    return <p>Error: Projects data is not available.</p>;
  }

  return (
    <div className="p-6 mt-[180px]">
      <h1 className="text-2xl font-bold">Projects List</h1>
      <Link
        href="/admin/projects/add"
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Project
      </Link>

      {/* Grid layout for projects */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border p-4 rounded-lg shadow-lg bg-white"
          >
            <img
              src={project.image_url}
              alt={project.project_name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <h2 className="text-xl font-semibold mt-4">
              {project.project_name}
            </h2>
            <p className="text-gray-600 text-sm mt-2 line-clamp-3">
              {project.brief_description}
            </p>{" "}
            {/* Limit to 3 lines */}
            <div className="flex gap-4 mt-4">
              <Link
                href={`/admin/projects/edit?id=${project.id}`}
                className="text-blue-500"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(project.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
