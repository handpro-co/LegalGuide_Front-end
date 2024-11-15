import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { parseCookies } from "nookies";
import Link from "next/link";

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

export default function MembersList() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await fetch("/api/members");
      const data = await response.json();
      setMembers(data);
    };
    fetchMembers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        const response = await fetch(`/api/members/?id=${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setMembers(members.filter((member) => member.id !== id));
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
    <div className="p-6 mt-[180px] w-[90%] mx-auto">
      <Link href="/admin/members/add">
        <div className=" px-[10px] inline bg-blue-500 py-[5px] rounded-lg text-white text-center cursor-pointer ">
          Add Member
        </div>
      </Link>
      <h1 className="text-2xl font-bold mb-6 text-center">Members List</h1>
      <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <li
            key={member.id}
            className="border p-4 rounded-lg shadow-lg bg-white"
          >
            <img
              src={member.image_url}
              alt={member.name}
              className="w-full h-auto object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
            <p className="text-gray-700">{member.position}</p>
            <div className="flex justify-between mt-4">
              <Link href={`/admin/members/edit?id=${member.id}`}>
                <div className="text-blue-500 hover:underline">Edit</div>
              </Link>
              <button
                onClick={() => handleDelete(member.id)}
                className="text-red-500 hover:underline"
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
