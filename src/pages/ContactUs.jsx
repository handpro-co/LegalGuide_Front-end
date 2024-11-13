import ContactUsSendComment from "../components/ContactUsSendComment";
import backgroundBannerPhoto from "../homePagesPeoplesPhoto/BannerRadialPhoto.png";
import OnclickShowText from "../components/layout/OnclickShowText";
import contactUsMockData from "../components/mockDatas/contactUsMockData";
const ContactUs = () => {
  const mockDataQuestion = contactUsMockData();
  return (
    <div className="flex flex-col gap-[400px] items-center">
      <div
        className=" w-full h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundBannerPhoto.src})` }}
      >
        <ContactUsSendComment />
      </div>

      <div className="flex flex-col  items-center gap-[24px] w-full md:w-[50%] p-4">
        <div className="text-[#282828] text-[24px] md:text-[32px] font-bold text-center">
          Түгээмэл асуулт
        </div>
        <div className="p-[12px] bg-[#edeffd] rounded-[28px] w-full">
          <div className="w-full flex flex-col bg-[#fff] rounded-[24px] shadow-md">
            {mockDataQuestion.map((item, i) => (
              <div key={i}>
                <OnclickShowText text={item.text} title={item.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
