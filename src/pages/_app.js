import "../styles/globals.css";
import Head from "next/head";
import Chatgpt from "../components/chatgpt/Chatgpt";
import { Footer, Navigation } from "../components/fixedComponents";
import "../styles/font.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AdminNavigation from "./admin/AdminNavigation";
const App = ({ Component, pageProps }) => {
  const router = useRouter();

  const isAdminPage = router.pathname.startsWith("/admin");
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
      <Head>
        <link rel="icon" href="/images/Icon.png" />
        <title>Легал Гайд хуулын фирм</title>
        <meta name="title" content="Легал Гайд хуулын фирм" />
        <meta
          name="description"
          content="Хууль зүйн зөвлөгөө, гэрээ, бичиг баримтын төсөл боловсруулах, өмгөөлөл, хууль зүйн магадлан шинжилгээ, оюуны өмчийг хамгаалах үйлчилгээ үзүүлнэ."
        />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://legalguide.mn/" />
        <meta property="og:title" content="Легал Гайд хуулын фирм" />
        <meta
          property="og:description"
          content="Хууль зүйн зөвлөгөө, гэрээ, бичиг баримтын төсөл боловсруулах, өмгөөлөл, хууль зүйн магадлан шинжилгээ, оюуны өмчийг хамгаалах үйлчилгээ үзүүлнэ."
        />
        <meta property="og:image" content="/images/Icon.png" />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://legalguide.mn/" />
        <meta property="twitter:title" content="Легал Гайд хуулын фирм" />
        <meta
          property="twitter:description"
          content="Хууль зүйн зөвлөгөө, гэрээ, бичиг баримтын төсөл боловсруулах, өмгөөлөл, хууль зүйн магадлан шинжилгээ, оюуны өмчийг хамгаалах үйлчилгээ үзүүлнэ."
        />
        <meta property="twitter:image" content="/images/Icon.png" />
      </Head>
      <div
        div
        className="flex flex-col items-center gap-[100px] w-full px-[20px] md:px-[60px] lg:px-[120px] 2xl:px-[300px]"
      >
        {!isAdminPage ? (
          <>
            <Chatgpt />
            <Navigation />
          </>
        ) : (
          <AdminNavigation />
        )}

        <Component {...pageProps} />
        {!isAdminPage && <Footer />}
      </div>
    </>
  );
};

export default App;
