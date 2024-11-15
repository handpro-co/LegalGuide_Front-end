import { useState, useEffect } from "react";
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
        const response = await fetch(`/api/members/`);
        const data = await response.json();
        if (data)
          setMember((prev) => ({
            ...prev,
            ...data.find((member) => member.id === id),
          }));
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
    if (file) setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(member).forEach((key) => {
      if (member[key] !== undefined) formData.append(key, member[key]);
    });

    if (image) formData.append("image", image);

    const response = await fetch(`/api/members/?id=${id}`, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) router.push("/admin/members");
    else console.error("Error updating member");
  };

  const addLink = (e) => {
    e.preventDefault();
    setMember((prevMember) => ({
      ...prevMember,
      introduction: `${prevMember.introduction}<a style="color: #0088ff; text-decoration: underline;" href='<YOUR_LINK_HERE>'>Click here for more information</a>`,
    }));
  };

  const newLine = (e) => {
    e.preventDefault();
    setMember((prevMember) => ({
      ...prevMember,
      introduction: `${prevMember.introduction}<br/><br/>`,
    }));
  };

  return (
    <div className="p-6 mt-[180px]">
      <h1 className="text-2xl font-bold">Edit Member</h1>
      <div className="text-center font-semiBold my-[10px]">
        Description add options
      </div>
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
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <input
          type="text"
          name="name"
          value={member.name}
          onChange={handleChange}
          required
          placeholder="Name"
          className="block border rounded p-2 w-full mt-4"
        />

        <input
          type="text"
          name="position"
          value={member.position}
          onChange={handleChange}
          placeholder="Position"
          className="block border rounded p-2 w-full mt-4"
        />

        <textarea
          name="introduction"
          value={member.introduction}
          onChange={handleChange}
          placeholder="Introduction"
          className="block border rounded p-2 w-full mt-4"
        />

        <textarea
          name="education"
          value={member.education}
          onChange={handleChange}
          placeholder="Education"
          className="block border rounded p-2 w-full mt-4"
        />

        <textarea
          name="specialization"
          value={member.specialization}
          onChange={handleChange}
          placeholder="Specialization"
          className="block border rounded p-2 w-full mt-4"
        />

        <textarea
          name="publications"
          value={member.publications}
          onChange={handleChange}
          placeholder="Publications"
          className="block border rounded p-2 w-full mt-4"
        />

        <textarea
          name="training"
          value={member.training}
          onChange={handleChange}
          placeholder="Training"
          className="block border rounded p-2 w-full mt-4"
        />

        <div className="mt-4">
          <label className="block mb-2">Choose New Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="block border rounded p-2 w-full"
          />
          {member.image_url && !image && (
            <img
              src={member.image_url}
              alt="Current Member Image"
              className="mt-4"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
        </div>

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
