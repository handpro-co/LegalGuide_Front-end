import { FiMail } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEarthAsia } from "react-icons/fa6";
import Button from "../layout/Button";
import TextHoverAnimate from "../layout/textHoverAnimate";

const Footer = () => {
  const footerhoverText = [
    "Хууль зүйн зөвлөгөө",
    "Магадлан шинжилгээ",
    "Өмгөөллийн үйлчилгээ",
    "Esg",
  ];

  return (
    <div className="w-full   flex flex-col items-center  gap-[24px] rounded-[24px] ">
      <div className="flex flex-col gap-[24px] items-center w-full bg-[#F7F8FD] p-[24px] rounded-[24px]">
        <div className="text-[40px] text-center font-bold">
          Таны хуулийн зөвлөх
        </div>
        <div className="text-[18px] text-center font-medium">
          Бидэнтэй холбоо барьж, мэргэжлийн хууль зүйн зөвлөгөө аваарай.
        </div>
        <Button text={"Холбоо барих"} />
      </div>
      <div className="w-full bg-[#F7F8FD] p-[24px] rounded-[32px] flex flex-wrap lg:flex-nowrap	 gap-[50px]">
        <div className="  flex flex-col gap-[12px] w-full">
          <div className="flex flex-wrap  w-full rounded-[24px] gap-[12px] lg:gap-[2%]">
            <div className="bg-[#fff] flex flex-col rounded-[24px] p-[24px] gap-[24px] w-full lg:w-[49%] ">
              <FiMail className="w-[32px] h-[32px] text-[#226FD8]" />
              <div className="font-regular">info@legalguide.mn</div>
            </div>
            <div className="flex bg-[#fff] rounded-[24px] flex-col p-[24px] gap-[24px] w-full lg:w-[49%] ">
              <FaPhoneAlt className="w-[32px] h-[32px] text-[#226FD8]" />
              <div className="font-regular">+976 77770040</div>
            </div>
          </div>
          <div className="w-full">
            <a
              href="https://maps.app.goo.gl/s724wzpnwgyCurCq8"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-[24px] bg-[#fff] p-[24px] flex flex-col gap-[24px] hover:shadow-lg transition-shadow duration-200"
            >
              <FaEarthAsia className="w-[32px] h-[32px] text-[#226FD8]" />
              <div className="font-regular">
                Монгол Улс, Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо,
                Амбассадор оффис, 403б тоот
              </div>
            </a>
          </div>
        </div>

        <div className="w-full lg:w-[30%] h-[90%] flex flex-col items-center gap-[12px] lg:gap-[24px] text-center rounded-[24px] w-full ">
          <div className="text-[16px] text-[#226FD8] font-bold">Үйлчилгээ</div>
          {footerhoverText.map((content, i) => (
            <div key={i}>
              <TextHoverAnimate text={content} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Footer;
