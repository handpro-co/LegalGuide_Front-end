import {
  Blog,
  Animate,
  HomeFirstPage,
  Servicee,
  ShowCase,
} from "../components/PagesOfMain";
import { useState } from "react";
import { useEffect } from "react";
const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(
      "%cЗогс!",
      "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
    );
    console.log(
      "%cConsole Битгий ухаачээ хүүхдээ !!!",
      "color:black;font-family:system-ui;font-size:1rem;-webkit-text-stroke: 1px black;font-weight:bold"
    );
  }, []);

  
  return (
    <>
      <HomeFirstPage />
      <Servicee />
      <ShowCase />
      <Animate />
      <Blog />
      
    </>
  );
};
export default Home;
