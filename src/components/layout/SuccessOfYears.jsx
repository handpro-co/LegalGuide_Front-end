
const SuccessOfYears = ({ year, text }) => {
 
  return (
    <div className="w-full flex flex-col items-center md:items-none md:flex-row md:items-start gap-[48px]">
      <div className="flex flex-col gap-[20px] w-[50%] md:w-[20%] items-center ">
        <div className="text-[66px] font-medium text-center text-[#226fd8]">
          {year}
        </div>
        <div className="flex justify-center hidden md:flex justify-center">
          <div className="w-[3px] h-[200px] bg-gradient-to-t from-[rgba(35,109,212,1)] to-[rgba(35,109,212,0)] rounded-br-[2px] rounded-bl-[2px]" />
        </div>
      </div>
      <div className="w-[100%] md:w-[80%] py-[20px]">
        <div className="w-full py-[20px] px-[30px] border-[1px] border-[#ccc] rounded-[20px]">
          <ul className="list-disc pl-[7.56px]">
            {text.map((item, i) => (
              <li key={i}>
                <p className="text-[#444444] font-regular">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default SuccessOfYears;
