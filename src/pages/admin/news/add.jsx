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
const categories = [
  "Хуульч мазаалай",
  "Хуулийн талаар",
  "Цаг үеийн мэдээ, мэдээлэл",
];

export default function AddNews() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !details || !image) {
      setErrorMessage("All fields are required, including the image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("details", details);
    formData.append("category", category);
    formData.append("image", image);

    try {
      const response = await fetch("/api/news", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      if (response.ok) {
        setTitle("");
        setDetails("");
        setCategory(categories[0]);
        setImage(null);
        setImagePreview(null);
        setSuccessMessage("News added successfully!");
        setErrorMessage("");
        setTimeout(() => {
          router.push("/admin/news");
        }, 1500);
      } else {
        console.error("Error response:", responseData);
        setErrorMessage(responseData.message || "Failed to add news.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("There was an error submitting the form.");
      setSuccessMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 mt-[180px]">
      <h1 className="text-2xl font-bold">Add News</h1>

      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
      {successMessage && (
        <div className="text-green-500 mt-2">{successMessage}</div>
      )}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="block border rounded p-2 w-full mt-4"
      />
      <textarea
        placeholder="Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        required
        className="block border rounded p-2 w-full mt-4"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="block border rounded p-2 w-full mt-4"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="file"
        onChange={handleImageChange}
        className="block border rounded p-2 w-full mt-4"
        required
      />

      {imagePreview && (
        <div className="mt-4">
          <img
            src={imagePreview}
            alt="Image Preview"
            className="max-w-[200px] max-h-[200px] object-cover"
          />
        </div>
      )}

      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add News
      </button>
    </form>
  );
}
