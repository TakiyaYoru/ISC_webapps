import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

type PageType = 'imperial' | 'brands' | 'stores' | 'experience'

type Props = {
  page?: PageType
}

const pageData = {
  imperial: {
    label: 'IMPERIAL SKIN CARE',
    titleEn: 'ABOUT THE CLINIC',
    titleVi: 'IMPERIAL Skin Care',
    subTitle: 'Đang được biên soạn & thiết lập phác đồ.',
    desc: 'Trang giới thiệu về IMPERIAL Skin Care đang được chuẩn bị chu đáo để mang lại thông tin chính xác nhất về phác đồ điều trị và nguồn gốc các dòng sản phẩm cao cấp. Xin quý khách vui lòng quay lại sau.',
    breadcrumbText: 'IMPERIAL Skin Care',
  },
  brands: {
    label: 'BRAND SYSTEM',
    titleEn: 'EXCLUSIVE COOPERATION',
    titleVi: 'Hệ thống thương hiệu',
    subTitle: 'Đang kết nối & cập nhật danh sách thương hiệu.',
    desc: 'Thông tin chi tiết về hệ thống các thương hiệu phân phối độc quyền bởi IMPERIAL đang được cập nhật. Chúng tôi lựa chọn kỹ lưỡng từng thương hiệu y khoa hàng đầu thế giới để đồng hành cùng làn da của bạn.',
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

export default function About({ page = 'imperial' }: Props) {
  const data = pageData[page]

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
