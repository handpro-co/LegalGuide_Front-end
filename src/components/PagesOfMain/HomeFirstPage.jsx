import Button from "../layout/Button";
import Photo1 from "../../homePagesPeoplesPhoto/Peoples/Photo1.png"
import Photo2 from "../../homePagesPeoplesPhoto/Peoples/Photo2.png";
import Photo3 from "../../homePagesPeoplesPhoto/Peoples/Photo3.png";
import Photo4 from "../../homePagesPeoplesPhoto/Peoples/Photo4.png";
import Link from "next/link";
import RadialBannerPhoto from "../../homePagesPeoplesPhoto/BannerRadialPhoto.png";

const HomeFirstPage = () => {
  const peoples = [
    {
      photo: Photo1,
      color: "red",
    },
    {
      photo: Photo2,
      color: "yellow",
    },
    {
      photo: Photo3,
      color: "blue",
    },
    {
      photo: Photo4,
      color: "purple",
    },
  ];
  const text = `Манай хуулийн фирм нь хууль зүйн зөвлөгөө өгөх, гэрээ, хэлцэл, эрх
          зүйн бусад баримт бичгийн төсөл боловсруулах, хууль зүйн магадлан
          шинжилгээ хийх, өмгөөллийн бүх төрлийн үйлчилгээ үзүүлнэ.`;

  return (
    <>
      <img
        className="w-full absolute top-[80px] left-0 bg-center object-cover z-[-999]"
        src={RadialBannerPhoto.src}
        alt=""
      />
      <div className="w-full h-[83vh] mt-[100px] flex flex-col items-center justify-center gap-[40px] rounded-[50px] z-[1] homepageBg">
        <div className="flex gap-[16px] items-center flex-col">
          <div>
            <div className="text-[#226FD8] text-[42px] lg:text-[74px] md:text-[64px] lg:leading-[90px]  text-center font-bold">
              Таны хуулийн зөвлөх
            </div>
            <div className="text-[#272B34] text-[38px] lg:text-[74px] md:text-[60px] text-center text-gradient font-bold">
              Legal guide
            </div>
          </div>
          <div className="text-[#282828] text-center text-[14px] md:text-[16px] w-[80%] md:w-[55%] font-regular">
            {text}
          </div>
          <Link href={"./ContactUs"}>
            <Button text={"Үйлчилгээ авах"} />
          </Link>
        </div>
        <div className="flex flex-col gap-[12px]">
          <div className="text-center text-[#282828] font-medium">
            Манай баг хамт олон.
          </div>
          <Link href={"../About-Us"}>
            <div className="flex gap-[8px] justify-center">
              <div className="flex gap-[2px]">
                {peoples.map((item, i) => (
                  <img
                    key={i}
                    style={{ backgroundColor: `${item.color}` }}
                    src={item.photo.src}
                    className="w-[30px] h-[30px] md:w-[39px] md:h-[39px] rounded-[50%]"
                    alt={`team-member-${i}`}
                  />
                ))}
              </div>
              <div className="flex items-center">
                <div className="text-[#272B34] text-[16px] md:text-[18px] flex items-center opacity-[40%] font-semiBold">
                  +14
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
export default HomeFirstPage;
