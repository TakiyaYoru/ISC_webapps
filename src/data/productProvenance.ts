const base = 'https://www.lelaffe.com/products/'

export const productProvenance: Record<string, { sourceUrl: string; volume: string }> = {
  'zayin-rare-elements-vital-facial-essence': { sourceUrl: `${base}zayin-rare-elements-vital-facial-essence/`, volume: '50 ml' },
  'chet-energy-restoration-facial-treatment': { sourceUrl: `${base}chet-energy-restoration-facial-treatment/`, volume: '50 ml' },
  'smtrs-100-de-secret': { sourceUrl: `${base}smtrs-100-de-secret/`, volume: '10 ml' },
  '500-000-stem-media-skin-booster': { sourceUrl: `${base}500000-stem-media-skin-booster/`, volume: '30 ml' },
  'alpeh-mito-viv-first-treatment-essence': { sourceUrl: `${base}aleph-mito-viv-first-treatment-essence/`, volume: '100 ml' },
  'comprehensive-skincare-solution-quintet': { sourceUrl: `${base}comprehensive-skincare-solution-quintet/`, volume: 'Aleph 5 ml, Zayin 5 ml, Chet 5 ml, SMTRs-100 3 ml, Stem Media Skin Booster 3 ml' },
  'platinum-stemcell-reverse-aging-solution': { sourceUrl: `${base}le-laffe-seoul-project/`, volume: 'Aleph 100 ml, Zayin 50 ml, Chet 50 ml, SMTRs-100 10 ml, Stem Media Skin Booster 30 ml' },
}

export const productLabelInformation = {
  brand: 'Le Laffé',
  country: 'Hàn Quốc',
  responsibleDistributor: 'Le Laffé (theo website hãng)',
  manufacturer: 'Tên và địa chỉ nhà sản xuất được ghi riêng trên nhãn sản phẩm. Vui lòng xem bao bì sản phẩm.',
  expiry: 'Ngày sản xuất và hạn sử dụng: xem thông tin in trên bao bì của từng sản phẩm. Không sử dụng sau ngày hết hạn.',
  afterOpening: 'Thời gian sử dụng sau khi mở nắp: thực hiện theo hướng dẫn và ký hiệu trên nhãn sản phẩm.',
  storage: 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp và để xa tầm tay trẻ em.',
  precautions: 'Chỉ dùng ngoài da. Tránh tiếp xúc với mắt; rửa sạch bằng nước nếu sản phẩm vào mắt. Không dùng trên vùng da bị tổn thương. Ngừng sử dụng nếu xuất hiện kích ứng; tham khảo chuyên viên y tế nếu tình trạng kéo dài.',
}
