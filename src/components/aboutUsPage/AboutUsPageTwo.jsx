import OnclickShowText from "../layout/OnclickShowText";
import AboutUsPageTwoMockData from "../mockDatas/AboutUsPageTwoMockData";
const AboutUsPageTwo = () => {
  const mockShowdata = AboutUsPageTwoMockData();
 
  return (
    <div className="w-full h-[593px] flex justify-center items-center px-[100px]">
      <div className="w-full h-[auto] flex flex-col md:flex-row">
        <div className="w-full md:w-[50%] h-[auto] flex flex-col gap-[24px] p-4">
          <div className="font-bold text-[26px] md:text-[40px]">
            Бидний тухай
          </div>
          <div>
            <div className="text-[15px] md:text-[18px] font-regular">
              Өмгөөллийн “Легал гайд” ХХК нь хууль зүй, өмгөөллийн үйлчилгээ
              үзүүлэх чиглэлээр
              <span className="text-[15px] md:text-[18px] font-regular text-[#226fd8] mr-[5px] ml-[5px]">
                2009 онд үүсгэн байгуулагдсан
              </span>
              ба 2020 оны 01 дүгээр сарын 01-ний өдрөөс эхлэн мөрдөгдөж буй
              Өмгөөллийн тухай хуулийн дагуу Өмгөөллийн ХХК хэлбэрээр үйл
              ажиллагаагаа явуулж байна.
            </div>
            <div className="text-[15px] md:text-[18px] font-regular">
              Манай хуулийн фирм нь үүсгэн байгуулагдсан үеэс эхлэн
              <span className="font-semibold mr-[5px] ml-[5px]">
                Хууль зүйн судалгаа, магадлан шинжилгээ, дүгнэлт, зөвлөмж
                боловсруулах, Бизнесийн зөвлөх үйлчилгээ үзүүлэх, Иргэний болон
                Захиргааны хэрэг,
              </span>
              маргаан шүүхээр хянан шийдвэрлэх ажиллагаанд тогтмол оролцож ирсэн
              туршлагатай.
            </div>
          </div>
        </div>
        <div className="w-full md:w-[50%] h-[auto] flex justify-center items-center p-4">
          <div className="w-full md:w-[80%] flex flex-col gap-[16px]">
            {mockShowdata.map((item, i) => (
              <div
                className="border-[rgb(191,191,191)] border-[0.5px] rounded-[24px]"
                key={i}
              >
                <OnclickShowText title={item.title} text={item.text} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutUsPageTwo;
