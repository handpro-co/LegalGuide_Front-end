const MemberCard = ({ name, photo, position }) => {
  return (
    <div className="w-full sm:w-[367px] h-[500px] flex flex-col gap-[12px] ">
      <div
        style={{
          background:
            "linear-gradient(to top, rgba(100,100,100,0.3) 0%, white 30%)",
        }}
        className="w-full  h-[422px] relative overflow-hidden border-[0.5px] rounded-[24px] border-[rgb(230, 230, 230)] z-[0] "
      >
        <img src={photo} alt="" className="w-full z-[1]   bottom-0" />
        <div className="absolute h-[336px] w-[400px] bg-[#E5EBFF] bottom-[-70px] right-[-18px] rounded-[50%] z-[-1]" />
      </div>
      <div className="flex flex-col gap-[12px] p-[12px] bg-[#F5F5F5] rounded-[16px]">
        <div className="font-bold text-[20px] text-center">{name}</div>
        <div className="text-[18px] font-regular text-center">{position}</div>
      </div>
    </div>
  );
};
export default MemberCard;
