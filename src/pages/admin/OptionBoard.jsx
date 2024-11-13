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

const AdminComponent = ({ user }) => {
  return (
    <>
      <div className="p-6 flex mt-[170px] flex-col items-center rounded-[20px]">
        <h1 className="text-2xl font-bold text-center">Admin Dashboard</h1>
        <br />
        <br />
        <div className="flex gap-[50px] flex-wrap">
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Manage News</h2>
            <Link
              href="/admin/news"
              className="block mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              View News
            </Link>
            <Link
              href="/admin/news/add"
              className="block mt-2 bg-green-500 text-white px-4 py-2 rounded"
            >
              Add News
            </Link>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Manage Members</h2>
            <Link
              href="/admin/members"
              className="block mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              View Members
            </Link>
            <Link
              href="/admin/members/add"
              className="block mt-2 bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Member
            </Link>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Manage Projects</h2>
            <Link
              href="/admin/projects"
              className="block mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              View Projects
            </Link>
            <Link
              href="/admin/projects/add"
              className="block mt-2 bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Project
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminComponent;
