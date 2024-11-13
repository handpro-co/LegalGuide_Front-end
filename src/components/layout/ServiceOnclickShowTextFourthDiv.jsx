import { useState } from "react";
import { GoPlus } from "react-icons/go";

const ServiceOnclickShowTextFourthDiv = ({ key, title, text }) => {
  const [showTextValue, setShowTextValue] = useState(false);

  function showText() {
    setShowTextValue(!showTextValue);
  }
  return (
    <div
      key={key}
      style={{
        height: showTextValue ? "auto" : "64px",
        borderRadius: showTextValue ? "40px" : "26px",
        padding: showTextValue ? "24px" : "14px",
        transition: "all 0.3s ease-in-out",
      }}
      className="flex flex-col  overflow-hidden w-full    gap-[34px] cursor-pointer hoverTitleOfServiceGreen"
    >
      <div className="flex justify-between ">
        <div className="text-gray-500  font-semiBold serviceTitleGreen">
          {title}
        </div>
        <div
          onClick={showText}
          className="w-[26px] h-[26px]  cursor-pointer flex items-center justify-center rounded-[5px] text-[#44d923]   hover:bg-[#44d923] hover:text-[#fff] transition all duration-400"
        >
          <GoPlus
            style={{
              transform: showTextValue ? "rotate(-45deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease-in-out",
            }}
            className="w-[28px] h-[28px]"
          />
        </div>
      </div>
      <div className="text-left font-regular ">{text}</div>
    </div>
  );
};
export default ServiceOnclickShowTextFourthDiv;
