import ButtonNoBGColor from "../layout/ButtonNoBGColor";
import NewsCard from "../layout/NewsCardAndBlog";
import Link from "next/link";
import blogData from "../mockDatas/blogData";

const Blog = () => {
  const mockData = blogData();


  return (
    <div className="w-full flex flex-col gap-[80px]  ">
      <div className="flex flex-col justify-between lg:flex-row items-center gap-[20px] ">
        <div className="flex flex-col gap-[16px] ">
          <div className="text-[40px]  text-[#282828] font-bold  text-center lg:text-left">
            Хуулийн талаар
          </div>
          <div className="text-[#282828] text-[18px] font-regular text-center lg:text-left">
            Долоо хоног бүр хууль эрх зүйн сүүлийн үеийн мэдээлэл
          </div>
        </div>
        <div className="flex flex-col-reverse">
          <Link href={"../../News"}>
            <ButtonNoBGColor text={"Бүгдийн харах"} />
          </Link>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-[40px]">
        {mockData.map((item, i) => (
          <NewsCard
            title={item.title}
            image={item.image}
            text={item.text}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};
export default Blog;
