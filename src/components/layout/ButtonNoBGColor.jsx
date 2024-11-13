import { GoArrowUpRight } from "react-icons/go";

const ButtonNoBGColor = ({ text }) => {
  return (
    <>
      <button className="border-[#226FD8] border-[1px] text-[#226FD8] py-[12px] px-[32px] rounded-[24px] flex items-center gap-[10px]">
        <span className="font-medium">{text}</span>
        <GoArrowUpRight className="icon45deg" />
      </button>
    </>
  );
};
export default ButtonNoBGColor;
