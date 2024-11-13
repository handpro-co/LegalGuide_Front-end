import { useState, useEffect } from "react";
const newsMockData = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch("/api/news");
      const data = await response.json();
      setNews(data);
    };
    fetchNews();
  }, []);
  return news;
};
export default newsMockData;
