import { FaEarthAsia } from "react-icons/fa6";
import ServiceOnclickShowTextFourthDiv from "../layout/ServiceOnclickShowTextFourthDiv";
import BackgroundImage from "../../homePagesPeoplesPhoto/ServiceFourthDivBackground.png";
import serviceFirstDivData from "../mockDatas/allServiceDivData";
const ServiceFourthDiv = () => {
  const mockData = serviceFirstDivData();
  return (
    <div
      style={{ backgroundImage: `url(${BackgroundImage.src})` }}
      className="p-2 md:p-[32px]   rounded-[16px] md:rounded-[32px] flex flex-col gap-[64px] bg-cover bg-center"
    >
      <div className="flex flex-col gap-[20px]">
        <div className="w-[40px] h-[40px] p-[8px] text-[#1F8500] ">
          <FaEarthAsia className="w-[32px] h-[32px] " />
        </div>
        <div className="text-[24px] text-[#282828] font-bold">
          4. ESG (Environment, Social, and Governance)
        </div>
        <div className="text-[16px] font-medium text-[#282828] w-full">
          Хуулийн этгээдийн үйл ажиллагаа болон төсөл хөтөлбөрүүдэд байгаль
          орчин, хүний эрх, нийгмийн хариуцлага, засаглалын зохистой байдлын
          тайланг гаргах үйл ажиллагаа юм.
        </div>
      </div>
      <div className="w-full flex flex-wrap">
        <div className=" flex flex-wrap gap-[10px]">
          {mockData[3].map((item, i) => (
            <div key={i} className="w-full md:w-[48%] sm:[48%]">
              <div className="rounded-[16px] border-[#bfbfbf] border-[0.5px]">
                <ServiceOnclickShowTextFourthDiv
                  text={item.text}
                  title={item.title}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ServiceFourthDiv;
