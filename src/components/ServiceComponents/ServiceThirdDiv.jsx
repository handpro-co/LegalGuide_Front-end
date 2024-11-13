import { FaRegHeart } from "react-icons/fa";
import ServiceOnclickShowText from "../layout/ServiceOnclickShowText";
import serviceFirstDivData from "../mockDatas/allServiceDivData";
const ServiceThirdDiv = () => {
  const mockData = serviceFirstDivData();
  return (
    <div className="p-2 md:p-[32px]  bg-gradient-to-b from-white to-[#F7F8FD]  rounded-[16px] md:rounded-[32px] flex flex-col gap-[64px]">
      <div className="flex flex-col gap-[20px]">
        <div className="w-[40px] h-[40px] p-[8px] text-[#226fd8]">
          <FaRegHeart className="w-[32px] h-[32px]" />
        </div>
        <div className="text-[24px] text-[#282828] font-bold">
          3. Өмгөөллийн үйлчилгээ
        </div>
        <div className="text-[16px] font-medium text-[#282828] w-full md:w-[55%] sm:w-[55%]">
          Иргэн, хуулийн этгээдэд зөрчигдсөн эсхүл зөрчигдөж болзошгүй эрхээ
          хамгаалуулах, эрхийг нь сэргээлгэн эдлүүлэхтэй холбоотой хэрэг хянан
          шийдвэрлэх ажиллагаанд өмгөөллийн үйлчилгээ үзүүлдэг.
        </div>
      </div>
      <div className="w-full flex flex-wrap">
        <div className=" flex flex-wrap gap-[10px]">
          {mockData[2].map((item, i) => (
            <div key={i} className="w-full md:w-[48%] sm:w-[48%]">
              <div className="rounded-[16px] border-[#bfbfbf] border-[0.5px]">
                <ServiceOnclickShowText text={item.text} title={item.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ServiceThirdDiv;
