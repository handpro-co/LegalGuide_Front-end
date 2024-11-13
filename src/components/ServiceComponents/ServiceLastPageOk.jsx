import BoxOfServiceLastPage from "../layout/BoxOfServiceLastPage";
import serviceFirstDivData from "../mockDatas/allServiceDivData";

const ServiceLastPageOk = () => {
  const mockData = serviceFirstDivData();
  return (
    <>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[46%] h-[46%] rounded-[50%] blur-[100px] bg-[#D0E3FF] z-[0]"></div>
      <div className="flex flex-col gap-[80px] items-center z-[1]">
        <div className="text-[32px] text-[#282828] font-bold text-center">
          Ашиг тус
        </div>
        <div className="w-full flex gap-[24px] flex-wrap justify-center">
          {mockData[4].map((item, i) => (
            <div className="w-full sm:w-[full] md:w-full lg:w-[30%]" key={i}>
              <BoxOfServiceLastPage
                Icon={item.icon}
                title={item.title}
                text={item.text}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default ServiceLastPageOk;
