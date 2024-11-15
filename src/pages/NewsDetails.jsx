import { useState, useEffect } from "react";
import backgroundBannerPhoto from "../homePagesPeoplesPhoto/BannerRadialPhoto.png";
import { useRouter } from "next/router";

const NewsDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [mockData, setMockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/news");
        if (response.ok) {
          const data = await response.json();
          setMockData(data);
        } else {
          throw new Error("Failed to fetch news data.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const clicked_news = mockData.find((item) => item.id === id);

  return (
    <>
      <img
        className="w-full z-[-10] absolute top-0 left-0 object-cover h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]"
        src={backgroundBannerPhoto.src}
        alt="Background"
      />
      <div className="w-full mt-[130px]">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : clicked_news ? (
          <div className="w-full max-w-screen-3xl max-h-[1000px] mx-auto relative flex flex-col items-center px-4 sm:px-6 md:px-8">
            <div className="relative w-full rounded-[24px] overflow-hidden mb-6">
              <img
                className="w-full h-auto object-cover object-center"
                src={clicked_news.image_url}
                alt={clicked_news.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-[5%] left-[50%] transform -translate-x-1/2 z-20 text-center">
                <div className="flex gap-4 justify-center items-center mb-4 flex-wrap">
                  <div className="inline-block text-white text-[14px] font-medium rounded-[24px] px-[8px] py-[4px] bg-[#EEEEEE] bg-opacity-20">
                    {clicked_news.date}
                  </div>
                  <div className="inline-block text-white text-[14px] font-medium rounded-[24px] px-[8px] py-[4px] bg-[#EEEEEE] bg-opacity-20">
                    {clicked_news.category}
                  </div>
                </div>
                <div className="text-white text-[32px] md:text-[48px] font-bold leading-tight">
                  {clicked_news.title}
                </div>
              </div>
            </div>
            <div className="w-full max-w-4xl relative text-white text-center mt-6">
              <p
                className="mt-4 text-[16px] text-[black] font-regular text-left"
                dangerouslySetInnerHTML={{ __html: clicked_news.details }}
              ></p>
            </div>
          </div>
        ) : (
          <p>No news item found for the specified ID.</p>
        )}
      </div>
    </>
  );
};

export default NewsDetails;
