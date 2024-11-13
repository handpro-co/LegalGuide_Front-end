import backgroundBannerPhoto from "../../homePagesPeoplesPhoto/BannerRadialPhoto.png";
import Button from "../layout/Button";
import Link from "next/link";
const ServiceWelcomePage = () => {
  return (
    <div
      className="w-full   flex justify-center  h-[600px] items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundBannerPhoto.src})` }}
    >
      <div className=" w-[649px] flex flex-col  gap-[24px]">
        <div className="text-[#282828] font-bold  text-[38px] text-center">
          Бидний үйлчилгээ
        </div>
        <div className="text-[15px] font-regular text-[#333333] text-center">
          Иргэн, хуулийн этгээд бизнесийн үйл ажиллагаагаа хүчин төгөлдөр хууль
          тогтоомжид нийцүүлэн явуулахад өдөр тутмын хууль зүйн зөвлөгөө өгч
          хууль зүйн эрсдэлээс урьдчилан сэргийлэхэд туслалцаа үзүүлэн
          ажилладаг.
        </div>
        <div className="flex justify-center ">
          <Link href={"./ContactUs"}>
            <Button text={"Холбоо барих"} />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ServiceWelcomePage;
