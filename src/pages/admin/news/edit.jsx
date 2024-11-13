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
export default function EditNews() {
  const router = useRouter();
  const { id } = router.query;

  const [news, setNews] = useState({
    title: "",
    details: "",
    image_url: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchNews = async () => {
        try {
          const response = await fetch(`/api/news/?id=${id}`);
          const data = await response.json();

          if (data) {
            setNews({
              title: data.title || "",
              details: data.details || "",
              image_url: data.image_url || "",
            });
          }
        } catch (err) {
          console.error("Error fetching news item:", err);
        }
      };

      fetchNews();
    }
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNews((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(news).forEach((key) => {
      if (news[key] !== undefined) {
        formData.append(key, news[key]);
      }
    });

    if (image) {
      formData.append("image", image);
    }

    const response = await fetch(`/api/news/?id=${id}`, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      router.push("/admin/news");
    } else {
      console.error("Error updating news item");
    }
  };

  return (
    <div className="p-6 mt-[180px]">
      <h1 className="text-2xl font-bold">Edit News</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={news.title}
          onChange={handleChange}
          required
          className="block border rounded p-2 w-full mt-4"
        />

        <textarea
          name="details"
          placeholder="Details"
          value={news.details}
          onChange={handleChange}
          required
          className="block border rounded p-2 w-full mt-4"
        />

        <div className="mt-4">
          <label className="block mb-2">Choose Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="block border rounded p-2 w-full"
          />
          {news.image_url && !image && (
            <img
              src={news.image_url}
              alt="Current News Image"
              className="mt-4"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update News
        </button>
      </form>
    </div>
  );
}
