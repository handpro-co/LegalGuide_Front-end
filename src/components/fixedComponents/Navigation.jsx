import logoPng from "../../homePagesPeoplesPhoto/converted-files/logo.png";
import TextHoverAnimate from "../layout/TextHoverAnimate";
import ButtonNoBGColor from "../layout/ButtonNoBGColor";
import EnglishPng from "../icon/English.png";
import Mongolia from "../icon/Mongolia";
import { useState } from "react";
import Link from "next/link";

const Navigation = () => {
  const [changeFlag, setChangeFlag] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [rotate, setRotate] = useState(false);
  const changeFlagFunction = () => {
    setChangeFlag(!changeFlag);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setRotate(!rotate);
  };

  return (
    <div className="w-full h-[84px] flex justify-between items-center fixed border-b-[1px] border-b-gray-200 z-[999] bg-white px-4 md:px-8">
      <Link href="./">
        <img src={logoPng.src} className="h-[56px]" alt="LogoPng" />
      </Link>
      <div className="hidden lg:flex h-[56px] justify-center items-center gap-[40px]">
        <Link href={"./Service"}>
          <TextHoverAnimate text={"Үйлчилгээ"} />
        </Link>
        <Link href={"./About-Us"}>
          <TextHoverAnimate text={"Бидний тухай"} />
        </Link>
        <Link href={"./News"}>
          <TextHoverAnimate text={"Мэдээлэл"} />
        </Link>
        <Link href={"./PeriviousProjects"}>
          <TextHoverAnimate text={"Өмнөх төслүүд"} />
        </Link>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-[84px] left-0 w-full bg-white shadow-md  flex flex-col items-center gap-[10px] p-[12px]">
          <Link href={"./Service"} onClick={toggleMobileMenu}>
            <TextHoverAnimate text={"Үйлчилгээ"} />
          </Link>
          <Link href={"./About-Us"} onClick={toggleMobileMenu}>
            <TextHoverAnimate text={"Бидний тухай"} />
          </Link>
          <Link href={"./News"} onClick={toggleMobileMenu}>
            <TextHoverAnimate text={"Мэдээлэл"} />
          </Link>
          <Link href={"./PeriviousProjects"} onClick={toggleMobileMenu}>
            <TextHoverAnimate text={"Өмнөх төслүүд"} />
          </Link>
          <Link href={"./ContactUs"} onClick={toggleMobileMenu}>
            <ButtonNoBGColor text={"Холбоо барих"} />
          </Link>
        </div>
      )}
      <div className="flex gap-[20px] items-center">
        <div className="hidden lg:flex">
          <Link href={"./ContactUs"}>
            <ButtonNoBGColor text={"Холбоо барих"} />
          </Link>
        </div>
        <div onClick={changeFlagFunction} className="w-[30px] h-[30px] rounded-full cursor-pointer">
          {changeFlag ? <Mongolia className="rounded-full" /> : <img src={EnglishPng.src} alt="flag" />}
        </div>
        <div className="flex items-center lg:hidden">
          <button
            onClick={toggleMobileMenu}
            style={{ backgroundColor: rotate ? "#226fd8" : "#D1D5DB" }}
            className=" w-[36px] h-[36px] flex flex-col gap-[7px] items-center justify-center rounded-[10px]">
            <>
              <div
                style={{
                  transform: rotate ? "rotate(45deg)" : "none",
                  position: rotate ? "absolute" : "static",
                  transition: "transform 0.3s linear"
                }}
                className="w-[20px] h-[2px] bg-[#fff] "
              />
              <div
                style={{
                  transform: rotate ? "rotate(-45deg)" : "none",
                  position: rotate ? "absolute" : "static",

                  transition: "transform 0.3s linear"
                }}
                className="w-[20px] h-[2px] bg-[#fff]"
              />
            </>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Navigation;
