import MessageSearchIcon from "../icon/MessageSearchIcon";
import ServiceOnclickShowText from "../layout/ServiceOnclickShowText";
import serviceFirstDivData from "../mockDatas/allServiceDivData";
const ServiceFirstDiv = () => {
  const mockData = serviceFirstDivData();
  return (
    <div className="p-2 md:p-8 md:p-10 lg:p-12  mx-auto bg-gradient-to-b from-white to-[#F7F8FD]  rounded-[16px] md:rounded-[32px] flex flex-col gap-[64px]">
      <div className="flex flex-col gap-[20px]">
        <div className="w-[40px] h-[40px] p-[8px] text-[#226fd8]">
          <MessageSearchIcon />
        </div>
        <div className="text-[24px] md:text-[28px] text-[#282828] font-bold">
          1. Хууль зүйн зөвлөгөө
        </div>
        <div className="text-[16px] md:text-[18px] font-medium text-[#282828] w-full md:w-[55%]">
          Иргэн, хуулийн этгээдийн бизнесийн үйл ажиллагаанд тулгарсан эрх зүйн
          асуудлаар өдөр тутамд зөвлөгөө, мэдээлэл өгч ажилладаг.
        </div>
      </div>
      <div className="w-full flex ">
        <div className="flex flex-wrap gap-[10px]">
          {mockData[0].map((item, i) => (
            <div key={i} className="w-full sm:w-[48%] ">
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

export default ServiceFirstDiv;
