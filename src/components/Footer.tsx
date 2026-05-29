import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-outline-variant mt-auto">
      <div className="container-wide py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="flex flex-col gap-4">
            <img
              alt="IMPERIAL"
              className="h-10 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6JZqdOd6huym1qP1GNGeuZsJO72ODXBcuBLmhE57K8qbDRr_T5yXn_2_XMhMGIcXQaFf4yWY1nAwN4UVNkbtl2LaSm84kzoXT--MgF1Wr-DfPqkr-83d2hCabdAUINc8A_qU5gQisg1lNkHI3L-9aGQPm_I4Eka9UrsoCw9izblnfs_8fhNV5oYgTojFhkv_Lg_z6dLh0wear_NsaPlXGhkvbbvjIfuWHFVtNI2VDDhd_dM8iTxUcXhu04MA8W0JjDN4p2mIxbVA"
            />
            <p className="text-sm leading-relaxed text-on-surface-variant">
              IMPERIAL Skin Care, được thành lập bởi Công Ty Cổ Phần Imperial Care, là nền tảng phân phối mỹ phẩm trẻ hóa
              và chống lão hóa cao cấp tại Việt Nam.
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-on-surface-variant">
              <p>Địa chỉ: 1 Lý Tự Trọng, Phường Bến Nghé, Quận 1, Tp. HCM</p>
              <p>Hotline: 0869 733 288</p>
              <p>Email: info.imperialskincare@gmail.com</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="label-caps text-secondary">Chính sách</span>
            <Link to="/policy/purchase-guide" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
              Hướng dẫn mua hàng
            </Link>
            <Link to="/policy/returns" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
              Chính sách đổi trả
            </Link>
            <Link to="/policy/privacy" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
              Chính sách bảo mật
            </Link>
            <Link to="/policy/terms" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
              Điều khoản dịch vụ
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <span className="label-caps text-secondary">Chăm sóc khách hàng</span>
            <Link to="/faq" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
              Hỏi đáp
            </Link>
            <Link to="/contact" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
              Liên hệ
            </Link>
            <Link to="/stores" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
              Hệ thống cửa hàng
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <span className="label-caps text-secondary">Kết nối</span>
            <div className="flex gap-4 text-on-surface-variant">
              <a
                aria-label="Facebook"
                className="hover:text-primary transition-colors"
                href="https://www.facebook.com/profile.php?id=61588853810322"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                aria-label="Instagram"
                className="hover:text-primary transition-colors"
                href="https://www.instagram.com/imperialskincare/"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2zm6.1-8.1a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0z" />
                  <path d="M17.6 3H6.4A3.4 3.4 0 0 0 3 6.4v11.2A3.4 3.4 0 0 0 6.4 21h11.2a3.4 3.4 0 0 0 3.4-3.4V6.4A3.4 3.4 0 0 0 17.6 3zm1.7 14.6a1.7 1.7 0 0 1-1.7 1.7H6.4a1.7 1.7 0 0 1-1.7-1.7V6.4A1.7 1.7 0 0 1 6.4 4.7h11.2a1.7 1.7 0 0 1 1.7 1.7z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="divider-tonal mt-12" />
        <div className="pt-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-[0.7rem] uppercase tracking-[0.2em] text-ink/50">
          <p>© {new Date().getFullYear()} Imperial Skin Care.</p>
          <div className="flex gap-8">
            <Link to="/policy/privacy">Privacy</Link>
            <Link to="/policy/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
