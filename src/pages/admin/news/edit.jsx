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
      setImage(URL.createObjectURL(file)); // Preview the selected image
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
      formData.append("image", image); // Upload the new image
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

  const addLink = (e) => {
    e.preventDefault();
    setNews((prev) => ({
      ...prev,
      details: `${prev.details}<a style="color: #0088ff; text-decoration: underline;" href="<YOUR_LINK_HERE>">Click here for more information</a>`,
    }));
  };

  const newLine = (e) => {
    e.preventDefault();
    setNews((prev) => ({
      ...prev,
      details: `${prev.details}<br/><br/>`,
    }));
  };

  const header = (e) => {
    e.preventDefault();
    setNews((prev) => ({
      ...prev,
      details: `${prev.details}<span style="font-size: 20px; font-weight: bold;">Гарчигаа бичих</span>`,
    }));
  };

  return (
    <div className="p-6 mt-[180px]">
      <h1 className="text-2xl font-bold">Edit News</h1>

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

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={news.title}
          onChange={handleChange}
          required
          className="block border rounded p-2 w-4/5 mt-4 mx-auto"
        />

        <textarea
          name="details"
          placeholder="Details"
          value={news.details}
          onChange={handleChange}
          required
          className="block border rounded p-2 w-4/5 mt-4 mx-auto"
        />

        <div className="mt-4">
          <label className="block mb-2">Choose Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="block border rounded p-2 w-4/5 mx-auto"
          />

          {/* Display the current image if it exists */}
          {image ? (
            <div className="mt-4">
              <img
                src={image}
                alt="Selected Preview"
                className="rounded-lg shadow-lg max-w-full h-[1000px]"
              />
            </div>
          ) : (
            news.image_url && (
              <div className="mt-4">
                <img
                  src={news.image_url}
                  alt="Current News Image"
                  className="rounded-lg shadow-lg max-w-full h-[1000px]"
                />
              </div>
            )
          )}
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded mx-auto block"
        >
          Update News
        </button>
      </form>
    </div>
  );
}
