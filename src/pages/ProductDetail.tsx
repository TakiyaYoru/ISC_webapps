import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

type Product = {
  slug: string
  name: string
  type: string
  skinType: string
  timeUsage: string
  price: string
  description: string
  info: string
  usage: string
  ingredients: string
  images: string
}

const productList: Product[] = [
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
    images:
      '1. Mặt trước: C6650.jpg\n2. Mặt sau: C6652.jpg\n3. Chất sản phẩm: C4112.jpg\n4. Chụp hình mẫu:  DSC_4911 copy.tif',
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
    images:
      '1. Mặt trước: C0773.jpg\n2. Mặt sau: C0774.jpg\n3. Chất sản phẩm: C3618.jpg\n4. Chụp hình mẫu:  DSC_4553 copy.tif',
  },
  {
    slug: 'smtrs-100-de-secret',
    name: 'SMTRs-100 De Secret',
    type: 'Skin Booster Pre-Treatment',
    skinType: 'Nếp nhăn, Da chùng nhão/chảy xệ, Đốm nâu/nám/xỉn màu',
    timeUsage: 'Tối',
    price: '6.300.000 VNĐ',
    description:
      'Nghi thức khai mở làn da – nơi công nghệ trở thành nghệ thuật dẫn truyền\n\nSMTRs-100 De Secret là tinh chất ứng dụng công nghệ dẫn truyền vi điểm độc quyền giúp tối ưu khả năng hấp thụ dưỡng chất và chuẩn bị nền da cho các liệu trình chăm sóc chuyên sâu. Hệ micro-spear hòa tan tạo nên các vi kênh dẫn truyền tạm thời, hỗ trợ thanh lọc bề mặt da và tăng khả năng tiếp nhận hoạt chất sinh học mà vẫn êm ái, không xâm lấn. Kết cấu tinh tế mang lại cảm giác dịu nhẹ, giúp làn da trở nên mịn màng, ổn định và sẵn sàng cho quá trình phục hồi ở chuẩn mực cao hơn.',
    info:
      '- Dung tích: 10ml\n- HSD: 12 tháng từ khi mở nắp\n\nBảo quản trong ngăn mát tủ lạnh hoặc nơi thoáng mát (nhiệt độ: 20 độ)',
    usage:
      '- Dùng vào buổi tối sau khi rửa mặt\n- Thoa đều lên da\n- Massage nhẹ để sản phẩm thẩm thấu\n- Dùng ngay 500,000 Stem Media Skin Booster để đạt hiệu quả tốt nhất\n- Dùng cách buổi tối, không sử dụng mỗi tối\n\nNên dùng theo cặp, không dùng đơn lẻ',
    ingredients:
      'Orostachys Japonica Extract, Eclipta Prostrata Extract, Portulaca Oleracea Extract, Artemisia Princeps Extract, Eriobotrya Japonica Leaf Extract, Sasa Veitchii Leaf Extract, Dendropanax Morbiferus Extract, Simmondsia Chinensis (Jojoba) Seed Oil, Argania Spinosa Kernel Oil, Calophyllum Tacamahaca Seed Oil , Oenothera Biennis (Evening Primrose) Oil , Prunus Amygdalus Dulcis (Sweet Almond) Oil, Persea Gratissima (Avocado) Oil, Moringa Oleifera Seed Oil , Butyrospermum Parkii (Shea) Butter, Beeswax, Allantoin, Tocopherol, 1,2-Hexanediol, Phenoxyethanol, Lavandula Angustifolia (Lavender) Oil, Citrus Aurantium Amara (Bitter Orange) Flower Oil',
    images:
      '1. Mặt trước: C7682.jpg\n2. Mặt sau: C7684.jpg\n3. Chất sản phẩm: C3599.jpg\n4. Chụp hình mẫu:  DSC_4447 copy.tif',
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
      'Adenosine, Orostachys Japonica Extract, Eclipta Prostrata Extract, Portulaca Oleracea Extract, Artemisia Princeps Extract, Eriobotrya Japonica Leaf Extract, Sasa Veitchii Leaf Extract, Dendropanax Morbiferus Extract, Defined Cell Culture Media 6, Simmondsia Chinensis (Jojoba) Seed Oil, Argania Spinosa Kernel Oil, Calophyllum Tacamahaca Seed Oil , Oenothera Biennis (Evening Primrose) Oil , Prunus Amygdalus Dulcis (Sweet Almond) Oil, Persea Gratissima (Avocado) Oil, Moringa Oleifera Seed Oil , Sorbitan Olivate, Cetyl Alcohol, C12-22 Alkyl Acrylate/Hydroxyethylacrylate Copolymer, Sodium Hyaluronate, Panthenol, Opuntia Coccinellifera Fruit Extract, Glycerin, 1,2-Hexanediol, Phenoxyethanol, Rose Flower Oil, Jasminum Officinale Flower Oil, Citrus Aurantium Amara (Bitter Orange) Flower Oil, Aniba Rosodora (Rosewood) Wood Oil, Santalum Austrocaledonicum Wood Oil, Lavandula Angustifolia (Lavender) Oil, Rosa Damascena Flower Water',
    images:
      '1. Mặt trước: C7688.jpg\n2. Mặt sau: C7689.jpg\n3. Chất sản phẩm: C8213.jpg\n4. Chụp hình mẫu:  DSC_4963 copy.tif',
  },
  {
    slug: 'alpeh-mito-viv-first-treatment-essence',
    name: 'Alpeh, Mito-viv First Treatment Essence',
    type: 'Cream',
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
    images:
      '1. Mặt trước: C6653.jpg\n2. Mặt sau: C6654.jpg\n3. Chất sản phẩm: C3608.jpg\n4. Chụp hình mẫu:  DSC_4399 copy.tif',
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
    ingredients:
      'Alpeh, Mito-viv First Treatment Essence\n(Artemisia Princeps/Dendropanax Morbifera/Eclipta Prostrata/Eriobotrya Japonica/Orostachys Japonica/Portulaca Oleracea/Sasa Borealis/Zizania Latifolia) Leaf/Stem Extract, Rosa Damascena Flower Water, Aqua, Aloe Barbadensis Leaf Extract, 1,2-Hexanediol, Niacinamide, Sodium Hyaluronate, Simmondsia Chinensis Seed Oil, Argania Spinosa Kernel Oil, Glycerin, Oenothera Biennis Oil, Calophyllum Inophyllum Seed Oil, Moringa Oleifera Seed Oil, Dimethyl Sulfone, Olive Oil PEG-7 Esters, Prunus Amygdalus Dulcis Oil, Butylene Glycol, Persea Gratissima Oil, Centella Asiatica Extract, Propanediol, Hydrolyzed Collagen, Benzyl Alcohol, Rose Flower Oil, Jasminum Officinale Flower Oil, Citrus Aurantium Flower Oil, Aniba Rosodora Wood Oil, Santalum Austrocaledonicum Wood Oil, Lavandula Oil/ Extract, Quercetin, Hydroxydecyl Ubiquinone, Phenoxyethanol, Piper Nigrum Fruit Extract, Adenosine, Dehydroacetic Acid, Potassium Sorbate, Sodium Benzoate, Citric Acid, Madecassoside\n\nZayin Rare Elements Vital Facial Essence\nAdenosine, Orostachys Japonica Extract, Eclipta Prostrata Extract, Portulaca Oleracea Extract, Artemisia Princeps Extract, Eriobotrya Japonica Leaf Extract, Sasa Veitchii Leaf Extract, Dendropanax Morbiferus Extract, Rosa Damascena Flower Water, Simmondsia Chinensis (Jojoba) Seed Oil, Argania Spinosa Kernel Oil, Oenothera Biennis (Evening Primrose) Oil, Moringa Oleifera Seed Oil, Calophyllum Tacamahaca Seed Oil, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Persea Gratissima (Avocado) Oil, Olive Oil PEG-7 Esters, C12-22 Alkyl Acrylate/Hydroxyethylacrylate Copolymer, Sodium Hyaluronate, Panthenol, Opuntia Coccinellifera Fruit Extract, Glycerin, 1,2-Hexanediol, Phenoxyethanol, Rose Flower Oil, Jasminum Officinale Flower Oil, Citrus Aurantium Amara (Bitter Orange) Flower Oil, Aniba Rosodora (Rosewood) Wood Oil, Santalum Austrocaledonicum Wood Oil, Lavandula Angustifolia (Lavender) Oil, sh-Oligopeptide-1, Aloe Barbadensis Leaf Extract\n\nChet Energy Restoration Facial Treatment\nAdenosine, Orostachys Japonica Extract, Eclipta Prostrata Extract, Portulaca Oleracea Extract, Artemisia Princeps Extract, Eriobotrya Japonica Leaf Extract, Sasa Veitchii Leaf Extract, Dendropanax Morbiferus Extract, Simmondsia Chinensis (Jojoba) Seed Oil, Argania Spinosa Kernel Oil, Calophyllum Tacamahaca Seed Oil , Oenothera Biennis (Evening Primrose) Oil, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Persea Gratissima (Avocado) Oil, Moringa Oleifera Seed Oil, Butyrospermum Parkii (Shea) Butter, Sorbitan Olivate, Cetyl Alcohol, Olive Oil PEG-7 Esters, Sodium Hyaluronate, Panthenol, Opuntia Coccinellifera Fruit Extract, Glycerin, 1,2-Hexanediol, Phenoxyethanol, Rose Flower Oil, Jasminum Officinale Flower Oil, Citrus Aurantium Amara (Bitter Orange) Flower Oil, Aniba Rosodora (Rosewood) Wood Oil, Santalum Austrocaledonicum Wood Oil, Lavandula Angustifolia (Lavender) Oil, sh-Oligopeptide-1\n\nSMTRs-100 De Secret\nOrostachys Japonica Extract, Eclipta Prostrata Extract, Portulaca Oleracea Extract, Artemisia Princeps Extract, Eriobotrya Japonica Leaf Extract, Sasa Veitchii Leaf Extract, Dendropanax Morbiferus Extract, Simmondsia Chinensis (Jojoba) Seed Oil, Argania Spinosa Kernel Oil, Calophyllum Tacamahaca Seed Oil , Oenothera Biennis (Evening Primrose) Oil , Prunus Amygdalus Dulcis (Sweet Almond) Oil, Persea Gratissima (Avocado) Oil, Moringa Oleifera Seed Oil , Butyrospermum Parkii (Shea) Butter, Beeswax, Allantoin, Tocopherol, 1,2-Hexanediol, Phenoxyethanol, Lavandula Angustifolia (Lavender) Oil, Citrus Aurantium Amara (Bitter Orange) Flower Oil\n\n500,000 Stem Media Skin Booster\nAdenosine, Orostachys Japonica Extract, Eclipta Prostrata Extract, Portulaca Oleracea Extract, Artemisia Princeps Extract, Eriobotrya Japonica Leaf Extract, Sasa Veitchii Leaf Extract, Dendropanax Morbiferus Extract, Human Cord Blood Cell Conditioned Media, Simmondsia Chinensis (Jojoba) Seed Oil, Argania Spinosa Kernel Oil, Calophyllum Tacamahaca Seed Oil , Oenothera Biennis (Evening Primrose) Oil , Prunus Amygdalus Dulcis (Sweet Almond) Oil, Persea Gratissima (Avocado) Oil, Moringa Oleifera Seed Oil , Sorbitan Olivate, Cetyl Alcohol, C12-22 Alkyl Acrylate/Hydroxyethylacrylate Copolymer, Sodium Hyaluronate, Panthenol, Opuntia Coccinellifera Fruit Extract, Glycerin, 1,2-Hexanediol, Phenoxyethanol, Rose Flower Oil, Jasminum Officinale Flower Oil, Citrus Aurantium Amara (Bitter Orange) Flower Oil, Aniba Rosodora (Rosewood) Wood Oil, Santalum Austrocaledonicum Wood Oil, Lavandula Angustifolia (Lavender) Oil, Rosa Damascena Flower Water',
    images: '1. C3652.jpg\n2. C3645.jpg\n3. C3661.jpg',
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
    info: '',
    usage: '',
    ingredients: '',
    images: '1. C3427.jpg\n2. DSC_4009 copy.tif\n3. DSC_4865 copy.tif',
  },
]

const parseLines = (value: string) =>
  value
    .split(/\n+/)
    .map((line) => line.replace(/^[-\s]+/, '').trim())
    .filter(Boolean)

const parseParagraphs = (value: string) =>
  value
    .split(/\n\n+/)
    .map((line) => line.trim())
    .filter(Boolean)

const parseImageFiles = (value: string) =>
  parseLines(value).map((line) => {
    const parts = line.split(':')
    return parts.length > 1 ? parts.slice(1).join(':').trim() : line
  })

const parseIngredients = (value: string) => {
  if (!value.trim()) return { type: 'empty' as const, list: [], blocks: [] }
  const blocks = value.split(/\n\n+/).map((item) => item.trim()).filter(Boolean)
  if (blocks.length > 1) {
    return { type: 'blocks' as const, list: [], blocks }
  }
  const list = value.split(',').map((item) => item.trim()).filter(Boolean)
  return { type: 'list' as const, list, blocks: [] }
}

const parsePrice = (price: string) => `${price} VNĐ`

const parseVolume = (infoLines: string[]) => {
  const volumeLine = infoLines.find((line) => line.toLowerCase().includes('dung tích'))
  if (!volumeLine) return ''
  const parts = volumeLine.split(':')
  return parts.length > 1 ? parts.slice(1).join(':').trim() : volumeLine
}

export default function ProductDetail() {
  const { slug } = useParams()
  const product = productList.find((item) => item.slug === slug)
  const [added, setAdded] = useState(false)
  const infoLines = product ? parseLines(product.info) : []
  const imageFiles = product ? parseImageFiles(product.images) : []
  const descriptionParas = product ? parseParagraphs(product.description) : []
  const skinTags = product ? product.skinType.split(',').map((item) => item.trim()).filter(Boolean) : []
  const volume = parseVolume(infoLines)
  const related = productList.filter((p) => p.slug !== product?.slug)

  if (!product) {
    return (
      <div className="container-editorial pt-32 pb-24 text-center">
        <p className="label-caps mb-4">Không tìm thấy</p>
        <h1 className="font-headline-lg text-headline-lg text-primary">Sản phẩm đang được cập nhật.</h1>
        <Link to="/collection" className="btn-underline mt-10">Trở về danh sách</Link>
      </div>
    )
  }

  return (
    <div>
      <section className="container-wide py-8">
        <nav className="font-body-md text-body-md text-on-surface-variant flex gap-2 items-center">
          <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
          <span className="text-outline-variant">/</span>
          <Link className="hover:text-primary transition-colors" to="/brand">Thương hiệu</Link>
          <span className="text-outline-variant">/</span>
          <span className="text-primary">Le Laffé</span>
          <span className="text-outline-variant">/</span>
          <span className="text-primary">{product.name}</span>
        </nav>
      </section>

      <section className="container-wide mb-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-gutter">
          <div className="md:col-span-6 flex flex-col gap-4">
            <div className="w-full aspect-square bg-surface-container-lowest border border-outline-variant flex items-center justify-center overflow-hidden">
              <img
                alt={product.name}
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcQ-yxyN5hfuj_R1_6Y-X-pwIbUVISq6RVMm-qM7HvtRu-21ArQFYNGGrgqrrFzc_w2JpfNqF2gq5g_Z93yrMv-R4v2YefUc1MxALmcvM0Pxgkoahf1q-r9lljWXNlsl1D-uzv94LMqpMiGAscWj302hsGPBz6Jcqft1gnsNOeCqA47YQY-DgmE_XGD4xStP9XHCxLx-qJqyQEvrU6HQMBnRA3jrFkEb1_jwxDCajDegxVl1CdK1X770yfqvNCVv-OH_IOOeBE10w"
              />
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar">
              {imageFiles.length > 0 ? (
                imageFiles.map((file) => (
                  <div key={file} className="w-24 h-24 flex-shrink-0 bg-surface-container-lowest border border-outline-variant flex items-center justify-center text-[0.7rem] text-on-surface-variant text-center px-2">
                    {file}
                  </div>
                ))
              ) : (
                <div className="w-24 h-24 flex-shrink-0 bg-surface-container-lowest border border-outline-variant" />
              )}
            </div>
          </div>

          <div className="md:col-span-6 flex flex-col justify-center">
            <div className="mb-8">
              <span className="label-caps uppercase tracking-widest text-on-surface-variant mb-4 block">Le Laffé • {product.type}</span>
              <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-6">
                {product.name}
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">
                {descriptionParas[0] ?? product.description}
              </p>
              <p className="font-headline-md text-headline-md text-primary">{parsePrice(product.price)}</p>
              {volume && <p className="font-body-md text-body-md text-outline mt-1">{volume}</p>}
            </div>
            <div className="w-full h-px bg-outline-variant mb-8" />
            <div className="flex flex-col gap-6 mb-8">
              <div className="flex items-center gap-4">
                <span className="font-body-md text-body-md text-primary">Số lượng:</span>
                <div className="flex items-center border border-outline-variant h-12 w-32">
                  <button className="flex-1 h-full flex items-center justify-center text-primary hover:bg-surface-container-low transition-colors">−</button>
                  <span className="font-body-md text-body-md text-primary w-8 text-center">1</span>
                  <button className="flex-1 h-full flex items-center justify-center text-primary hover:bg-surface-container-low transition-colors">+</button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    setAdded(true)
                    setTimeout(() => setAdded(false), 2600)
                  }}
                  className="flex-1 bg-primary text-on-primary h-14 text-label-caps uppercase tracking-widest hover:bg-surface-tint transition-colors duration-300"
                >
                  {added ? 'Đã thêm ✓' : 'Thêm vào giỏ hàng'}
                </button>
                <Link to="/contact" className="flex-1 border border-outline-variant text-primary h-14 flex items-center justify-center text-label-caps uppercase tracking-widest hover:border-primary transition-colors duration-300">
                  Tư vấn trước khi mua
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-surface-container-low py-section-gap px-margin-mobile md:px-margin-desktop text-center">
        <div className="max-w-[800px] mx-auto flex flex-col items-center">
          <h2 className="font-headline-md text-headline-md text-primary mb-8 italic">
            {descriptionParas[0] ?? 'Chuẩn mực của làn da cân bằng và bền vững'}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            {descriptionParas[1] ?? product.description}
          </p>
        </div>
      </section>

      <section className="container-wide py-section-gap">
        <div className="text-center mb-16">
          <h3 className="font-headline-md text-headline-md text-primary mb-4">Hiệu Qủa Đa Tầng</h3>
          <div className="w-12 h-px bg-primary mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {skinTags.slice(0, 4).map((tag) => (
            <div key={tag} className="border border-outline-variant bg-transparent p-8 flex flex-col items-center text-center hover:border-primary transition-colors duration-300">
              <span className="text-primary text-[40px] mb-6 font-light">✦</span>
              <h4 className="font-body-lg text-body-lg text-primary font-medium mb-3">{tag}</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">Giải pháp chăm sóc phù hợp với tình trạng da này.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-wide pb-section-gap flex flex-col items-center">
        <span className="label-caps uppercase tracking-widest text-on-surface-variant mb-6">Giải pháp chuyên biệt cho</span>
        <div className="flex flex-wrap justify-center gap-4">
          {skinTags.map((tag) => (
            <div key={tag} className="px-6 py-2 bg-primary-fixed text-on-primary-fixed rounded-full font-body-md text-body-md border border-outline-variant/30">
              {tag}
            </div>
          ))}
        </div>
      </section>

      <section className="w-full bg-surface border-y border-outline-variant">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 items-stretch">
          <div className="py-16 lg:pr-24 flex flex-col justify-center bg-surface-container-low lg:bg-transparent lg:border-r border-outline-variant">
            <h3 className="font-headline-md text-headline-md text-primary mb-6">Thảo dược phương Đông & công nghệ phân tử hiện đại</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8 leading-relaxed">
              {descriptionParas[1] ?? product.description}
            </p>
            <div className="w-12 h-px bg-outline-variant mb-8" />
            <h4 className="font-body-lg text-body-lg text-primary font-medium mb-4">Kết cấu mượt nhẹ, thẩm thấu tinh tế</h4>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {descriptionParas[2] ?? 'Kết cấu tinh tế mang lại cảm giác dịu nhẹ, giúp làn da trở nên mịn màng, ổn định và sẵn sàng cho quá trình phục hồi ở chuẩn mực cao hơn.'}
            </p>
          </div>
          <figure className="w-full h-[50vh] lg:h-auto min-h-[500px] relative bg-surface-container-low">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDvV9mhDCaMKAhB7QH_psRiQ_cU05OIvDeRbc-cjQd_VqB59DPUa9LnaASv074uR-qKnsTcWnZaDDXn_JNx_efXd5I_0N2t9_ojLjvqDrFn0fZWwKzMMOvGY4iPpbieXcK3rTtOi9e4fZSg8_cWnLA4bLFso2Yd4TF57PiD4pXJMNt9nwNJ0qAJ4t4MXZkXuyv-RZIAdld7ZeHe8N_HvwGlj_hcuLULbwnCwNISaFm0-q_WUO_NtgcPEzmdobHHKpwAzj-3sZB6trk')",
              }}
            />
            <figcaption className="absolute bottom-4 left-4 right-4 px-4 py-3 text-label text-label-md text-primary/60 bg-surface-container-low/90">
              Hình minh họa kết cấu sản phẩm (sẽ thay bằng ảnh thật).
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="max-w-[800px] w-full mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
        <div className="border-b border-outline-variant">
          <details className="group py-6 cursor-pointer" open>
            <summary className="flex justify-between items-center font-body-lg text-body-lg text-primary list-none font-medium">
              Mô tả sản phẩm
              <span className="group-open:rotate-180 transition-transform duration-300">⌄</span>
            </summary>
            <div className="pt-4 font-body-md text-body-md text-on-surface-variant leading-relaxed whitespace-pre-line">
              {product.description}
            </div>
          </details>
        </div>
        <div className="border-b border-outline-variant">
          <details className="group py-6 cursor-pointer">
            <summary className="flex justify-between items-center font-body-lg text-body-lg text-primary list-none font-medium">
              Thành phần
              <span className="group-open:rotate-180 transition-transform duration-300">⌄</span>
            </summary>
            <div className="pt-4 font-body-md text-body-md text-on-surface-variant leading-relaxed whitespace-pre-line">
              {product.ingredients || 'Thành phần chi tiết xem trên bao bì sản phẩm.'}
            </div>
          </details>
        </div>
        <div className="border-b border-outline-variant">
          <details className="group py-6 cursor-pointer">
            <summary className="flex justify-between items-center font-body-lg text-body-lg text-primary list-none font-medium">
              Hướng dẫn sử dụng
              <span className="group-open:rotate-180 transition-transform duration-300">⌄</span>
            </summary>
            <div className="pt-4 font-body-md text-body-md text-on-surface-variant leading-relaxed whitespace-pre-line">
              {product.usage || 'Hướng dẫn sử dụng xem trong phần thông tin sản phẩm.'}
            </div>
          </details>
        </div>
        <div className="border-b border-outline-variant">
          <details className="group py-6 cursor-pointer">
            <summary className="flex justify-between items-center font-body-lg text-body-lg text-primary list-none font-medium">
              Phù hợp với làn da nào
              <span className="group-open:rotate-180 transition-transform duration-300">⌄</span>
            </summary>
            <div className="pt-4 font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {product.skinType}
            </div>
          </details>
        </div>
        <div className="border-b border-outline-variant">
          <details className="group py-6 cursor-pointer">
            <summary className="flex justify-between items-center font-body-lg text-body-lg text-primary list-none font-medium">
              Lưu ý
              <span className="group-open:rotate-180 transition-transform duration-300">⌄</span>
            </summary>
            <div className="pt-4 font-body-md text-body-md text-on-surface-variant leading-relaxed whitespace-pre-line">
              {product.info || 'Vui lòng bảo quản nơi khô ráo, tránh ánh nắng trực tiếp.'}
            </div>
          </details>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-wide pb-section-gap pt-16">
          <div className="text-center mb-12">
            <h3 className="font-headline-md text-headline-md text-primary mb-2">Gợi ý hoàn thiện chu trình</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">Những thiết kế tương thích hoàn hảo cùng {product.name}.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.slice(0, 3).map((item) => (
              <Link key={item.slug} to={`/product/${item.slug}`} className="group cursor-pointer">
                <div className="aspect-square bg-surface-container-lowest border border-outline-variant mb-6 overflow-hidden flex items-center justify-center p-8 transition-colors group-hover:border-primary">
                  <div className="w-full h-full flex items-center justify-center text-center text-on-surface-variant text-sm">
                    {item.name}
                  </div>
                </div>
                <div className="text-center">
                  <span className="label-caps uppercase tracking-widest text-on-surface-variant mb-2 block">{item.type}</span>
                  <h4 className="font-body-lg text-body-lg text-primary mb-2 font-medium">{item.name}</h4>
                  <p className="font-body-md text-body-md text-outline">Khám phá</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
