const NewsCard = ({ image, title, text }) => {
  return (
    <div className=" w-full flex gap-[8px] flex-col parentHover m-0">
      <img
        src={image}
        className="bg-gray-200 h-[320px] rounded-[12px] object-cover image-colorHover "
      />
      <div className="px-[12px] w-full py-[6px] gap-[8px]">
        <div className="rounded-[12px] text-[24px] font-semiBold leading-[33.6px] ">
          {title}
        </div>
        <div className="text-[16px] font-regular ">{text} </div>
      </div>
    </div>
  );
};
export default NewsCard;
