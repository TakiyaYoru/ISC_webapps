import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

type PageType = 'imperial' | 'brands' | 'stores' | 'experience'

type Props = {
  page?: PageType
}

const pageData = {
  imperial: {
    label: 'IMPERIAL SKIN CARE',
    titleEn: 'ABOUT THE ATELIER',
    titleVi: 'Về chúng tôi',
    subTitle: 'IMPERIAL Skin Care',
    desc: '',
    breadcrumbText: 'Giới thiệu',
  },
  brands: {
    label: 'BRAND SYSTEM',
    titleEn: 'EXCLUSIVE COOPERATION',
    titleVi: 'Hệ thống thương hiệu',
    subTitle: 'IMPERIAL Brand Ecosystem',
    desc: '',
    breadcrumbText: 'Hệ thống thương hiệu',
  },
  stores: {
    label: 'STORE NETWORK',
    titleEn: 'CLINICAL LOUNGES',
    titleVi: 'Hệ thống cửa hàng',
    subTitle: 'Đang đồng bộ thông tin showroom & clinic.',
    desc: 'Danh sách các showroom, lounge tư vấn và chi nhánh phòng khám trong hệ thống cửa hàng IMPERIAL đang được đồng bộ thông tin và cập nhật chỉ dẫn định vị chính xác nhất.',
    breadcrumbText: 'Hệ thống cửa hàng',
  },
  experience: {
    label: 'CUSTOMER CARE',
    titleEn: 'MEMBERSHIP & EXPERIENCE',
    titleVi: 'Trải nghiệm khách hàng',
    subTitle: 'Đang thiết lập chương trình đặc quyền thành viên.',
    desc: 'Chương trình đặc quyền thành viên, hệ thống tích lũy điểm và các dịch vụ chăm sóc khách hàng chuyên biệt đang được thiết lập để mang lại trải nghiệm hoàn hảo nhất cho quý khách.',
    breadcrumbText: 'Trải nghiệm khách hàng',
  },
}

const brandsList = [
  {
    name: 'IMPERIAL HOTEL & RESORT',
    subtitle: 'Nghỉ dưỡng & Khách sạn cao cấp',
    description: 'Khách sạn & Khu nghỉ dưỡng Imperial tự hào mang đến cho bạn một không gian sang trọng, một trải nghiệm đầy phong cách, nhưng luôn thoải mái và thư giãn, đúng với ý nghĩa và mục tiêu của thương hiệu Imperial.\n\nKhách sạn có kiến trúc tiên tiến, ẩm thực hiện đại, đa dạng dịch vụ từ Spa thư giãn, bãi biển đặc trưng đến chương trình giải trí vào ban đêm, tạo ra trải nghiệm Hoàng gia cao cấp. Tại đây, ngoài các hoạt động dành cho người lớn, chúng tôi còn tổ chức nhiều chương trình hoạt động tiên tiến dựa trên hoạt động học tập và thể chất dành cho trẻ em, là nơi lý tưởng cho các gia đình lưu trú và tận hưởng những giây phút ý nghĩa nhất.',
    link: 'https://member.imperial.vn/imperial-hotel-resort',
    initials: 'IHR',
    color: 'text-primary border-primary/20 bg-surface-container-low',
    logoText: 'Hotel & Resort',
  },
  {
    name: 'IMPERIAL PREMIUM HEALTHCARE',
    subtitle: 'Chăm sóc sức khỏe & Thẩm mỹ y khoa',
    description: 'Imperial Premium Healthcare là sự kết hợp từ những hiểu biết quý giá nhất của thiên nhiên và khoa học, đúc kết từ y học cổ truyền, y học hiện đại, tâm lý học và tinh thần học từ đó đưa ra những phương pháp trị liệu đưa bạn đến với một vẻ ngoài tràn đầy sức sống và một cơ thể căng tràn sự dẻo dai.',
    link: 'https://member.imperial.vn/imperial-premium-health-care',
    initials: 'IPH',
    color: 'text-secondary border-secondary/20 bg-surface-container-low',
    logoText: 'Premium Healthcare',
  },
  {
    name: 'IMPERIAL SUITES',
    subtitle: 'Căn hộ & Văn phòng dịch vụ hạng sang',
    description: 'Imperial Suites mang đến cho bạn một ngôi nhà thứ hai được trang bị nội thất sang trọng, tinh tế, hỗ trợ thư ký hành chính, nhận gửi thư từ, an ninh 24/7, điều hòa trung tâm, bảo trì, dọn dẹp chuyên nghiệp hàng ngày, cho thuê xe limousine / xe hơi... Tất cả nhằm giúp bạn có sự khởi đầu thuận lợi trong kinh doanh của mình, thay vì lo nghĩ về văn phòng làm việc với nhiều vấn đề thì chỉ cần bước chân vào và cảm nhận sự sang trọng, thoải mái và tiện nghi để yên tâm làm việc một cách hiệu quả nhất.',
    link: 'https://member.imperial.vn/imperial-suites',
    initials: 'IS',
    color: 'text-primary border-primary/20 bg-surface-container-low',
    logoText: 'Suites',
  },
  {
    name: 'IMPERIAL INTERNATIONAL HOTEL COLLEGE',
    subtitle: 'Đào tạo nhân lực du lịch & Khách sạn chuẩn quốc tế',
    description: 'Trường duy nhất tại Việt Nam hoạt động theo mô hình đào tạo chuẩn quốc tế Hotel School, có cơ sở đào tạo trong khu tổ hợp khách sạn - Căn hộ cao cấp 5 sao chuẩn quốc tế. Chương trình được đồng thiết kế bởi Đại học Niagara, New York, Hoa Kỳ cùng đội ngũ chuyên gia đầu ngành nhiều kinh nghiệm của Khách Sạn Imperial, được thẩm định, quản lý chất lượng và cấp bằng bởi tổ chức NCFE (Vương Quốc Anh). Bằng có giá trị chuyển tiếp và cơ hội việc làm toàn cầu.',
    link: 'https://member.imperial.vn/imperial-international-hotel-college',
    initials: 'IIHC',
    color: 'text-primary border-primary/20 bg-surface-container-low',
    logoText: 'Hotel College',
  },
  {
    name: 'IMPERIAL DELICACIES',
    subtitle: 'Ẩm thực & Nhà hàng cao cấp',
    description: 'Imperial Delicacies mang đến cho bạn nhiều thương hiệu ẩm thực đồng hành cùng cuộc sống hàng ngày cho đến những ngày muốn đổi gió vi vu khắp nơi. Lâu lâu rời xa những địa điểm ồn ào, tìm một nơi yên tĩnh để đổi khẩu vị cùng món Ăn đặc trưng mà rất dễ ăn ở Sài Gòn tại Ashoka, hay những buổi trưa nóng nực muốn nếm trải chút hương vị gió biển cùng các món hải sản tươi sống tuyệt ngon tại La Sirena, no nê với bữa trưa hải sản thì hãy bắt đầu dạo một vòng thành phố biển Vũng Tàu rồi quay trở lại Imperial Garden để thưởng thức ly café hương vị đặc sắc ngắm hoàng hôn trên biển. Sẽ thật uổng phí cho một chuyến đi nếu không dành thêm thời gian tận hưởng không gian âm nhạc sôi động và đầy màu sắc lễ hội chỉ cách đó vài bước chân tại La Bonita. Kết thúc chuyến hành trình, đừng quên mua vài sản phẩm trà mãng cầu từ Imperial Health Tea để làm món quà ý nghĩa dành tặng người thân khi trở về.',
    link: 'https://member.imperial.vn/imperial-delicacies',
    initials: 'ID',
    color: 'text-secondary border-secondary/20 bg-surface-container-low',
    logoText: 'Delicacies',
  },
]

const BrandLogo = ({ initials, title, color }: { initials: string; title: string; color: string }) => {
  return (
    <div className={`w-36 h-36 flex flex-col items-center justify-center border rounded-lg p-4 text-center shadow-ambient-sm transition-all duration-300 select-none ${color}`}>
      <svg viewBox="0 0 100 100" className="w-14 h-14 mb-2 text-secondary fill-none" stroke="currentColor" strokeWidth="1.5">
        <path d="M50 12 L82 25 L82 62 C82 76 50 88 50 88 C50 88 18 76 18 62 L18 25 Z" />
        <circle cx="50" cy="50" r="22" strokeDasharray="3 3" strokeWidth="0.8" />
        <text x="50" y="54" textAnchor="middle" stroke="none" fill="currentColor" className="font-serif text-[10px] font-bold tracking-widest">{initials}</text>
      </svg>
      <span className="font-sans text-[8px] uppercase tracking-widest font-bold opacity-85 leading-tight">{title}</span>
    </div>
  )
}

export default function About({ page = 'imperial' }: Props) {
  const data = pageData[page]

  // Render customized detailed page for IMPERIAL Skin Care
  if (page === 'imperial') {
    return (
      <div className="bg-background text-on-background relative overflow-hidden pb-24">
        {/* Soft atmospheric background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 80% 60% at 85% 15%, rgba(200, 169, 106, 0.04), transparent 60%), radial-gradient(ellipse 70% 50% at 10% 90%, rgba(15, 26, 36, 0.02), transparent 55%)',
          }}
        />

        <div className="container-wide py-8">
          <Reveal>
            <nav className="flex text-sm text-on-surface-variant font-body-md">
              <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
              <span className="mx-2">/</span>
              <span className="text-on-surface-variant">Về chúng tôi</span>
              <span className="mx-2">/</span>
              <span className="text-primary font-medium">{data.breadcrumbText}</span>
            </nav>
          </Reveal>
        </div>

        {/* Hero Title */}
        <section className="container-wide mb-16 max-w-4xl pt-8">
          <Reveal delay={0.1}>
            <p className="label-caps text-secondary mb-4 tracking-[0.2em] font-semibold">
              {data.label}
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <h1 className="font-serif text-display-md md:text-display-lg leading-[1.1] tracking-tighter text-primary mb-8">
              Giới thiệu về <br />
              <span className="italic font-light text-secondary">IMPERIAL Skin Care</span>
            </h1>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="space-y-6 text-body-lg text-on-surface-variant/90 leading-relaxed font-sans max-w-3xl">
              <p className="font-medium text-primary text-lg">
                IMPERIAL Skin Care là nền tảng phân phối mỹ phẩm chăm sóc da, trẻ hóa và chống lão hóa cao cấp tại Việt Nam, được thành lập và vận hành bởi Công Ty Cổ Phần Imperial Care.
              </p>
              <p>
                Với định hướng kết nối những thương hiệu mỹ phẩm và giải pháp chăm sóc da cao cấp đến người tiêu dùng Việt Nam, IMPERIAL Skin Care tập trung phát triển hệ sinh thái sản phẩm được lựa chọn theo các tiêu chí về chất lượng, nguồn gốc, công nghệ và định hướng chăm sóc da chuyên sâu.
              </p>
              <p>
                Thông qua nền tảng IMPERIAL Skin Care, khách hàng có thể tìm hiểu thông tin sản phẩm, chính sách mua hàng và thực hiện đặt hàng trực tuyến đối với các sản phẩm được phân phối trên hệ thống.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Main Content Sections */}
        <div className="container-wide space-y-16">
          {/* Section 1: Định hướng */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-10 border-t border-outline-variant/30">
            <div className="md:col-span-4">
              <Reveal>
                <h3 className="font-serif text-xl md:text-2xl text-primary font-medium mb-3">1. Định hướng hoạt động</h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  Tầm nhìn xây dựng hệ sinh thái sản phẩm trẻ hóa tế bào cao cấp, minh bạch và an toàn.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <Reveal delay={0.15}>
                <div className="border border-outline-variant/40 p-6 md:p-8 bg-surface-container-lowest rounded space-y-4">
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                    IMPERIAL Skin Care hướng đến việc xây dựng một nền tảng phân phối mỹ phẩm cao cấp với thông tin sản phẩm minh bạch, quy trình giao dịch rõ ràng và trải nghiệm mua sắm thuận tiện.
                  </p>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed font-semibold">
                    Chúng tôi tập trung vào các nhóm sản phẩm chăm sóc da chuyên sâu, đặc biệt là các giải pháp hướng đến:
                  </p>
                  <ul className="list-disc list-inside space-y-2 font-sans text-sm text-on-surface-variant/90 pl-2">
                    <li>Chăm sóc và duy trì sức khỏe làn da.</li>
                    <li>Hỗ trợ cải thiện các dấu hiệu lão hóa sớm.</li>
                    <li>Chăm sóc, điều trị phục hồi chuyên sâu.</li>
                    <li>Phục hồi và củng cố hệ hàng rào sinh học bảo vệ da.</li>
                    <li>Duy trì vẻ ngoài khỏe mạnh, rạng rỡ và trẻ trung của làn da.</li>
                  </ul>
                  <p className="font-sans text-sm text-on-surface-variant/80 pt-2 border-t border-outline-variant/20 italic">
                    Các sản phẩm được giới thiệu và phân phối trên nền tảng được cung cấp đầy đủ thông tin về sản phẩm, hướng dẫn sử dụng và các điều kiện giao dịch liên quan nhằm giúp khách hàng có cơ sở tìm hiểu trước khi đưa ra quyết định mua hàng.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Section 2: Vai trò */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-10 border-t border-outline-variant/30">
            <div className="md:col-span-4">
              <Reveal>
                <h3 className="font-serif text-xl md:text-2xl text-primary font-medium mb-3">2. Vai trò vận hành</h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  Trách nhiệm quản lý, đảm bảo quy chế pháp lý và xử lý giao dịch thương mại.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <Reveal delay={0.15}>
                <div className="border border-outline-variant/40 p-6 md:p-8 bg-surface-container-lowest rounded space-y-4">
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                    IMPERIAL Skin Care là nền tảng phân phối sản phẩm do Công Ty Cổ Phần Imperial Care quản lý và vận hành.
                  </p>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                    Công ty chịu trách nhiệm quản lý hoạt động của nền tảng, cung cấp thông tin về sản phẩm và điều kiện giao dịch, tiếp nhận và xử lý các yêu cầu của khách hàng liên quan đến quá trình mua hàng, thanh toán, giao nhận, đổi trả và các vấn đề phát sinh trong quá trình giao dịch theo chính sách được công bố trên website.
                  </p>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed font-semibold">
                    Các sản phẩm được cung cấp trên nền tảng được phân phối theo thông tin và điều kiện được công bố tại từng thời điểm.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Section 3: Cam kết */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-10 border-t border-outline-variant/30">
            <div className="md:col-span-4">
              <Reveal>
                <h3 className="font-serif text-xl md:text-2xl text-primary font-medium mb-3">3. Cam kết với khách hàng</h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  Các tiêu chí cốt lõi trong xây dựng trải nghiệm và lòng tin từ người tiêu dùng.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <Reveal delay={0.15}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-outline-variant/40 p-6 bg-surface-container-lowest rounded">
                    <h4 className="font-sans text-sm font-semibold text-secondary uppercase tracking-wider mb-2">Minh bạch thông tin</h4>
                    <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed">Cung cấp thông tin rõ ràng về sản phẩm, xuất xứ nguồn gốc, hướng dẫn sử dụng và các điều kiện liên quan đến giao dịch.</p>
                  </div>
                  <div className="border border-outline-variant/40 p-6 bg-surface-container-lowest rounded">
                    <h4 className="font-sans text-sm font-semibold text-secondary uppercase tracking-wider mb-2">Rõ ràng trong giao dịch</h4>
                    <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed">Công khai các chính sách liên quan đến đặt hàng, thanh toán, giao hàng, đổi trả và hoàn tiền để khách hàng thuận tiện tra cứu trước và sau khi mua hàng.</p>
                  </div>
                  <div className="border border-outline-variant/40 p-6 bg-surface-container-lowest rounded">
                    <h4 className="font-sans text-sm font-semibold text-secondary uppercase tracking-wider mb-2">Hỗ trợ khách hàng</h4>
                    <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed">Tiếp nhận các câu hỏi, phản ánh và yêu cầu của khách hàng thông qua các kênh liên hệ chính thức của IMPERIAL Skin Care.</p>
                  </div>
                  <div className="border border-outline-variant/40 p-6 bg-surface-container-lowest rounded">
                    <h4 className="font-sans text-sm font-semibold text-secondary uppercase tracking-wider mb-2">Bảo vệ thông tin khách hàng</h4>
                    <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed">Thông tin khách hàng được tiếp nhận, mã hóa và bảo mật nghiêm ngặt theo chính sách bảo mật được công bố trên nền tảng.</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Section 4: Liên hệ */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-10 border-t border-outline-variant/30">
            <div className="md:col-span-4">
              <Reveal>
                <h3 className="font-serif text-xl md:text-2xl text-primary font-medium mb-3">4. Thông tin liên hệ</h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  Kết nối trực tiếp với đội ngũ hỗ trợ kỹ thuật và tư vấn viên chuyên nghiệp của chúng tôi.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <Reveal delay={0.15}>
                <div className="border border-outline-variant/40 p-6 md:p-8 bg-surface-container-lowest rounded space-y-6">
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                    Mọi câu hỏi, yêu cầu hỗ trợ hoặc phản ánh liên quan đến sản phẩm và giao dịch trên nền tảng, khách hàng có thể liên hệ IMPERIAL Skin Care qua:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-surface-container-low border border-outline-variant/30 rounded text-center">
                      <p className="font-sans text-xs uppercase tracking-wider text-secondary font-semibold">Đường dây nóng</p>
                      <p className="font-sans text-base font-bold text-primary mt-1">0869 733 288</p>
                    </div>
                    <div className="p-4 bg-surface-container-low border border-outline-variant/30 rounded text-center">
                      <p className="font-sans text-xs uppercase tracking-wider text-secondary font-semibold">Hòm thư điện tử</p>
                      <p className="font-sans text-sm font-semibold text-primary mt-2">info.imperialskincare@gmail.com</p>
                    </div>
                  </div>
                  <div className="p-4 bg-surface-container-low border border-outline-variant/30 rounded text-left">
                    <p className="font-sans text-xs uppercase tracking-wider text-secondary font-semibold text-center sm:text-left">Showroom Trụ Sở Chính</p>
                    <p className="font-sans text-sm font-semibold text-primary mt-1 text-center sm:text-left">
                      Số 1 Lý Tự Trọng, Phường Sài Gòn, Thành phố Hồ Chí Minh
                    </p>
                  </div>
                  <p className="font-serif italic text-sm text-secondary text-center pt-2 border-t border-outline-variant/20 leading-relaxed">
                    "IMPERIAL Skin Care trân trọng sự tin tưởng của khách hàng và cam kết không ngừng hoàn thiện chất lượng sản phẩm, thông tin và trải nghiệm trên nền tảng."
                  </p>
                </div>
              </Reveal>
            </div>
          </section>
        </div>
      </div>
    )
  }

  // Render Brand System page layout
  if (page === 'brands') {
    return (
      <div className="bg-background text-on-background relative overflow-hidden pb-24">
        {/* Soft atmospheric background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 80% 60% at 85% 15%, rgba(200, 169, 106, 0.04), transparent 60%), radial-gradient(ellipse 70% 50% at 10% 90%, rgba(15, 26, 36, 0.02), transparent 55%)',
          }}
        />

        <div className="container-wide py-8">
          <Reveal>
            <nav className="flex text-sm text-on-surface-variant font-body-md">
              <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
              <span className="mx-2">/</span>
              <span className="text-on-surface-variant">Về chúng tôi</span>
              <span className="mx-2">/</span>
              <span className="text-primary font-medium">{data.breadcrumbText}</span>
            </nav>
          </Reveal>
        </div>

        {/* Hero Title */}
        <section className="container-wide mb-16 max-w-4xl pt-8">
          <Reveal delay={0.1}>
            <p className="label-caps text-secondary mb-4 tracking-[0.2em] font-semibold">
              {data.label}
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <h1 className="font-serif text-display-md md:text-display-lg leading-[1.1] tracking-tighter text-primary mb-6">
              Hệ thống thương hiệu <br />
              <span className="italic font-light text-secondary">IMPERIAL Ecosystem</span>
            </h1>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="max-w-2xl text-body-lg text-on-surface-variant/90 leading-relaxed font-sans">
              Hệ sinh thái thương hiệu đa ngành cao cấp phát triển bởi Tập đoàn IMPERIAL, kết nối tinh hoa kiến trúc, du lịch nghỉ dưỡng, y tế phục hồi, giáo dục và ẩm thực thượng hạng.
            </p>
          </Reveal>
        </section>

        {/* Brands List Section */}
        <section className="container-wide space-y-12">
          {brandsList.map((brand, idx) => (
            <div
              key={brand.name}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-12 border-t border-outline-variant/30 first:border-t-0"
            >
              {/* Left Column: Logo crest placeholder */}
              <div className="lg:col-span-3 flex justify-start lg:justify-center items-start pt-2">
                <Reveal delay={0.15}>
                  <BrandLogo
                    initials={brand.initials}
                    title={brand.logoText}
                    color={brand.color}
                  />
                </Reveal>
              </div>

              {/* Right Column: Brand details */}
              <div className="lg:col-span-9 space-y-4">
                <Reveal delay={0.25}>
                  <div className="space-y-1">
                    <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold">
                      THƯƠNG HIỆU {idx + 1}
                    </span>
                    <h2 className="font-serif text-2xl text-primary font-medium">
                      {brand.name}
                    </h2>
                    <h3 className="font-sans text-xs text-on-surface-variant/75 uppercase tracking-wider font-semibold">
                      {brand.subtitle}
                    </h3>
                  </div>
                </Reveal>
                <Reveal delay={0.35}>
                  <div className="space-y-4 font-sans text-sm text-on-surface-variant/95 leading-relaxed max-w-4xl">
                    {brand.description.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>
                </Reveal>
                <Reveal delay={0.45}>
                  <div className="pt-4">
                    <a
                      href={brand.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs uppercase tracking-widest font-semibold border-b border-primary/60 pb-1 text-primary hover:text-secondary hover:border-secondary transition-all duration-300"
                    >
                      Thông tin & Hình ảnh chi tiết ➔
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>
          ))}
        </section>
      </div>
    )
  }

  // Render fallback for other pages (stores, experience)
  return (
    <div className="min-h-[80vh] bg-background text-on-background relative overflow-hidden flex flex-col justify-between">
      {/* Soft atmospheric background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 85% 15%, rgba(200, 169, 106, 0.05), transparent 60%), radial-gradient(ellipse 70% 50% at 10% 90%, rgba(15, 26, 36, 0.02), transparent 55%)',
        }}
      />

      <div className="container-wide relative pt-8 pb-24 flex-grow flex flex-col justify-center">
        {/* Breadcrumb */}
        <Reveal>
          <nav className="flex text-sm text-on-surface-variant mb-16 font-body-md">
            <Link className="hover:text-primary transition-colors" to="/">Trang chủ</Link>
            <span className="mx-2">/</span>
            <span className="text-on-surface-variant">Về chúng tôi</span>
            <span className="mx-2">/</span>
            <span className="text-primary font-medium">{data.breadcrumbText}</span>
          </nav>
        </Reveal>

        {/* Coming Soon Content */}
        <div className="max-w-3xl py-12">
          <Reveal delay={0.1}>
            <p className="label-caps text-secondary mb-6 tracking-[0.2em] font-semibold">
              {data.label}
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <h1 className="font-serif text-display-md md:text-display-lg leading-[1.1] tracking-tighter text-primary mb-8 text-balance">
              {data.titleVi}<br />
              <span className="italic font-light text-secondary">{data.subTitle}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="max-w-xl text-body-lg text-on-surface-variant/80 leading-relaxed mb-12 text-pretty">
              {data.desc}
            </p>
          </Reveal>

          <Reveal delay={0.55}>
            <div className="flex flex-wrap items-center gap-6">
              <Link to="/" className="inline-flex items-center gap-3 bg-primary text-on-primary px-8 py-4 text-[0.8125rem] uppercase tracking-widest font-medium transition-all duration-300 hover:bg-secondary">
                Quay lại Trang chủ
              </Link>
              <a href="https://www.instagram.com/imperialskincare/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[0.8125rem] uppercase tracking-widest font-semibold pb-1 border-b border-primary/60 transition-all duration-300 hover:border-secondary hover:text-secondary">
                Instagram Imperial Skincare →
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
