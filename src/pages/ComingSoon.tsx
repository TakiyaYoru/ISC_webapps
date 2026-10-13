import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const labels: Record<string, { label: string; sub: string; detail: string }> = {
  '/collection': {
    label: 'Bộ sưu tập',
    sub: 'Những sản phẩm chăm sóc da được chọn lọc.',
    detail:
      'Bộ sưu tập đang được hoàn thiện hình ảnh và thông tin để giới thiệu trong thời gian tới.',
  },
  '/rituals': {
    label: 'Quy trình chăm sóc da',
    sub: 'Chăm sóc da theo từng bước.',
    detail:
      'Các quy trình chăm sóc buổi sáng, buổi tối và hằng tuần đang được hoàn thiện.',
  },
  '/journal': {
    label: 'Bài viết',
    sub: 'Kiến thức về chăm sóc da.',
    detail:
      'Các bài viết đang được biên tập. Vui lòng quay lại để xem nội dung mới.',
  },
  '/about': {
    label: 'Về IMPERIAL',
    sub: 'Chăm sóc da với sự tận tâm và chính xác.',
    detail:
      'Thông tin giới thiệu IMPERIAL Beauty Clinic và IMPERIAL Skin Care đang được hoàn thiện.',
  },
  '/bespoke': {
    label: 'Tư vấn riêng',
    sub: 'Quy trình chăm sóc dành riêng cho bạn.',
    detail:
      'Dịch vụ đặt lịch tư vấn đang được chuẩn bị. Quý khách có thể liên hệ để được hỗ trợ.',
  },
}

function resolveLabel(pathname: string) {
  const base = '/' + (pathname.split('/')[1] ?? '')
  return (
    labels[base] ?? {
      label: 'Đang chuẩn bị',
      sub: 'Nội dung đang được hoàn thiện.',
      detail:
        'Trang này đang được hoàn thiện. Quý khách vui lòng quay lại sau hoặc liên hệ để được hỗ trợ.',
    }
  )
}

export default function ComingSoon() {
  const { pathname } = useLocation()
  const { label, sub, detail } = resolveLabel(pathname)

  return (
    <div className="min-h-[92vh] flex items-center relative overflow-hidden">
      {/* Soft atmospheric background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 85% 15%, rgba(139, 111, 71, 0.14), transparent 60%), radial-gradient(ellipse 70% 50% at 10% 90%, rgba(112, 87, 49, 0.08), transparent 55%)',
        }}
      />

      <div className="container-wide relative grid grid-cols-12 gap-6 md:gap-12 items-center py-28 md:py-36">
        <div className="col-span-12 md:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="label-caps text-ink/50 mb-8"
          >
            {label} · Đang chuẩn bị
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-display-lg md:text-display-xl leading-[0.98] tracking-tighter text-balance"
          >
            Chăm chút từng bước.<br />
            <span className="italic font-light text-primary">Sắp ra mắt.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-10 max-w-lg font-serif italic text-xl md:text-2xl text-ink/70 leading-relaxed"
          >
            {sub}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55 }}
            className="mt-6 max-w-md text-body-lg text-ink/60 leading-relaxed text-pretty"
          >
            {detail}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="mt-14 flex flex-wrap items-center gap-5"
          >
            <Link to="/" className="btn-primary">
              Trở về trang chủ
            </Link>
            <Link to="/contact" className="btn-underline">
              Liên hệ tư vấn →
            </Link>
          </motion.div>
        </div>

        {/* Editorial mark */}
        <div className="col-span-12 md:col-span-5 hidden md:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] flex items-center justify-center overflow-hidden"
            style={{
              backgroundImage:
                'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.5), transparent 55%), linear-gradient(135deg, #EBDCBF 0%, #8B6F47 100%)',
            }}
          >
            <div className="text-center text-bone/90">
              <p className="font-serif text-[1rem] tracking-[0.5em] mb-6">IMPERIAL</p>
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                className="mx-auto opacity-90"
              >
                <path
                  d="M32 6l6 16.4L54 26l-13 11.2L44 55l-12-7.8L20 55l3-17.8L10 26l16-3.6L32 6z"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="font-serif italic text-lg mt-8">Chăm sóc da cùng IMPERIAL</p>
              <p className="label-caps mt-4 text-bone/70">IMPERIAL Skin Care</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
