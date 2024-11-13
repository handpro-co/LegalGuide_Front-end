import {
  Blog,
  Animate,
  HomeFirstPage,
  Servicee,
  ShowCase,
} from "../components/PagesOfMain";
import { useState } from "react";
const Home = () => {
  const [data, setData] = useState([]);

  return (
    <>
      <HomeFirstPage />
      <Servicee />
      <Animate />
      <ShowCase />
      <Blog />
    </>
  );
};
export default Home;
