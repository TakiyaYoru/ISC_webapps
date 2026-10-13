// Ảnh sản phẩm hiện có, không giả lập bài đăng hay số liệu tài khoản Instagram.
const storage = 'https://poueqhpkzkqruxakkqvp.supabase.co/storage/v1/object/public/Le%20Laffe'

export const instagramShowcase = [
  {
    id: 'showcase-platinum',
    title: 'Một chu trình. Nhiều bước chăm chút.',
    subtitle: 'Bộ chăm sóc da Le Laffé',
    imageUrl: `${storage}/Platinum%20StemCell%20Full/set_002.png`,
    href: '/product/platinum-stemcell-reverse-aging-solution',
  },
  {
    id: 'showcase-zayin',
    title: 'Dưỡng da từ những điều tinh tế',
    subtitle: 'Tinh chất Zayin',
    imageUrl: `${storage}/Zayin/zayin_002.jpg`,
    href: '/product/zayin-rare-elements-vital-facial-essence',
  },
  {
    id: 'showcase-chet',
    title: 'Dành một khoảng nghỉ cho làn da',
    subtitle: 'Kem dưỡng Chet',
    imageUrl: `${storage}/Chet/chet_003.jpg`,
    href: '/product/chet-energy-restoration-facial-treatment',
  },
  {
    id: 'showcase-aleph',
    title: 'Khởi đầu chu trình chăm sóc',
    subtitle: 'Tinh chất Aleph',
    imageUrl: `${storage}/Alpeh/aleph_002.jpg`,
    href: '/product/alpeh-mito-viv-first-treatment-essence',
  },
  {
    id: 'showcase-quintet',
    title: 'Mang theo những điều nhỏ xinh',
    subtitle: 'Bộ chăm sóc dung tích nhỏ',
    imageUrl: `${storage}/Comprehensive/quintet_001.jpg`,
    href: '/product/comprehensive-skincare-solution-quintet',
  },
]
