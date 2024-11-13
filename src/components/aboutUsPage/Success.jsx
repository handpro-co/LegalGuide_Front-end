import SuccessOfYears from "../layout/SuccessOfYears";
import successData from "../mockDatas/successData";
const Success = () => {
  const mockData = successData();

  return (
    <div className="w-full h-[auto] flex justify-center items-center  lg:px-[50px] py-[100px]">
      <div className="w-full h-[auto] flex flex-col gap-[60px] ">
        <div className="font-bold text-[40px] text-[#282828 text-center">
          Бидний түүх
        </div>
        <div className="flex flex-col gap-[250px]">
          {mockData.map((item, i) => (
            <div key={i}>
              <SuccessOfYears year={item.year} text={item.text} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Success;
