import Button from "../layout/Button";
import MemberCard from "../layout/MemberCard";
import Link from "next/link";
import membersData from "../mockDatas/membersData";

const PhotoOfUs = () => {
  const poeplesData = membersData();
  console.log(poeplesData);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="py-[50px] md:py-[112px]  md:px-[10%] flex flex-col items-center gap-[80px]">
        <div className="flex flex-col items-center gap-[16px]">
          <div className="text-[#282828] font-bold text-[40px] reveal">
            Манай баг
          </div>
          <Button text={"Дэлгэрэнгүй харах"} />
        </div>
        <div className="w-full flex gap-[24px] flex-wrap justify-center reveal">
          {poeplesData.map((item) => (
            <Link key={item.id} href={`./AboutMemberPage?id=${item.id}`}>
              <div className=" w-full">
                <MemberCard
                  photo={item.image_url}
                  name={item.name}
                  position={item.position}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default PhotoOfUs;
