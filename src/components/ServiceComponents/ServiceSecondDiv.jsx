import ServiceOnclickShowText from "../layout/ServiceOnclickShowText";
import { BsSearch } from "react-icons/bs";
import serviceFirstDivData from "../mockDatas/allServiceDivData";
const ServiceSecondDiv = () => {
  const mockData = serviceFirstDivData();
  return (
    <div className="p-2 md:p-[32px]  bg-gradient-to-b from-white to-[#F7F8FD]  rounded-[16px] md:rounded-[32px] flex flex-col gap-[64px]">
      <div className="flex flex-col gap-[20px]">
        <div className="w-[40px] h-[40px] p-[8px] text-[#226fd8]">
          <BsSearch className="w-[32px] h-[32px]" />
        </div>
        <div className="text-[24px] text-[#282828] font-bold">
          2. Хууль зүйн магадлан шинжилгээ хийх
        </div>
        <div className="text-[16px] font-medium text-[#282828] w-full md:w-[55%] sm:w-[55%]">
          Хуулийн этгээдийн аливаа үйл ажиллагаа холбогдох хууль тогтоомжид
          нийцэж байгаа эсэхэд хууль зүйн магадлан шинжилгээг хийж
          үйлчлүүлэгчийг хууль зүйн эрсдэлээс урьдчилан сэргийлж чаддаг.
        </div>
      </div>
      <div className="w-full flex flex-wrap">
        <div className="flex flex-wrap gap-[10px]">
          {mockData[1].map((item, i) => (
            <div key={i} className="w-full sm:w-[48%] md:w-[48%]">
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

export default ServiceSecondDiv;
