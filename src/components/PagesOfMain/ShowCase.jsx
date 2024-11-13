import ButtonNoBGColor from "../layout/ButtonNoBGColor";
import ShowCaseBox from "../layout/ShowCaseBox";
import { useEffect, useState } from "react";
import Link from "next/link";
const ShowCase = () => {
  const [casedata, setCasedata] = useState();

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("/api/previous-projects");
      const data = await response.json();
      setCasedata(data);
    };
    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col gap-[80px]   mx-auto">
      <div className="flex flex-col items-center gap-[24px]">
        <div>
          <div className="text-[24px] md:text-[40px] text-center font-bold">
            Бидний хийсэн зарим ажлууд
          </div>
          <div className="text-[15px] md:text-[18px] text-[#282828] text-center font-regular">
            Бидэнтэй холбогдож хууль зүйн мэргэжлийн үйлчилгээ аваарай.
          </div>
        </div>
        <Link href={"./PeriviousProjects"}>
          <ButtonNoBGColor text={"Бүгдийн харах"} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-[40px]">
        {casedata &&
          casedata.map((item, i) => (
            <div key={i}>
              <ShowCaseBox
                title={item.project_name}
                text={item.brief_description}
                photo={item.image_url}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
export default ShowCase;
