import { useRouter } from "next/router";
import membersData from "../components/mockDatas/membersData";

const AboutMemberPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const memberdata = membersData();

  const member = memberdata.find((member) => member.id === id);

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
              <div className="text-[24px] font-bold">{member.name}</div>
              <div className="text-[18px] font-regular">{member.position}</div>
            </div>
          </div>
          <div className="w-full md:w-[70%]">
            <div>
              <div className="text-[20px] font-bold text-[#444444]">
                Товч танилцуулга
              </div>
              <div className="text-[15px] font-regular text-[#444444] break-words">
                {member.introduction}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-[20px] font-bold text-[#444444]">
                Боловсрол/ мэргэжил
              </div>
              <div className="text-[15px] font-regular text-[#444444] break-words">
                {member.education}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-[20px] font-bold text-[#444444]">
                Мэргэшсэн ажиллаж буй чиглэл
              </div>
              <div className="text-[15px] font-regular text-[#444444] break-words">
                {member.specialization}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-[20px] font-bold text-[#444444]">
                Хэвлүүлсэн бүтээл, судалгааны ажлууд
              </div>
              <div className="text-[15px] font-regular text-[#444444] break-words">
                {member.publications}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-[20px] font-bold text-[#444444]">
                Оролцсон сургалт, хөтөлбөрүүд
              </div>
              <div className="text-[15px] font-regular text-[#444444] break-words">
                {member.training  }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutMemberPage;
