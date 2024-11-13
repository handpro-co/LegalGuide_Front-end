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
export default function NewsList() {
  const [news, setNews] = useState([]); // State for news data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Handle errors

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news");
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        console.log("Fetched News Data: ", data); // Log the data structure

        setNews(data);

        setLoading(false); // Stop loading once data is fetched
      } catch (err) {
        console.error(err);
        setError(err.message); // Set error if something goes wrong
        setLoading(false); // Stop loading even on error
      }
    };

    fetchNews();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Handle deleting a news item
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this news item?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/news/?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setNews((prevNews) => prevNews.filter((item) => item.id !== id));
      } else {
        console.error("Error deleting news item");
      }
    } catch (error) {
      console.error("Error deleting news item:", error);
    }
  };

  // Conditional rendering based on loading, error, or empty data
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!Array.isArray(news) || news.length === 0) {
    return <p>No news items available.</p>;
  }

  return (
    <div className="p-6 mt-[180px]">
      <h1 className="text-2xl font-bold">News List</h1>
      <Link
        href="/admin/news/add"
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add News
      </Link>
      <ul className="mt-6 flex gap-[30px]">
        {news.map((item) => (
          <li key={item.id} className="border-b py-4 w-[20%]">
            <img src={item.image_url} alt={item.title} />
            <h2 className="text-xl">{item.title}</h2>
            <p>{item.details}</p>
            <div className="flex gap-4">
              <Link
                href={`/admin/news/edit?id=${item.id}`}
                className="text-blue-500"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
