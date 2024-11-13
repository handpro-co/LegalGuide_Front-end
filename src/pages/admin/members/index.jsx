import { useState, useEffect } from "react";
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

export default function MembersList() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await fetch("/api/members");
      const data = await response.json();
      setMembers(data); // Assuming the data returns a list of members
    };
    fetchMembers();
  }, []);

  // Delete member function
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        const response = await fetch(`/api/members/?id=${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setMembers(members.filter((member) => member.id !== id)); // Remove member from state
          alert("Member deleted successfully");
        } else {
          console.error("Error deleting member");
        }
      } catch (error) {
        console.error("Error deleting member:", error);
      }
    }
  };

  return (
    <div className="p-6 mt-[180px]">
      <h1 className="text-2xl font-bold">Members List</h1>
      <ul className="mt-6 flex gap-[30px] flex-wrap">
        {members.map((member) => (
          <li key={member.id} className="border-b py-4 w-[20%]">
            <img src={member.image_url} alt={member.name} />
            <h2 className="text-xl">{member.name}</h2>
            {/* Display other member details */}
            <button
              onClick={() => handleDelete(member.id)}
              className="mt-2 ml-[10px] text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
