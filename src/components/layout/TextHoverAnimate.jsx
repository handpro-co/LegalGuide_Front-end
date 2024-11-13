const TextHoverAnimate = ({ text }) => {
  return (
    <div className="overflow-hidden h-[30px] cursor-pointer">
      <div className="transition-transform duration-500 hover:translate-y-[-30px] ">
        <div className="text-[15px] h-[30px] font-medium">{text}</div>
        <div className="text-[15px] h-[30px] text-[#226FD8] font-medium">
          {text}
        </div>
      </div>
    </div>
  );
};
export default TextHoverAnimate;
