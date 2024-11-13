import {
  ServiceFirstDiv,
  ServiceFourthDiv,
  ServiceWelcomePage,
  ServiceSecondDiv,
  ServiceThirdDiv,
  ServiceLastPageOk,
} from "../components/ServiceComponents";

const Service = () => {
  return (
    <>
      <ServiceWelcomePage />
      <div className="flex flex-col items-center gap-[64px] w-full">
        <ServiceFirstDiv />
        <ServiceSecondDiv />
        <ServiceThirdDiv />
        <ServiceFourthDiv />
      </div>
      <div className="relative">
        <ServiceLastPageOk />
      </div>
    </>
  );
};
export default Service;
