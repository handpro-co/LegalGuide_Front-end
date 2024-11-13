import { useState } from "react";
import { GoPlus } from "react-icons/go";

const ServiceOnclickShowText = ({ key, title, text }) => {
  const [showTextValue, setShowTextValue] = useState(false);

  function showText() {
    setShowTextValue(!showTextValue);
  }

  return (
    <div
      key={key}
      style={{
        height: showTextValue ? "auto" : "60px",
        borderRadius: showTextValue ? "40px" : "26px",
        padding: showTextValue ? "24px" : "14px",
        transition: "all 0.3s ease-in-out",
      }}
      className="flex flex-col overflow-hidden w-full gap-[34px] cursor-pointer hoverTitleOfService"
    >
      <div className="flex justify-between items-start h-[100px]">
        <div className="text-gray-500 font-semiBold serviceTitle">{title}</div>
        <div
          onClick={showText}
          className="w-[26px] h-[26px] cursor-pointer flex items-center justify-center rounded-[5px] text-[#226fd8] hover:bg-[#226fd8] hover:text-[#fff] transition-all duration-400"
        >
          <GoPlus
            style={{
              transform: showTextValue ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease-in-out",
            }}
            className="w-[28px] h-[28px]"
          />
        </div>
      </div>
      <div className="text-left font-regular">{text}</div>
    </div>
  );
};
export default ServiceOnclickShowText;
