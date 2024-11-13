import { CiHeart } from "react-icons/ci";
import { TbMessageCircleSearch } from "react-icons/tb";
import { FaEarthAsia } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";

const serviceeData = () => {
  const mockData = [
    {
      icon: CiHeart,
      title: "Өмгөөллийн үйлчилгээ",
      text: "Иргэн, хуулийн этгээдийн зөрчигдсөн эрхээ хамгаалахад болон иргэн, хуулийн этгээдийн хооронд үүссэн маргааныг хянан шийдвэрлэх ажиллагаанд өмгөөллийн үйлчилгээ үзүүлдэг.",
      backgroundColor: "#F7F8FD",
    },
    {
      icon: TbMessageCircleSearch,
      title: "Хууль зүйн зөвлөгөө",
      text: "Иргэн, хуулийн этгээд бизнесийн үйл ажиллагаагаа хүчин төгөлдөр хууль тогтоомжид нийцүүлэн явуулахад өдөр тутмын хууль зүйн зөвлөгөө өгөн хууль зүйн эрсдэлээс урьдчилан сэргийлэхэд туслалцаа үзүүлэн ажилладаг.",
      backgroundColor: "#fff",
    },
    {
      icon: FaEarthAsia,
      title: "Байгаль орчин, нийгэм, засаглалын дүгнэлт /ESG /",
      text: "Хуулийн этгээдийн үйл ажиллагаа хийгээд томоохон төслүүдийн байгаль орчин, хүний эрх, нийгмийн хариуцлага, засаглалын зохистой байдлын тайлан гаргах үйл ажиллагаа.",
      backgroundColor: "#fff",
    },
    {
      icon: IoIosSearch,
      title: "Хууль зүйн магадлан шинжилгээ хийх",
      text: "Хуулийн этгээдийн үйл ажиллагаа, шийдвэр хууль тогтоомжид нийцэж байгаа эсэхэд хууль зүйн магадлан шинжилгээг хийлгэснээр аливаа хууль зүйн эрсдэлээс урьдчилан сэргийлж чаддаг.",
      backgroundColor: "#F7F8FD",
    },
  ];
  return mockData;
};
export default serviceeData;
