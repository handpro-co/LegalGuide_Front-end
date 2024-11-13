import Photo from "../../homePagesPeoplesPhoto/converted-files/whyus.png";
import animateJSX_CircleData from "../mockDatas/animateJSX_CircleData";
import animateJSX_squireData from "../mockDatas/animateJSX_squireData";
const Animate = () => {
  const circledata = animateJSX_CircleData();
  const reklamData = animateJSX_squireData();

  return (
    <div
      className="w-full h-screen bg-cover rounded-[50px]  bg-center bg-repeat overflow-hidden"
      style={{ backgroundImage: `url(${Photo.src})` }}
    >
      <div className="w-full h-full py-[10px] flex flex-col  bg-cover animatePage rounded-[50px] md:py-[100px]">
        <div className="flex flex-col items-center justify-between h-[100%]">
          <div className="w-full flex justify-center md:justify-end flex-wrap px-0 lg:pr-[50px]">
            {circledata.map((item, i) => (
              <div
                key={i}
                className="w-[25%] py-[40px] md:w-[150px] md:h-[150px] rounded-[16px] md:rounded-[50%] bg-opacity-[20%] bg-blur-sm bg-[white] backdrop-blur-md flex flex-col items-center justify-center m-2"
              >
                <div className="text-[22px] md:text-[32px] text-[white] font-bold">
                  {item.title}
                </div>
                <div className="text-[10px] md:text-[14px] text-[white] font-medium text-center">
                  {item.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-[30px] gap-[16px] w-[90%] flex-wrap">
            {reklamData.map((item, i) => (
              <div
                key={i}
                className="w-full sm:w-[48%] lg:w-[49%]  bg-opacity-20 backdrop-blur-md bg-white rounded-[24px] flex flex-col items-center gap-[12px] p-[16px]"
              >
                <div className="flex justify-center">
                  <div className="w-[32px] h-[32px] md:w-[40px] md:h-[40px] bg-[white] flex justify-center items-center text-[#226FD8] rounded-[12px] text-[24px] md:text-[28px]">
                    <item.icon />
                  </div>
                </div>
                <div className="text-center text-[#E6E6E6] font-bold">
                  {item.title}
                </div>
                <div className="text-center text-[#E6E6E6] font-medium text-[12px] md:text-[14px]">
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Animate;
