import { supabase } from '../supabaseClient'

// --- TYPES ---

export type Product = {
  slug: string
  name: string
  type: string
  skinType: string
  timeUsage: string
  price: string // Ví dụ: "7.400.000 VNĐ"
  description: string
  info: string
  usage: string
  ingredients: string
  images: string[]
}

export type JournalArticle = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  readingTime: string
  image: string
  imageAlt: string
  date: string
  body: string[]
}

export type InquiryInput = {
  name: string
  email: string
  message: string
}

export type OrderInput = {
  client_name: string
  client_phone: string
  note?: string
  items: {
    name: string
    quantity: number
    price: string
  }[]
}

export type HeroSlide = {
  image: string
  tagline: string
  title: string
  titleSuffix: string
  description: string
  bgColor: string
  textColor: string
  btnClass: string
  link: string
}

// --- CONFIGURATION ---

// Đặt MOCK_MODE = true để chạy offline/giả lập API. Khi có API thật, chỉ cần chuyển thành false.
const MOCK_MODE = true 
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const MOCK_LATENCY = 600 // Giả lập độ trễ mạng 600ms

const MOCK_HERO_SLIDES: HeroSlide[] = [
  {
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=80',
    tagline: 'ƯU ĐÃI RA MẮT - GIẢM 15%',
    title: 'Exosome Bio-Cellular',
    titleSuffix: 'Đảo Ngược Lão Hóa',
    description: 'Nghi thức chăm sóc phục hồi da chuyên sâu ứng dụng công nghệ Exosome nồng độ cao 500,000ppm từ phòng Lab hoàng gia Seoul.',
    bgColor: 'bg-[#F2EDE4]',
    textColor: 'text-primary',
    btnClass: 'bg-primary text-on-primary hover:bg-secondary',
    link: '/collection'
  },
  {
    image: 'https://images.unsplash.com/photo-1608248597983-10eb2c101598?auto=format&fit=crop&w=1000&q=80',
    tagline: 'ĐẶC QUYỀN LÀN DA KHỎE MẠNH',
    title: 'Mito-vive Essence',
    titleSuffix: 'Cốt tủy Ty thể tế bào',
    description: 'Tinh chất mở đầu giúp kích hoạt năng lượng tế bào và củng cố hàng rào lipid bảo vệ trước tia cực tím và stress oxy hóa.',
    bgColor: 'bg-[#0F1A24]',
    textColor: 'text-white',
    btnClass: 'bg-secondary text-primary hover:bg-white',
    link: '/product/alpeh-mito-viv-first-treatment-essence'
  },
  {
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80',
    tagline: 'KHÁM PHÁ QUY TRÌNH HOÀNG GIA',
    title: 'Zayin Vital Essence',
    titleSuffix: 'Nuôi Dưỡng Sâu Tế Bào',
    description: 'Tinh chất giàu khoáng chất quý hiếm từ đại dương kết hợp thảo dược truyền thống, đẩy lùi hoàn toàn nếp nhăn và chùng nhão.',
    bgColor: 'bg-[#E3DCC8]',
    textColor: 'text-primary',
    btnClass: 'bg-primary text-on-primary hover:bg-secondary',
    link: '/product/zayin-rare-elements-vital-facial-essence'
  }
]

// --- MOCK DATA ---

const MOCK_PRODUCTS: Product[] = [
  {
    slug: 'zayin-rare-elements-vital-facial-essence',
    name: 'Zayin Rare Elements Vital Facial Essence',
    type: 'Essence',
    skinType: 'Da nhạy cảm, Nếp nhăn, Da chùng nhão/chảy xệ',
    timeUsage: 'Tất cả thời điểm',
    price: '7.400.000 VNĐ',
    description:
      'Tinh chất phục hồi đa tầng – chuẩn mực của làn da cân bằng và bền vững\n\nZayin Rare Elements Vital Facial Essence là tinh chất phục hồi đa tầng giúp tái thiết lập trạng thái cân bằng khỏe mạnh cho làn da. Kết hợp các hoạt chất sinh học quý giá cùng chiết xuất thảo dược phương Đông, sản phẩm hỗ trợ làm dịu, củng cố hàng rào bảo vệ và tăng cường khả năng tự phục hồi trước tác động của môi trường và lão hóa. Kết cấu mỏng nhẹ, thẩm thấu nhanh, mang lại làn da ẩm mịn, ổn định và rạng rỡ bền vững.',
    info:
      '- Dung tích: 50ml\n- HSD: 12 tháng từ khi mở nắp\n\nBảo quản trong ngăn mát tủ lạnh hoặc nơi thoáng mát (nhiệt độ: 20 độ)',
    usage:
      '- Sau khi rửa mặt và dùng toner, lấy 2–3 giọt tinh chất\n- Thoa đều lên mặt và cổ\n- Vỗ nhẹ để tinh chất thẩm thấu tốt hơn\n- Tiếp tục với các bước dưỡng da tiếp theo\n\nKhuyến khích sử dụng kết hợp cùng bộ sản phẩm LE LAFFÉ Platinum StemCell Reverse-Aging Solution để tối ưu hiệu quả phục hồi và chống lão hóa toàn diện.',
    ingredients:
      'Adenosine, Orostachys Japonica Extract, Eclipta Prostrata Extract, Portulaca Oleracea Extract, Artemisia Princeps Extract, Eriobotrya Japonica Leaf Extract, Sasa Veitchii Leaf Extract, Dendropanax Morbiferus Extract, Rosa Damascena Flower Water, Simmondsia Chinensis (Jojoba) Seed Oil, Argania Spinosa Kernel Oil, Oenothera Biennis (Evening Primrose) Oil, Moringa Oleifera Seed Oil, Calophyllum Tacamahaca Seed Oil, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Persea Gratissima (Avocado) Oil, Olive Oil PEG-7 Esters, C12-22 Alkyl Acrylate/Hydroxyethylacrylate Copolymer, Sodium Hyaluronate, Panthenol, Opuntia Coccinellifera Fruit Extract, Glycerin, 1,2-Hexanediol, Phenoxyethanol, Rose Flower Oil, Jasminum Officinale Flower Oil, Citrus Aurantium Amara (Bitter Orange) Flower Oil, Aniba Rosodora (Rosewood) Wood Oil, Santalum Austrocaledonicum Wood Oil, Lavandula Angustifolia (Lavender) Oil, sh-Oligopeptide-1, Aloe Barbadensis Leaf Extract',
    images: [
      'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Zayin/Zayin.png',
      'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Zayin/zayin_002.jpg',
      'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Zayin/zayin_003.jpg',
      'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Zayin/zayin_004.png'
    ],
  },
  {
    slug: 'chet-energy-restoration-facial-treatment',
    name: 'Chet Energy Restoration Facial Treatment',
    type: 'Cream',
    skinType: 'Nếp nhăn, Da chùng nhão/chảy xệ, Đốm nâu/nám/xỉn màu',
    timeUsage: 'Tất cả thời điểm',
    price: '7.000.000 VNĐ',
    description:
      'Kem dưỡng phục hồi năng lượng – tái sinh làn da ở chuẩn mực cao nhất\n\nChet Energy Restoration Facial Treatment là kem dưỡng phục hồi cao cấp giúp tái thiết năng lượng và nuôi dưỡng làn da chuyên sâu trong môi trường sống nhiều áp lực. Công thức kết hợp các dược liệu quý cùng hệ dưỡng chất đa tầng giúp cải thiện độ ẩm, độ đàn hồi và khả năng tự bảo vệ của da trước các tác nhân gây lão hóa. Kết cấu kem mịn giàu dưỡng chất mang lại cảm giác thư giãn, giúp làn da trở nên khỏe mạnh, rạng rỡ và tràn đầy sức sống.',
    info:
      '- Dung tích: 50ml\n- HSD: 12 tháng từ khi mở nắp\n\nBảo quản trong ngăn mát tủ lạnh hoặc nơi thoáng mát (nhiệt độ: 20 độ)',
    usage:
      '- Sau bước serum hoặc tinh chất, lấy một lượng kem vừa đủ\n- Thoa đều lên mặt và cổ\n- Massage nhẹ nhàng để kem thẩm thấu tốt hơn\n- Dùng ở bước cuối cùng trong chu trình dưỡng da\n\nKhuyến khích sử dụng kết hợp cùng bộ sản phẩm LE LAFFÉ Platinum StemCell Reverse-Aging Solution để tối ưu hiệu quả phục hồi và chống lão hóa toàn diện.',
    ingredients:
      'Adenosine, Orostachys Japonica Extract, Eclipta Prostrata Extract, Portulaca Oleracea Extract, Artemisia Princeps Extract, Eriobotrya Japonica Leaf Extract, Sasa Veitchii Leaf Extract, Dendropanax Morbiferus Extract, Simmondsia Chinensis (Jojoba) Seed Oil, Argania Spinosa Kernel Oil, Calophyllum Tacamahaca Seed Oil , Oenothera Biennis (Evening Primrose) Oil, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Persea Gratissima (Avocado) Oil, Moringa Oleifera Seed Oil, Butyrospermum Parkii (Shea) Butter, Sorbitan Olivate, Cetyl Alcohol, Olive Oil PEG-7 Esters, Sodium Hyaluronate, Panthenol, Opuntia Coccinellifera Fruit Extract, Glycerin, 1,2-Hexanediol, Phenoxyethanol, Rose Flower Oil, Jasminum Officinale Flower Oil, Citrus Aurantium Amara (Bitter Orange) Flower Oil, Aniba Rosodora (Rosewood) Wood Oil, Santalum Austrocaledonicum Wood Oil, Lavandula Angustifolia (Lavender) Oil, sh-Oligopeptide-1',
    images: [
      'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Chet/Chet.png',
      'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Chet/chet_002.jpg',
      'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Chet/chet_003.jpg',
      'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Chet/chet_004.png'
    ],
  },
  {
    slug: 'smtrs-100-de-secret',
    name: 'SMTRs-100 De Secret',
    type: 'Skin Booster Pre-Treatment',
    skinType: 'Nếp nhăn, Da chùng nhão/chảy xệ, Đốm nâu/nám/xỉn màu',
    timeUsage: 'Tối',
    price: '6.300.000 VNĐ',
    description:
      'Nghi thức khai mở làn da – nơi công nghệ trở thành nghệ thuật dẫn truyền\n\nSMTRs-100 De Secret is tinh chất ứng dụng công nghệ dẫn truyền vi điểm độc quyền giúp tối ưu khả năng hấp thụ dưỡng chất và chuẩn bị nền da cho các liệu trình chăm sóc chuyên sâu. Hệ micro-spear hòa tan tạo nên các vi kênh dẫn truyền tạm thời, hỗ trợ thanh lọc bề mặt da và tăng khả năng tiếp nhận hoạt chất sinh học mà vẫn êm ái, không xâm lấn. Kết cấu tinh tế mang lại cảm giác dịu nhẹ, giúp làn da trở nên mịn màng, ổn định và sẵn sàng cho quá trình phục hồi ở chuẩn mực cao hơn.',
    info:
      '- Dung tích: 10ml\n- HSD: 12 tháng từ khi mở nắp\n\nBảo quản trong ngăn mát tủ lạnh hoặc nơi thoáng mát (nhiệt độ: 20 độ)',
    usage:
      '- Dùng vào buổi tối sau khi rửa mặt\n- Thoa đều lên da\n- Massage nhẹ để sản phẩm thẩm thấu\n- Dùng ngay 500,000 Stem Media Skin Booster để đạt hiệu quả tốt nhất\n- Dùng cách buổi tối, không sử dụng mỗi tối\n\nNên dùng theo cặp, không dùng đơn lẻ',
    ingredients:
      'Orostachys Japonica Extract, Eclipta Prostrata Extract, Portulaca Oleracea Extract, Artemisia Princeps Extract, Eriobotrya Japonica Leaf Extract, Sasa Veitchii Leaf Extract, Dendropanax Morbiferus Extract, Simmondsia Chinensis (Jojoba) Seed Oil, Argania Spinosa Kernel Oil, Calophyllum Tacamahaca Seed Oil , Oenothera Biennis (Evening Primrose) Oil , Prunus Amygdalus Dulcis (Sweet Almond) Oil, Persea Gratissima (Avocado) Oil, Moringa Oleifera Seed Oil , Butyrospermum Parkii (Shea) Butter, Beeswax, Allantoin, Tocopherol, 1,2-Hexanediol, Phenoxyethanol, Lavandula Angustifolia (Lavender) Oil, Citrus Aurantium Amara (Bitter Orange) Flower Oil',
    images: [
      'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/SMTRs100/SMTRs-100.png',
      'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/SMTRs100/smtrs_002.jpg',
      'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/SMTRs100/smtrs_003.jpg',
      'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/SMTRs100/smtrs_004.png'
    ],
  },
  {
    slug: '500-000-stem-media-skin-booster',
    name: '500,000 Stem Media Skin Booster',
    type: 'Skin Booster',
    skinType: 'Nếp nhăn, Da chùng nhão/chảy xệ, Đốm nâu/nám/xỉn màu',
    timeUsage: 'Tối',
    price: '11.200.000 VNĐ',
    description:
      'Đỉnh cao của khoa học tế bào – tái định nghĩa chuẩn mực chống lão hoá\n\n500,000 Stem Media Skin Booster là tinh chất phục hồi da chuyên sâu giúp cải thiện các dấu hiệu lão hóa từ bên trong. Sản phẩm ứng dụng công nghệ Stem Cell Secretome nồng độ cao 500,000ppm, hỗ trợ nuôi dưỡng và tái tạo làn da ở cấp độ tế bào. Công thức chứa các yếu tố tăng trưởng (Growth Factors), Exosomes và hệ dưỡng chất sinh học giúp tăng độ đàn hồi, cải thiện độ sáng và hỗ trợ làn da tự phục hồi tốt hơn trước các tác động từ môi trường. Kết cấu tinh chất nhẹ, thấm nhanh, giúp da trở nên săn chắc, mịn màng và rạng rỡ hơn theo thời gian.',
    info:
      '- Dung tích: 30ml\n- HSD: 12 tháng từ khi mở nắp\n\nBảo quản trong ngăn mát tủ lạnh hoặc nơi thoáng mát (nhiệt độ: 20 độ)',
    usage:
      '- Dùng vào buổi tối, sau khi làm sạch da\n- Lấy lượng vừa đủ, thoa đều lên toàn mặt\n- Vỗ nhẹ để tinh chất thẩm thấu sâu vào da\n- Dùng cách buổi tối, không sử dụng mỗi tối\n- Nên dùng sau SMTRs-100 De Secret để đạt hiệu quả tối ưu\n\nNên dùng theo cặp, không dùng đơn lẻ',
    ingredients:
      'Adenosine, Orostachys Japonica Extract, Eclipta Prostrata Extract, Portulaca Oleracea Extract, Artemisia Princeps Extract, Eriobotrya Japonica Leaf Extract, Sasa Veitchii Leaf Extract, Dendropanax Morbiferus Extract, Defined Cell Culture Media 6, Simmondsia Chinensis (Jojoba) Seed Oil, Argania Spinosa Kernel Oil, Calophyllum Tacamahaca Seed Oil , Oenothera Biennis (Evening Primrose) Oil , Prunus Amygdalus Dulcis (Sweet Almond) Oil, Persea Gratissima (Avocado) Oil, Moringa Oleifera Seed Oil , Sorbitan Olivate, Hack-olivate, Cetyl Alcohol, C12-22 Alkyl Acrylate/Hydroxyethylacrylate Copolymer, Sodium Hyaluronate, Panthenol, Opuntia Coccinellifera Fruit Extract, Glycerin, 1,2-Hexanediol, Phenoxyethanol, Rose Flower Oil, Jasminum Officinale Flower Oil, Citrus Aurantium Amara (Bitter Orange) Flower Oil, Aniba Rosodora (Rosewood) Wood Oil, Santalum Austrocaledonicum Wood Oil, Lavandula Angustifolia (Lavender) Oil, Rosa Damascena Flower Water',
    images: [
      'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/500,000%20Stem/500,000%20Stem.png',
      'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/500,000%20Stem/booster_002.jpg',
      'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/500,000%20Stem/booster_003.jpg',
      'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/500,000%20Stem/booster_004.png'
    ],
  },
  {
    slug: 'alpeh-mito-viv-first-treatment-essence',
    name: 'Alpeh / Mito-viv First Treatment Essence',
    type: 'Essence',
    skinType: 'Da nhạy cảm, Nếp nhăn, Đốm nâu/nám/xỉn màu',
    timeUsage: 'Tất cả thời điểm',
    price: '6.700.000 VNĐ',
    description:
      'UV Damage Defender – Đặc quyền của làn da vượt thời gian\n\nMito-vive First Treatment Essence là tinh chất dưỡng da cao cấp hỗ trợ bảo vệ và duy trì trạng thái trẻ khỏe của làn da trước tác động từ môi trường hiện đại. Ứng dụng công nghệ tác động vào hoạt động ty thể tế bào kết hợp cùng các chiết xuất thực vật tinh tuyển, sản phẩm giúp tăng cường khả năng chống oxy hóa, củng cố hàng rào bảo vệ và duy trì độ rạng rỡ tự nhiên của da theo thời gian. Kết cấu lỏng nhẹ, thẩm thấu nhanh, mang lại làn da ẩm mịn, ổn định và khỏe mạnh bền vững.',
    info:
      '- Dung tích: 100ml\n- HSD: 12 tháng từ khi mở nắp\n\nBảo quản trong ngăn mát tủ lạnh hoặc nơi thoáng mát (nhiệt độ: 20 độ)',
    usage:
      '- Sau khi rửa mặt, lấy một lượng vừa đủ, thoa đều lên toàn mặt và cổ\n- Vỗ nhẹ để tinh chất thẩm thấu tốt hơn\n- Có thể dùng hằng ngày như bước đầu trong chu trình dưỡng da\n- Tiếp tục với serum hoặc kem dưỡng để khóa ẩm và tăng hiệu quả chăm sóc da\n\nKhuyến khích sử dụng kết hợp cùng bộ sản phẩm LE LAFFÉ Platinum StemCell Reverse-Aging Solution để tối ưu hiệu quả phục hồi và chống lão hóa toàn diện.',
    ingredients:
      '(Artemisia Princeps/Dendropanax Morbifera/Eclipta Prostrata/Eriobotrya Japonica/Orostachys Japonica/Portulaca Oleracea/Sasa Borealis/Zizania Latifolia) Leaf/Stem Extract, Rosa Damascena Flower Water, Aqua, Aloe Barbadensis Leaf Extract, 1,2-Hexanediol, Niacinamide, Sodium Hyaluronate, Simmondsia Chinensis Seed Oil, Argania Spinosa Kernel Oil, Glycerin, Oenothera Biennis Oil, Calophyllum Inophyllum Seed Oil, Moringa Oleifera Seed Oil, Dimethyl Sulfone, Olive Oil PEG-7 Esters, Prunus Amygdalus Dulcis Oil, Butylene Glycol, Persea Gratissima Oil, Centella Asiatica Extract, Propanediol, Hydrolyzed Collagen, Benzyl Alcohol, Rose Flower Oil, Jasminum Officinale Flower Oil, Citrus Aurantium Flower Oil, Aniba Rosodora Wood Oil, Santalum Austrocaledonicum Wood Oil, Lavandula Oil/ Extract, Quercetin, Hydroxydecyl Ubiquinone, Phenoxyethanol, Piper Nigrum Fruit Extract, Adenosine, Dehydroacetic Acid, Potassium Sorbate, Sodium Benzoate, Citric Acid, Madecassoside',
    images: [
      'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Alpeh/Aleph.png',
      'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Alpeh/aleph_002.jpg',
      'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Alpeh/aleph_003.jpg',
      'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Alpeh/aleph_004.png'
    ],
  },
  {
    slug: 'comprehensive-skincare-solution-quintet',
    name: 'Comprehensive Skincare Solution Quintet',
    type: 'Bộ Mini',
    skinType: 'Da nhạy cảm, Nếp nhăn, Da chùng nhão/chảy xệ, Đốm nâu/nám/xỉn màu',
    timeUsage: 'Tất cả thời điểm',
    price: '5.000.000 VNĐ',
    description:
      'Nghi thức chăm sóc da chuẩn Seoul trong 5 bước chuyên sâu\n\nComprehensive Skincare Solution Quintet là bộ sản phẩm chăm sóc da chuyên sâu gồm 5 bước chuẩn Seoul từ LE LAFFÉ, giúp phục hồi, tái tạo và bảo vệ làn da trước các tác nhân lão hóa và môi trường hiện đại. Bộ sản phẩm kết hợp các tinh chất công nghệ cao cùng Stem Cell Secretome hỗ trợ cấp ẩm, cải thiện độ đàn hồi và duy trì trạng thái da khỏe mạnh, rạng rỡ theo thời gian. Thiết kế mini sang trọng và tiện lợi, phù hợp để trải nghiệm trọn bộ liệu trình hoặc mang theo khi di chuyển.\n\nBộ sản phẩm bao gồm\n1. Aleph Mito-vive First Treatment Essence: Tinh chất mở đầu giúp kích hoạt năng lượng tế bào, hỗ trợ bảo vệ da trước tác hại từ tia UV và stress oxy hoá.\n2. Zayin Rare Elements Vital Facial Essence: Tinh chất giàu khoáng chất quý hiếm giúp nuôi dưỡng làn da khỏe mạnh, hỗ trợ phục hồi và tái tạo sức sống cho da.\n3. Chet Energy Restoration Essence: Tinh chất phục hồi giúp cải thiện làn da mệt mỏi, thiếu sức sống với các hoạt chất tăng cường năng lượng cho da.\n4. SMTRs—100 De Secret: Công nghệ dẫn truyền tiên tiến giúp tăng cường khả năng hấp thụ dưỡng chất từ Stem Media Skin Booster vào sâu trong da.\n5. 500,000 Stem Media Skin Booster: Tinh chất tái tạo chuyên sâu ứng dụng công nghệ Stem Cell Secretome hỗ trợ cải thiện độ đàn hồi và vẻ rạng rỡ của làn da.',
    info: 'Bảo quản trong ngăn mát tủ lạnh hoặc nơi thoáng mát (nhiệt độ: 20 độ)',
    usage: 'HƯỚNG DẪN SỬ DỤNG',
    ingredients: 'Aleph Mito-vive First Treatment Essence, Zayin Rare Elements Vital Facial Essence, Chet Energy Restoration Facial Treatment, SMTRs-100 De Secret, 500,000 Stem Media Skin Booster',
    images: [
      'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Comprehensive/quintet_001.jpg',
      'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Comprehensive/quintet_002.jpg',
      'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Comprehensive/quintet_003.jpg'
    ],
  },
  {
    slug: 'platinum-stemcell-reverse-aging-solution',
    name: 'Platinum StemCell Reverse-Aging Solution',
    type: 'Set full size',
    skinType: 'Da nhạy cảm, Nếp nhăn, Da chùng nhão/chảy xệ, Đốm nâu/nám/xỉn màu',
    timeUsage: 'Tất cả thời điểm',
    price: '31.000.000 VNĐ',
    description:
      'Platinum StemCell Reverse-Aging Solution là bộ chăm sóc da chuyên sâu gồm 5 bước chuẩn Seoul từ LE LAFFÉ, kết hợp công nghệ Stem Cell Secretome cùng hệ dưỡng chất phục hồi đa tầng giúp tái tạo, cấp ẩm và cải thiện các dấu hiệu lão hóa. Bộ sản phẩm hoạt động đồng bộ hỗ trợ tăng cường độ đàn hồi, độ rạng rỡ và khả năng tự bảo vệ của làn da trước tác động từ môi trường hiện đại. Đây là giải pháp chăm sóc toàn diện dành cho làn da cần phục hồi chuyên sâu và duy trì vẻ đẹp bền vững theo thời gian.\n\nBộ sản phẩm bao gồm\n1. Aleph Mito-vive First Treatment Essence: Tinh chất mở đầu giúp kích hoạt năng lượng tế bào, hỗ trợ bảo vệ da trước tác hại từ tia UV và stress oxy hoá.\n2. Zayin Rare Elements Vital Facial Essence: Tinh chất giàu khoáng chất quý hiếm giúp nuôi dưỡng làn da khỏe mạnh, hỗ trợ phục hồi và tái tạo sức sống cho da.\n3. Chet Energy Restoration Essence: Tinh chất phục hồi giúp cải thiện làn da mệt mỏi, thiếu sức sống với các hoạt chất tăng cường năng lượng cho da.\n4. SMTRs—100 De Secret: Công nghệ dẫn truyền tiên tiến giúp tăng cường khả năng hấp thụ dưỡng chất từ Stem Media Skin Booster vào sâu trong da.\n5. 500,000 Stem Media Skin Booster: Tinh chất tái tạo chuyên sâu ứng dụng công nghệ Stem Cell Secretome hỗ trợ cải thiện độ đàn hồi và vẻ rạng rỡ của làn da.',
    info: 'Bảo quản trong ngăn mát tủ lạnh hoặc nơi thoáng mát (nhiệt độ: 20 độ)',
    usage: 'Sử dụng trọn bộ sản phẩm sáng và tối để đạt hiệu quả tối ưu tế bào.',
    ingredients: 'Aleph Mito-vive First Treatment Essence, Zayin Rare Elements Vital Facial Essence, Chet Energy Restoration Facial Treatment, SMTRs-100 De Secret, 500,000 Stem Media Skin Booster',
    images: [
      'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Platinum%20StemCell%20Full/Full.png',
      'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Platinum%20StemCell%20Full/set_002.png',
      'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe/Platinum%20StemCell%20Full/set_003.png'
    ],
  },
]

const MOCK_JOURNAL: JournalArticle[] = [
  {
    id: 'j01',
    slug: 'circadian-rhythm-of-cellular-repair',
    title: 'The Circadian Rhythm of Cellular Repair',
    excerpt: 'On the quiet science of working with the skin\'s internal clock — and why midnight is no longer an accident.',
    category: 'Science',
    readingTime: '7 min',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'A still winter landscape at dusk',
    date: '2026.01',
    body: [
      'For more than a century, the cosmetic industry treated the skin as a surface to decorate. The clinical revolution of the last decade has finally positioned it as what it has always been: a living, rhythmic organ with its own time signature.',
      'Every cell in the basal layer carries a set of circadian proteins. By night they orchestrate DNA repair; by day they tune themselves to shield against oxidative insult. Formulate against this rhythm and you will work twice as hard for half the result. Formulate with it, and the complexion begins to behave the way it did a decade earlier.',
      'Our night rituals are engineered around this temporal biology. Retinal is encapsulated so it arrives at the precise moment the skin is prepared to accept it. Peptides are sequenced to mimic the body\'s own repair cascade. Nothing shouts; everything arrives exactly on time.',
      'The honest luxury of a well-made night serum is not a scent or a texture. It is a timing.'
    ],
  },
  {
    id: 'j02',
    slug: 'marine-botanicals-the-deep-source',
    title: 'Marine Botanicals — The Deep Source',
    excerpt: 'A dive into the slow-grown seagrasses that shape our most restorative formulas.',
    category: 'Provenance',
    readingTime: '5 min',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Pale ocean, low horizon',
    date: '2025.11',
    body: [
      'Below twenty metres of cold Atlantic, the light begins to dim and the ecosystems slow. It is here that our partner divers, working in windows of forty minutes, hand-harvest the seagrasses whose cellular architecture will eventually enter the Atelier Essence.',
      'The reason is not romance. It is density. A fortnight of stillness on the sea floor produces the highest concentrations of phycoerythrin and marine peptides we have measured — the kind that teach the skin how to hold water again.',
      'Luxury is often confused with excess. In our atelier, it is a function of restraint: what we take, we take slowly; what we leave is more than what we take.'
    ],
  },
  {
    id: 'j03',
    slug: 'collagen-integrity',
    title: 'The Architecture of Collagen Integrity',
    excerpt: 'How our clinical research team is reframing firmness as a question of matrix — not of volume.',
    category: 'Research',
    readingTime: '9 min',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Close texture of woven natural fibre',
    date: '2025.09',
    body: [
      'The industry sells us volume; the skin asks for integrity. These are not the same ask.',
      'Our in-vivo study of 124 women between 42 and 68 measured not the amount of collagen but its organisation — the orthogonal weave that confers the quality we recognise as "firm" skin. Over twelve weeks, signatory actives restored that weave in 78% of the cohort without introducing a single additional volumising molecule.',
      'Firmness, in other words, is a question of architecture. You cannot purchase it in a syringe. You can, however, cultivate it across a season of honest rituals.'
    ],
  },
]

// Helper function to simulate network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// --- API METHODS ---

export const api = {
  products: {
    getAll: async (): Promise<Product[]> => {
      if (MOCK_MODE) {
        await delay(MOCK_LATENCY)
        return MOCK_PRODUCTS
      }
      // Real API Call
      const res = await fetch(`${API_BASE_URL}/products`)
      if (!res.ok) throw new Error('Failed to fetch products')
      return res.json()
    },

    getBySlug: async (slug: string): Promise<Product | undefined> => {
      if (MOCK_MODE) {
        await delay(MOCK_LATENCY)
        return MOCK_PRODUCTS.find((p) => p.slug === slug)
      }
      // Real API Call
      const res = await fetch(`${API_BASE_URL}/products/${slug}`)
      if (res.status === 404) return undefined
      if (!res.ok) throw new Error('Failed to fetch product')
      return res.json()
    },
  },

  journal: {
    getAll: async (): Promise<JournalArticle[]> => {
      if (MOCK_MODE) {
        await delay(MOCK_LATENCY)
        return MOCK_JOURNAL
      }
      // Real API Call
      const res = await fetch(`${API_BASE_URL}/journal`)
      if (!res.ok) throw new Error('Failed to fetch journal')
      return res.json()
    },

    getLatest: async (limit: number): Promise<JournalArticle[]> => {
      if (MOCK_MODE) {
        await delay(MOCK_LATENCY)
        return MOCK_JOURNAL.slice(0, limit)
      }
      // Real API Call
      const res = await fetch(`${API_BASE_URL}/journal?limit=${limit}`)
      if (!res.ok) throw new Error('Failed to fetch latest journal')
      return res.json()
    },

    getBySlug: async (slug: string): Promise<JournalArticle | undefined> => {
      if (MOCK_MODE) {
        await delay(MOCK_LATENCY)
        return MOCK_JOURNAL.find((j) => j.slug === slug)
      }
      // Real API Call
      const res = await fetch(`${API_BASE_URL}/journal/${slug}`)
      if (res.status === 404) return undefined
      if (!res.ok) throw new Error('Failed to fetch journal article')
      return res.json()
    },
  },

  contact: {
    submit: async (input: InquiryInput): Promise<{ success: boolean; message: string }> => {
      if (MOCK_MODE) {
        await delay(MOCK_LATENCY)
        // Simulate writing to Supabase locally as a fallback
        try {
          const { error } = await supabase.from('inquiries').insert([
            {
              name: input.name,
              email: input.email,
              message: input.message,
              status: 'pending',
            },
          ])
          if (error) throw error
        } catch (e) {
          console.warn('Supabase local fallback insert failed (likely unconfigured):', e)
        }
        return { success: true, message: 'Gửi tin nhắn thành công!' }
      }
      // Real API Call
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      if (!res.ok) throw new Error('Failed to submit contact')
      return res.json()
    },
  },

  orders: {
    create: async (input: OrderInput): Promise<{ success: boolean; code: string }> => {
      const generatedCode = `LELAFFE-${Math.floor(100000 + Math.random() * 900000)}`
      
      if (MOCK_MODE) {
        await delay(MOCK_LATENCY)
        // Simulate writing to Supabase locally as a fallback
        try {
          const { error } = await supabase.from('orders').insert([
            {
              client_name: input.client_name,
              client_phone: input.client_phone,
              note: input.note || '',
              items: input.items,
              status: 'pending',
            },
          ])
          if (error) throw error
        } catch (e) {
          console.warn('Supabase local fallback insert failed (likely unconfigured):', e)
        }
        return { success: true, code: generatedCode }
      }
      // Real API Call
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      if (!res.ok) throw new Error('Failed to create order')
      return res.json()
    },
  },

  banners: {
    getAll: async (): Promise<HeroSlide[]> => {
      if (MOCK_MODE) {
        await delay(MOCK_LATENCY)
        return MOCK_HERO_SLIDES
      }
      // Real API Call
      const res = await fetch(`${API_BASE_URL}/banners`)
      if (!res.ok) throw new Error('Failed to fetch banners')
      return res.json()
    }
  },
}
