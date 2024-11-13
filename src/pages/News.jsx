import { useEffect, useState } from "react";
import RadialBanner from "../homePagesPeoplesPhoto/BannerRadialPhoto.png";
import NewsCard from "../components/layout/NewsCardAndBlog";
import Image from "next/image";

const News = () => {
  const [onClickButton, setOnClickButton] = useState("Хуульч мазаалай");
  const [showNews, setShowNews] = useState([]);
  const [mockData, setMockData] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/news");
        if (response.ok) {
          const data = await response.json();
          setMockData(data);
        } else {
          console.error("Failed to fetch news data.");
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (mockData && mockData.length > 0) {
      const filteredNews = mockData.filter(
        (item) => item.category === onClickButton
      );
      setShowNews(filteredNews);
    }
  }, [onClickButton, mockData]);

  const categories = [
    "Хуульч мазаалай",
    "Хуулийн талаар",
    "Цаг үеийн мэдээ, мэдээлэл",
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span>Loading...</span>{" "}
      </div>
    );
  }

  return (
    <>
      <Image
        className="absolute inset-0 object-cover z-[-1] h-auto w-auto"
        src={RadialBanner}
        alt="Banner"
        priority
      />
      <div className="w-full pt-10 mt-[150px] md:pt-20 px-4 md:px-8 pb-16 flex flex-col gap-10 z-[1]">
        <h1 className="font-bold text-center text-[#282828] text-[48px] md:text-[42px] sm:text-[32px] ">
          Мэдээ мэдээлэл
        </h1>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((type) => (
            <button
              key={type}
              onClick={() => setOnClickButton(type)}
              className={`rounded-lg px-3 py-2 text-sm md:text-base font-semibold transition-all duration-200 ${
                onClickButton === type
                  ? "bg-[#226FD8] text-white"
                  : "bg-[#F2F6FD] text-[#757575] hover:bg-[#D2E0F9] hover:text-[#282828]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {showNews.length > 0 ? (
            showNews.map((item) => (
              <div key={item.id}>
                <NewsCard
                  title={item.title}
                  text={item.details}
                  image={item.image_url}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-lg text-gray-600">
              Энэ категорид мэдээ байхгүй.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default News;
