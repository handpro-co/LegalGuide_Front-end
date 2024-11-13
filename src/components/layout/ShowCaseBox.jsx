const ShowCaseBox = ({ title, photo, text }) => {
  return (
    <div className="w-full  parentHover">
      <div className="w-full flex flex-col gap-[12px]">
        <img
          src={photo}
          alt="Image"
          className="w-full h-[350px] object-cover  rounded-[24px] overflow-hidden bg-gray-200   image-colorHover"
        />
        <div className="w-full   bg-[#F7F8FD] rounded-[24px] p-[24px] gap-[12px] flex flex-col text-borderHover">
          <div className="text-[16px] md:text-[24px] font-bold">{title}</div>
          <div className="font-regular text-[#444444] line-clamp-3 text-[15px] md:text-[16px]">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShowCaseBox;
