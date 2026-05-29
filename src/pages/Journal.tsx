import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

export default function Journal() {
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
            <span className="text-primary font-medium">Blog</span>
          </nav>
        </Reveal>

        {/* Coming Soon Content */}
        <div className="max-w-3xl py-12">
          <Reveal delay={0.1}>
            <p className="label-caps text-secondary mb-6 tracking-[0.2em] font-semibold">
              THE JOURNAL
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <h1 className="font-serif text-display-md md:text-display-lg leading-[1.1] tracking-tighter text-primary mb-8 text-balance">
              Nhật ký & Kiến thức Y khoa<br />
              <span className="italic font-light text-secondary">Đang được biên soạn & tổng hợp.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="max-w-xl text-body-lg text-on-surface-variant/80 leading-relaxed mb-12 text-pretty">
              Các bài viết chuyên sâu về khoa học tế bào, phác đồ trẻ hóa da và các nghi thức chăm sóc da lâm sàng từ phòng thí nghiệm của IMPERIAL đang được biên soạn, dịch thuật và hiệu đính để gửi tới quý khách trong thời gian sớm nhất. Xin quý khách vui lòng quay lại sau.
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
