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

export default function EditMember() {
  const router = useRouter();
  const { id } = router.query;

  const [member, setMember] = useState({
    name: "",
    position: "",
    introduction: "",
    education: "",
    specialization: "",
    publications: "",
    training: "",
    image_url: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchMember = async () => {
        try {
          const response = await fetch(`/api/members/${id}`);
          const data = await response.json();
          setMember(data);
        } catch (err) {
          console.error("Error fetching member data:", err);
        }
      };
      fetchMember();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember((prev) => ({ ...prev, [name]: value }));
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

    Object.keys(member).forEach((key) => {
      if (member[key] !== undefined) {
        formData.append(key, member[key]);
      }
    });

    if (image) {
      formData.append("image", image);
    }

    const response = await fetch(`/api/members/?id=${id}`, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      router.push("/admin/members");
    } else {
      console.error("Error updating member");
    }
  };

  return (
    <div className="p-6 mt-[180px]">
      <h1 className="text-2xl font-bold">Edit Member</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={member.name}
          onChange={handleChange}
          required
          placeholder="Name"
          className="block border rounded p-2 w-full mt-4"
        />
        {/* Add the other fields similarly */}
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Member
        </button>
      </form>
    </div>
  );
}
