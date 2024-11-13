import ShowCaseBox from "../components/layout/ShowCaseBox";
import backgroundBannerPhoto from "../homePagesPeoplesPhoto/BannerRadialPhoto.png";
import { useState, useEffect } from "react";

const PeriviousProjects = () => {
  const [projects, setProjects] = useState();
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("/api/previous-projects");
      const data = await response.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);
  return (
    <>
      <img
        className="w-full z-[-999] absolute"
        src={backgroundBannerPhoto.src}
        alt="Background"
      />
      <div className="flex flex-col items-center gap-[24px] w-[90%] md:w-[70%] z-[1] m-[20px] md:m-[70px]">
        <div className="flex flex-col items-center justify-center gap-[50px]">
          <div className="text-[32px] md:text-[48px] font-bold text-[rgba(18,18,18,0.8)] text-center">
            Өмнө ажиллаж байсан төслүүд
          </div>
          <div className="grid grid-cols-1  md:grid-cols-2 gap-[20px]">
            {projects &&
              projects.map((item, i) => (
                <div key={i}>
                  <ShowCaseBox
                    title={item.project_name}
                    text={item.brief_description}
                    photo={item.image_url}
                  />
                </div>
              ))}
          </div>
          {projects && projects.length > 3 ? (
            <button className="inline p-[10px] md:p-[12px] rounded-[10px] bg-[#444] text-[#fff] font-semibold hover:bg-opacity-[60%] hover:text-blue-300">
              Илүү ихийг
            </button>
          ) : (
            <div className="inline p-[10px] md:p-[12px] rounded-[10px] bg-[#444] text-[#fff] font-semibold ">
              No Data
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default PeriviousProjects;
