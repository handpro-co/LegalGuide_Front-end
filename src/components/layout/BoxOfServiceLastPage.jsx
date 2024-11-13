const BoxOfServiceLastPage = ({ key, title, Icon, text }) => {
  return (
    <div
      key={key}
      className="rounded-[24px] border-[0.5px] border-[#ccc] p-[32px] flex flex-col items-center gap-[12px] w-full z-[2] backdrop-blur-[12px]"
    >
      <div className="bg-[white] p-[12px] w-[48px] h-[48px] rounded-[20px] border-[#226fd8] border-[0.5px] flex items-center justify-center text-[#226fd8] ">
        {<Icon className="w-[36px] h-[36px]" />}
      </div>
      <div className="text-[#081931] font-bold text-[20px] text-center">
        {title}
      </div>
      <div className="text-[#333333] font-regular text-[15px] text-center ">
        {text}
      </div>
    </div>
  );
};
export default BoxOfServiceLastPage;
