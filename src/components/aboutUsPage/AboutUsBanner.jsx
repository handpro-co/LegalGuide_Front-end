import AboutUsPhoto from "../../homePagesPeoplesPhoto/AboutUsBanner.png";

const AboutUsBanner = () => {
  return (
    <div className="relative  mt-[132px]  bg-center rounded-tr-[50px] rounded-tl-[50px] mx-auto">
      <img
        className="rounded-tr-[50px] rounded-tl-[50px] w-full h-auto object-cover"
        src={AboutUsPhoto.src}
        alt="About Us Banner Photo"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/100 bottom-0 pointer-events-none rounded-tr-[50px] rounded-tl-[50px]">
        <div className="flex flex-col items-center justify-end h-full p-4">
          <div className="absolute bottom-[-50px] text-center ">
            <h2 className="text-[24px] md:text-[32px] lg:text-[48px] font-bold">
              Таны хуулийн хамтрагч
            </h2>
            <p className="text-[#282828] text-[16px] md:text-[18px] font-regular">
              2009-2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutUsBanner;
