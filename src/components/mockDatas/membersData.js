import { useState, useEffect } from "react";

const membersData = () => {
  const [memberData, setMemberData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/members");
      const result = await res.json();
      setMemberData(result);
    };

    fetchData();
  }, []);
  return memberData;
};
export default membersData;
