const successData = () => {
  const mockData = [
    {
      year: 2024,
      text: [
        [
          " 2024 оны 04 дүгээр сарын 01-ний өдөр Монгол Улсаас Япон Улсад суугаа Элчин сайдын яам, Монголын Хуульчдын холбоотой тус тус хамтран Япон улсад суугаа Монгол улсын иргэдэд зориулсан Эрх зүйн туслалцаа үзүүлэх өдөрлөг-ийг Токио хотноо зохион байгуулсан.",
        ],
        [
          " 2024 оны 03 сарын 15-ны өдөр Монголын Хуульчдын холбоо, АНУ-ын Элчин сайдын яамтай хамтран “Цахим шилжилт ба БАР-н холбоо” хэлэлцүүлгийг дэмжигчээр ажилласан. Өмгөөллийн Легал гайд хуулийн фирмийн гүйцэтгэх захирал Ч.Отгонбаатар хэлэлцүүлгийн чиглүүлэгчээр оролцож АНУ-ын Аризона мужийн Дээд шүүхийн Ерөнхий шүүгч Роберт Брутинел, АНУ-ын Аризона мужийн шүүхүүд болон харьяа байгууллагуудын Захиргааны дарга Дэйв Байерс нартай хэлэлцүүлэг өрнүүлсэн.  ",
        ],
        [
          "2024 оны 4 сарын 15-ны өдөр Монгол Улсын дээд шүүх, Монголын Хуульчдын холбоо, Монголын Өмгөөлөгчдийн холбооноос хамтран зохион байгуулсан “MOCK TRIAL-ЗХШ 20 ЖИЛ” шүүхийн мэтгэлцээний тэмцээнд Өмгөөллийн Легал Гайд хуулийн фирмийн баг амжилттай оролцож “Гутгаар байр” эзэлсэн.",
        ],
        [
          '2024 оны 4 сарын 18-ны өдөр Хуульчдын холбооноос тав дахь жилдээ “Хуульчдын форум”-ыг “Шигдэх үү, шинэчлэх үү” уриан дор “Үндэсний эрх зүйн тогтолцооны асуудал, шинэчлэл” сэдвээр зохион байгуулсан. Өмгөөллийн "Легал Гайд" хуулийн фирм "Хуульчдын форум"-ын дэмжигч байгууллагаар ажилласан. ',
        ],
        [
          "2024 оны 4 сарын 30-ны өдөр Монголын Хуульчдын Холбооны Иргэний эрх зүйн хорооноос уламжлал болгон зохион байгуулдаг хууль зүйн их дээд сургуулийн оюутнуудын эрдэм шинжилгээний илтгэлийн уралдааныг дэмжигч байгууллагаар оролцсон. ",
        ],
        [
          "2024 оны 4 сарын 26-ны өдөр Монгол Улсын дээд шүүхийн Захиргаа болон Иргэний хэргийн танхим, Нээлттэй нийгэм форумаас хамтран Шүүхэд нийтийн ашиг сонирхлыг төлөөлөх нь сэдэвт зөвлөлдөх уулзалтыг зохион байгуулсан. Тус зөвлөлдөх уулзалтад Өмгөөллийн Легал гайд хуулийн фирмийн гүйцэтгэх захирал хуульч, өмгөөлөгч Ч.Отгонбаатар “Өмгөөлөгч нийтийн эрх, ашиг сонирхлыг хамгаалах зорилгоор өөрийн нэрийн өмнөөс нэхэмжлэл гаргах эрх зүйн зохицуулалт” сэдвээр илтгэл танилцуулсан.",
        ],
        [
          "2024 оны 05 сарын 02-ны өдөр зохион байгуулагдсан “Хуульчийн пробоно өдөр - 2024” өдөрлөгт оролцож иргэдэд хууль зүйн үнэ төлбөргүй зөвлөгөө өгсөн. ",
        ],
      ],
    },
    {
      year: 2023,
      text: [
        [
          "Санхүүгийн зохицуулах хорооны 2023 оны 03 дугаар сарын 31-ний өдрийн ээлжит хурлаар албан ёсоор зөвшөөрлөөр Үнэт цаасны зах зээлд оролцогчид хууль зүйн зөвлөгөө өгөх, хуульчийн дүгнэлт гаргах эрх бүхий хуулийн этгээдээр бүртгэгдсэн.",
        ],
        [
          "“Улаанбаатар - 2023” Жюү жицү тэмцээний дэлхийн аварга шалгаруулах тэмцээний хуулийн зөвлөхөөр ажилласан. ",
        ],
        [
          "“Оюутны стратегийн өмгөөлөл, нөлөөлөл 2023” хөтөлбөрт хөтөч хуулийн фирмээр оролцож нийтийн эрх ашгийг хамгаалах төсөл хэрэгжүүлсэн.",
        ],
        [
          "“Өмгөөлөгч-танд тусалъя 2023” өдөрлөгт тус тус оролцож иргэдэд хууль, эрх зүйн үнэ төлбөргүй зөвлөгөө өгсөн.",
        ],
        [
          "2023 оны Хуульчийн мэргэжлийн шалгалтад нийт 1200 оролцогчоос Хуульч Н.Баясгалан нь нийт оноогоор 2 дугаарт эрэмбэлэгдэв. ",
        ],
        [
          '2023 оны 12 дугаар сарын 16-ны өдөр зохион байгуулагдсан Монголын Хуульчдын Холбооны Ерөнхийлөгчийн нэрэмжит "Mock Trial - 2023" шүүхийн мэтгэлцээний тэмцээнийг дэмжиж оролцсон. ',
        ],
        [
          "2023 оны 12 сарын 08-ны өдөр хуульч У.Азжаргал, Н.Баясгалан нарын ажилласан Гэрийн тэжээвэр амьтны тухай хууль батлагдсан. ",
        ],
      ],
    },
    {
      year: 2022,
      text: [
        [
          '2022 оны 10 сарын 20-ны өдөр зохион байгуулагдсан Татварын мэргэшсэн зөвлөхийн нийгэмлэгийн "Спортлог ТМЗ-2022" спортын V наадмын Дартсын төрлийг дэмжиж ивээн тэтгэгчээр оролцсон.',
        ],
        [
          "Хуульч Удвалын Азжаргал нь Монголын Хуульчдын Холбооны 2022 оны хуульчийн мэргэжлийн шалгалтын, өмгөөлөгч Төмөрхуягын Мөнх-Очир нь Монголын Өмгөөлөгчдийн Холбооны 2022 оны өмгөөлөгчийн шалгалтын хамгийн өндөр оноог тус тус авсан.",
        ],
      ],
    },
    {
      year: 2021,
      text: [
        [
          '2021 онд "Шамбала 2056" болон "Байгаль Хайртай Хүн Бай" аянд нэгдэж Мод эзэмшигч байгууллага болсон. ',
        ],
      ],
    },
  ];
  return mockData;
};
export default successData;
