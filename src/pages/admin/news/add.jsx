import { useState } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import { parseCookies } from "nookies";

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const token = cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return {
      props: { user: decoded },
    };
  } catch (error) {
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
        setErrorMessage(responseData.message || "Failed to add news.");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("There was an error submitting the form.");
      setSuccessMessage("");
    }
  };

  const addLink = (e) => {
    e.preventDefault();
    setDetails(
      (prevDetails) =>
        `${prevDetails}<a style="color: #0088ff; text-decoration: underline;" href='<YOUR_LINK_HERE>'>Click here for more information</a>`
    );
  };

  const newLine = (e) => {
    e.preventDefault();
    setDetails((prevDetails) => `${prevDetails}<br/><br/>`);
  };

  const header = (e) => {
    e.preventDefault();
    setDetails(
      (prevDetails) =>
        `${prevDetails}<span style="font-size: 20px; font-weight: bold;">Гарчигаа бичих</span>`
    );
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-6 mt-8 max-w-3xl mx-auto flex flex-col items-center gap-4">
      <div className="flex gap-4 mb-6 flex-wrap justify-center">
        <button
          onClick={addLink}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Link
        </button>
        <button
          onClick={newLine}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          New Line
        </button>
        <button
          onClick={header}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Header
        </button>
      </div>

      <h1 className="text-3xl font-bold text-center mb-6">Add News</h1>

      {errorMessage && (
        <div className="text-red-500 mb-4 text-center">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="text-green-500 mb-4 text-center">{successMessage}</div>
      )}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="block border border-gray-300 rounded-lg p-3 w-4/5 mx-auto mb-4 text-lg"
      />

      <textarea
        placeholder="Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        required
        className="block border border-gray-300 rounded-lg p-3 w-4/5 mx-auto mb-4 text-lg"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="block border border-gray-300 rounded-lg p-3 w-4/5 mx-auto mb-4 text-lg"
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
        className="block border border-gray-300 rounded-lg p-3 w-4/5 mx-auto mb-4 text-lg"
        required
      />

      {imagePreview && (
        <div className="mt-4">
          <img
            src={imagePreview}
            alt="Image Preview"
            className="w-48 h-48 object-cover rounded-lg mx-auto"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-4/5 mx-auto mt-6 bg-green-500 text-white py-3 rounded-lg text-lg font-bold hover:bg-green-600 transition-colors duration-200"
      >
        Add News
      </button>
    </form>
  );
}
