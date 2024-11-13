import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
export default function EditProject() {
  const router = useRouter();
  const { id } = router.query;

  const [project, setProject] = useState({
    project_name: "",
    brief_description: "",
    issues: "",
    work_progress: "",
    results: "",
    statistics: "",
    image_url: "",
  });

  const [image, setImage] = useState(null); // State to hold the new image file

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        const response = await fetch(
          `/api/previous-projects/?id=${id}`
        );
        const data = await response.json();

        if (data && data.data) {
          const project = data.data.find((project) => project.id === id);
          if (project) {
            setProject(project);
          }
        }
      };
      fetchProject();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Store the selected image file in state
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object for the PUT request
    const formData = new FormData();

    // Append project data
    Object.keys(project).forEach((key) => {
      if (project[key] !== undefined) {
        formData.append(key, project[key]);
      }
    });

    // If a new image was selected, append it to the FormData
    if (image) {
      formData.append("image", image);
    }

    // Send the PUT request with the form data
    const response = await fetch(
      `/api/previous-projects/?id=${id}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    if (response.ok) {
      router.push("/admin/projects"); // Redirect after success
    } else {
      console.error("Error updating project");
    }
  };

  return (
    <div className="p-6 mt-[180px]">
      <h1 className="text-2xl font-bold">Edit Project</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="project_name"
          placeholder="Project Name"
          value={project.project_name}
          onChange={handleChange}
          required
          className="block border rounded p-2 w-full mt-4"
        />

        <textarea
          name="brief_description"
          placeholder="Brief Description"
          value={project.brief_description}
          onChange={handleChange}
          required
          className="block border rounded p-2 w-full mt-4"
        />

        <textarea
          name="issues"
          placeholder="Issues"
          value={project.issues}
          onChange={handleChange}
          className="block border rounded p-2 w-full mt-4"
        />

        <textarea
          name="work_progress"
          placeholder="Work Progress"
          value={project.work_progress}
          onChange={handleChange}
          className="block border rounded p-2 w-full mt-4"
        />

        <textarea
          name="results"
          placeholder="Results"
          value={project.results}
          onChange={handleChange}
          className="block border rounded p-2 w-full mt-4"
        />

        <textarea
          name="statistics"
          placeholder="Statistics"
          value={project.statistics}
          onChange={handleChange}
          className="block border rounded p-2 w-full mt-4"
        />

        {/* Image Upload Section */}
        <div className="mt-4">
          <label className="block mb-2">Choose New Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="block border rounded p-2 w-full"
          />
          {/* Display the current image if available */}
          {project.image_url && !image && (
            <img
              src={project.image_url}
              alt="Current Project Image"
              className="mt-4"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Project
        </button>
      </form>
    </div>
  );
}
