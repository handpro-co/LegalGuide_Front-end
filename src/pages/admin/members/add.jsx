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

export default function AddMember() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [education, setEducation] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [publications, setPublications] = useState("");
  const [training, setTraining] = useState("");
  const [image, setImage] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("position", position);
    formData.append("introduction", introduction);
    formData.append("education", education);
    formData.append("specialization", specialization);
    formData.append("publications", publications);
    formData.append("training", training);
    formData.append("image", image);

    const response = await fetch("/api/members", {
      method: "POST",
      body: formData,
    });
    const responseData = await response.json();
    if (response.ok) {
      router.push("/admin/members");
    } else {
      console.error("Failed to add member");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h1 className="text-2xl font-bold">Add Member</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="block border rounded p-2 w-full mt-4"
      />
      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        className="block border rounded p-2 w-full mt-4"
      />
      <textarea
        placeholder="Introduction"
        value={introduction}
        onChange={(e) => setIntroduction(e.target.value)}
        className="block border rounded p-2 w-full mt-4"
      />
      <textarea
        placeholder="Education"
        value={education}
        onChange={(e) => setEducation(e.target.value)}
        className="block border rounded p-2 w-full mt-4"
      />
      <textarea
        placeholder="Specialization"
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
        className="block border rounded p-2 w-full mt-4"
      />
      <textarea
        placeholder="Publications"
        value={publications}
        onChange={(e) => setPublications(e.target.value)}
        className="block border rounded p-2 w-full mt-4"
      />
      <textarea
        placeholder="Training"
        value={training}
        onChange={(e) => setTraining(e.target.value)}
        className="block border rounded p-2 w-full mt-4"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="block border rounded p-2 w-full mt-4"
      />
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Member
      </button>
    </form>
  );
}
