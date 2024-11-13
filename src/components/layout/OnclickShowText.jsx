import { GoPlus } from "react-icons/go";
import { useState } from "react";

const OnclickShowText = ({ title, text }) => {
  const [showTextValue, setShowTextValue] = useState(false);

  function showText() {
    setShowTextValue(!showTextValue);
  }
  return (
    <div
      style={{
        height: showTextValue ? "220px" : "74px",
        borderRadius: showTextValue ? "40px" : "26px",
        transition: "all 0.3s ease-in-out",
      }}
      className="flex flex-col  overflow-hidden w-full  p-[24px] gap-[24px]"
    >
      <div className="flex justify-between">
        <div className="text-[#0D2B54] font-semiBold">{title}</div>
        <div
          onClick={showText}
          className="w-[26px] h-[26px] bg-[#226fd8] cursor-pointer flex items-center justify-center rounded-[5px] text-[white]   hover:bg-[#fff] hover:text-[#226fd8] transition all duration-400"
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
export default OnclickShowText;
