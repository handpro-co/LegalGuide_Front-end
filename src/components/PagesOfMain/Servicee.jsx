import { GoArrowUpRight } from "react-icons/go";
import { CiHeart } from "react-icons/ci";
import ButtonNoBGColor from "../layout/ButtonNoBGColor";
import serviceeData from "../mockDatas/serviceeData";

const Servicee = () => {
  const mockData = serviceeData();


  return (
    <div className="flex flex-col items-center gap-[80px] ">
      <div className="flex flex-col items-center gap-[12px] md:gap-[24px] ">
        <div className=" text-[26px] lg:text-[48px] text-[#282828] text-center font-bold">
          Үйлчилгээний төрөл
        </div>
        <ButtonNoBGColor text={"Дэлгэрэнгүй харах"} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-[12px] w-full max-w-[1200px]">
        {mockData.map((item, i) => (
          <div
            key={i}
            style={{ backgroundColor: item.backgroundColor }}
            className="rounded-[12px] flex flex-col gap-[32px] p-[32px]"
          >
            <div className="flex flex-col gap-[20px] flex-wrap">
              <div className="p-[8px] w-[40px] h-[40px] rounded-[14px] bg-[#fff] flex justify-center items-center">
                <CiHeart className="text-[#226FD8] w-[32px] h-[32px]" />
              </div>
              <div className="text-[18px] lg:text-[24px] font-bold">
                {item.title}
              </div>
              <p className="font-medium text-[15px] lg:text-[16px]">
                {item.text}
              </p>
            </div>
            <button className="text-[15px] lg:text-[16px] flex items-center gap-[8px] font-bold hover:text-[#226FD8]">
              Дэлгэрэнгүй <GoArrowUpRight className="icon45deg" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Servicee;
