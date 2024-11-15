import Link from "next/link";

const AdminNavigation = () => {
  return (
    <nav className="bg-gray-800 fixed top-0 text-white p-4 left-[50%] transform -translate-x-1/2 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/admin/OptionBoard">
          <div className="text-lg font-semibold hover:text-gray-300">Home</div>
        </Link>
      </div>
    </nav>
  );
};

export default AdminNavigation;
