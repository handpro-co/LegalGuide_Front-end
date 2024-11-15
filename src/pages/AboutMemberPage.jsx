import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const AboutMemberPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [memberData, setMemberData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/members");
      const result = await res.json();
      setMemberData(result);
    };
    fetchData();
  }, []);

  const member = memberData.find((member) => member.id === id);

  if (!member) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-[170px] flex flex-col md:flex-row gap-[50px] w-[82%] mx-auto">
      <div className="w-full bg-gray-100 rounded-[50px] p-[30px]">
        <div className="flex flex-col md:flex-row gap-[50px]">
          <div className="w-full md:w-[25%]">
            <img
              src={member.image_url}
              alt={member.name}
              className="bg-[purple] rounded-[24px] w-full h-auto"
            />
            <div className="text-center mt-4">
              <div
                className="text-[24px] font-bold"
                dangerouslySetInnerHTML={{ __html: member.name || "" }}
              ></div>
              {member.position && (
                <div
                  className="text-[18px] font-regular"
                  dangerouslySetInnerHTML={{ __html: member.position }}
                />
              )}
            </div>
          </div>
          <div className="w-full md:w-[70%]">
            {member.introduction && (
              <div>
                <div className="text-[20px] font-bold text-[#444444]">
                  Товч танилцуулга
                </div>
                <div
                  className="text-[15px] font-regular text-[#444444] break-words"
                  dangerouslySetInnerHTML={{ __html: member.introduction }}
                ></div>
              </div>
            )}
            {member.education && (
              <div className="mt-4">
                <div className="text-[20px] font-bold text-[#444444]">
                  Боловсрол/ мэргэжил
                </div>
                <div
                  className="text-[15px] font-regular text-[#444444] break-words"
                  dangerouslySetInnerHTML={{ __html: member.education }}
                ></div>
              </div>
            )}
            {member.specialization && (
              <div className="mt-4">
                <div className="text-[20px] font-bold text-[#444444]">
                  Мэргэшсэн ажиллаж буй чиглэл
                </div>
                <div
                  className="text-[15px] font-regular text-[#444444] break-words"
                  dangerouslySetInnerHTML={{ __html: member.specialization }}
                ></div>
              </div>
            )}
            {member.publications && (
              <div className="mt-4">
                <div className="text-[20px] font-bold text-[#444444]">
                  Хэвлүүлсэн бүтээл, судалгааны ажлууд
                </div>
                <div
                  className="text-[15px] font-regular text-[#444444] break-words"
                  dangerouslySetInnerHTML={{ __html: member.publications }}
                ></div>
              </div>
            )}
            {member.training && (
              <div className="mt-4">
                <div className="text-[20px] font-bold text-[#444444]">
                  Оролцсон сургалт, хөтөлбөрүүд
                </div>
                <div
                  className="text-[15px] font-regular text-[#444444] break-words"
                  dangerouslySetInnerHTML={{ __html: member.training }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMemberPage;
