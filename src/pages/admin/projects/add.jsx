import { useState } from "react";
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
export default function AddProject() {
  // State management
  const [projectName, setProjectName] = useState("");
  const [briefDescription, setBriefDescription] = useState("");
  const [issues, setIssues] = useState("");
  const [workProgress, setWorkProgress] = useState("");
  const [results, setResults] = useState("");
  const [statistics, setStatistics] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [projectDate, setProjectDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // Generate a preview of the image
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate form fields
    if (!projectName || !briefDescription || !image || !projectDate) {
      setError(
        "All fields are required, including the image and project date."
      );
      setLoading(false);
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("project_name", projectName);
    formData.append("brief_description", briefDescription);
    formData.append("issues", issues);
    formData.append("work_progress", workProgress);
    formData.append("results", results);
    formData.append("statistics", statistics);
    formData.append("project_date", projectDate);

    if (image) {
      formData.append("image", image); // Attach the image file to formData
    }

    // Submit the form data via fetch API
    try {
      const response = await fetch("/api/previous-projects", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setProjectName(""); // Reset form fields on success
        setBriefDescription("");
        setProjectDate("");
        setImage(null);
        setImagePreview(null);
        setSuccessMessage("Project added successfully!");
        setError(""); // Clear any previous errors

        // Redirect to the projects page after 1.5 seconds
        setTimeout(() => {
          router.push("/admin/projects");
        }, 1500);
      } else {
        const result = await response.json();
        setError(result.message || "Error adding project");
        setSuccessMessage(""); // Clear success message if an error occurs
      }
    } catch (error) {
      console.error("Error:", error);
      setError("There was an error submitting the form.");
      setSuccessMessage(""); // Clear success message on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 mt-[180px]">
      <h1 className="text-2xl font-bold">Add Project</h1>

      {/* Error and success messages */}
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {successMessage && (
        <div className="text-green-500 mt-2">{successMessage}</div>
      )}

      {/* Project Name */}
      <input
        type="text"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        required
        className="block border rounded p-2 w-full mt-4"
      />

      {/* Brief Description */}
      <textarea
        placeholder="Brief Description"
        value={briefDescription}
        onChange={(e) => setBriefDescription(e.target.value)}
        required
        className="block border rounded p-2 w-full mt-4"
      />

      {/* Issues */}
      <textarea
        placeholder="Issues"
        value={issues}
        onChange={(e) => setIssues(e.target.value)}
        className="block border rounded p-2 w-full mt-4"
      />

      {/* Work Progress */}
      <textarea
        placeholder="Work Progress"
        value={workProgress}
        onChange={(e) => setWorkProgress(e.target.value)}
        className="block border rounded p-2 w-full mt-4"
      />

      {/* Results */}
      <textarea
        placeholder="Results"
        value={results}
        onChange={(e) => setResults(e.target.value)}
        className="block border rounded p-2 w-full mt-4"
      />

      {/* Statistics */}
      <textarea
        placeholder="Statistics"
        value={statistics}
        onChange={(e) => setStatistics(e.target.value)}
        className="block border rounded p-2 w-full mt-4"
      />

      {/* Project Date */}
      <input
        type="date"
        value={projectDate}
        onChange={(e) => setProjectDate(e.target.value)}
        required
        className="block border rounded p-2 w-full mt-4"
      />

      {/* Image Upload */}
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        className="block border rounded p-2 w-full mt-4"
        required
      />

      {/* Image Preview */}
      {imagePreview && (
        <div className="mt-4">
          <img
            src={imagePreview}
            alt="Image Preview"
            className="max-w-[200px] max-h-[200px] object-cover"
          />
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className={`mt-4 ${
          loading ? "bg-gray-400" : "bg-blue-500"
        } text-white px-4 py-2 rounded`}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Project"}
      </button>
    </form>
  );
}
