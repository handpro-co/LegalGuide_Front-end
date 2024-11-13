import { GoArrowUpRight } from "react-icons/go";

const Button = ({ text }) => {
  return (
    <>
      <button className="bg-[#226FD8] text-[white] py-[12px] px-[32px] rounded-[24px] flex items-center gap-[10px]">
        <span className="font-medium">{text}</span>
        <GoArrowUpRight className="icon45deg" />
      </button>
    </>
  );
};
export default Button;
