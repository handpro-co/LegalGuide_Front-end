import { useState, useEffect } from "react";
import backgroundBannerPhoto from "../homePagesPeoplesPhoto/BannerRadialPhoto.png";
import { useRouter } from "next/router";

const Project = () => {
  const router = useRouter();
  const { id } = router.query;

  const [mockData, setMockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/previous-projects`, {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setMockData(data);
        } else {
          throw new Error("Failed to fetch project data.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [id]);

  const clicked_project =
    mockData.length > 0 ? mockData.find((project) => project.id === id) : null;

  return (
    <>
      <img
        className="w-full z-[-10] absolute top-0 left-0  object-cover h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]"
        src={backgroundBannerPhoto.src}
        alt="Background"
      />
      <div className="w-full h-auto mt-[130px]">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : clicked_project ? (
          <div className="w-full max-w-screen-4xl h-full  mx-auto flex flex-col items-center px-4 sm:px-6 md:px-8 ">
            <div
              style={{
                backgroundImage: `url(${clicked_project.image_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="relative w-[100%] h-[350px]  rounded-[24px] mb-6"
            >
              <div className="absolute w-full h-full inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-[22px]"></div>
              <div className="absolute w-full bottom-[5%] left-[50%] transform -translate-x-1/2 z-20 ">
                <div className="w-full text-white px-[5%] text-[20px] md:text-[20px] lg:text-[30px]  font-bold leading-tight text-center">
                  {clicked_project.project_name}
                </div>
              </div>
            </div>

            <div className="w-full max-w-4xl  text-white text-center mt-6 text-left">
              {/* Brief Description */}
              <div>
                <div className="text-[black] text-left text-[28px] font-bold py-[24px]">
                  Товч
                </div>
                <br />
                <div
                  className="text-[16px] text-[#444444] font-regular text-left"
                  dangerouslySetInnerHTML={{
                    __html: clicked_project.brief_description || "",
                  }}
                ></div>
              </div>

              {/* Issues */}
              <div>
                <div className="text-[black] text-left text-[28px] font-bold py-[24px]">
                  Асуудал
                </div>
                <br />
                <div
                  className="text-[16px] text-[#444444] font-regular text-left"
                  dangerouslySetInnerHTML={{
                    __html: clicked_project.issues || "",
                  }}
                ></div>
              </div>

              {/* Work Progress */}
              <div>
                <div className="text-[black] text-left text-[28px] font-bold py-[24px]">
                  Ажлын явц
                </div>
                <br />
                <div
                  className="text-[16px] text-[#444444] font-regular text-left"
                  dangerouslySetInnerHTML={{
                    __html: clicked_project.work_progress || "",
                  }}
                ></div>
              </div>

              {/* Results */}
              <div>
                <div className="text-[black] text-left text-[28px] font-bold py-[24px]">
                  Үр дүн
                </div>
                <br />
                <div
                  className="text-[16px] text-[#444444] font-regular text-left"
                  dangerouslySetInnerHTML={{
                    __html: clicked_project.results || "",
                  }}
                ></div>
              </div>

              {/* Statistics */}
              <div>
                <div className="py-[24px] text-[black] text-left text-[28px] font-bold">
                  Статистик
                </div>
                <br />
                <div
                  className="text-[16px] text-[#444444] font-regular text-left"
                  dangerouslySetInnerHTML={{
                    __html: clicked_project.statistics || "",
                  }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <p>No project found for the specified ID.</p>
        )}
      </div>
    </>
  );
};

export default Project;
