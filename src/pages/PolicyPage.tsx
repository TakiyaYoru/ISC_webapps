import { Link } from 'react-router-dom'
import { Fragment } from 'react'
import { policies, policyContent, type PolicySlug } from '../data/policies'

const privacyHeadings = new Set([
  'Mục đích và phạm vi thu thập',
  'Phạm vi sử dụng thông tin',
  'Thời gian lưu trữ thông tin hoặc phương pháp xác định thời gian lưu trữ thông tin;',
  'Những người hoặc tổ chức có thể được tiếp cận với thông tin đó',
  'Biện pháp bảo mật thông tin, dữ liệu của người sử dụng;',
  'Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân',
  'Phương thức, quy trình để chủ thể dữ liệu xem, chỉnh sửa hoặc yêu cầu chỉnh sửa dữ liệu của mình:',
  'Phương thức, quy trình tiếp nhận yêu cầu của chủ thể dữ liệu trong việc xóa, hủy hoặc hạn chế xử lý dữ liệu của khách hàng:',
  'Cam kết bảo mật thông tin cá nhân khách hàng',
  'Phương thức, quy trình tiếp nhận và giải quyết các khiếu nại, yêu cầu, phản ánh của chủ thể dữ liệu liên quan đến việc bảo mật thông tin.',
])

const inlineLinks: Record<string, string> = {
  'Thông tin liên hệ': '/contact',
  'Chính sách bảo mật': '/policy/privacy',
  'Chính sách giao nhận': '/policy/shipping',
  'Chính sách kiểm hàng, đổi trả': '/policy/returns',
  'Chính sách thanh toán': '/policy/payment',
  'Chính sách và Quy định chung': '/policy/terms',
  'Quyền và nghĩa vụ của các bên': '/policy/rights-obligations',
  'Phương thức tiếp nhận và giải quyết phản ánh, yêu cầu, khiếu nại': '/policy/complaints',
  '0869 733 288': 'tel:0869733288',
  'info.imperialskincare@gmail.com': 'mailto:info.imperialskincare@gmail.com',
}
const linkPattern = new RegExp(`(${Object.keys(inlineLinks).map(text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')

function linkedText(text: string) {
  return text.split(linkPattern).map((part, index) => {
    const href = inlineLinks[part]
    if (!href) return <Fragment key={index}>{part}</Fragment>
    return href.startsWith('/')
      ? <Link key={index} to={href} className="text-primary underline underline-offset-2">{part}</Link>
      : <a key={index} href={href} className="text-primary underline underline-offset-2 break-words">{part}</a>
  })
}

function isHeading(line: string) {
  if (/^[*–-]\s/u.test(line)) return false
  return privacyHeadings.has(line)
    || line === 'Giới thiệu'
    || /^(?:\d+[./]|[IVX]+\.|[a-zđ]\)|Bước\s+\d+[.:])\s/u.test(line)
    || (line.length < 160 && /[A-ZÀ-Ỹ]/u.test(line) && line === line.toLocaleUpperCase('vi-VN'))
}

export default function PolicyPage({ slug }: { slug: PolicySlug }) {
  const policy = policies.find(item => item.slug === slug)!
  const lines = policyContent[slug].split('\n').map(line => line.trim()).filter(Boolean)
  if (/^CHÍNH SÁCH |^PHƯƠNG THỨC THANH TOÁN/u.test(lines[0])) lines.shift()

  return (
    <div className="container-wide py-8 md:py-12">
      <nav aria-label="Điều hướng trang" className="mb-8 flex flex-wrap gap-2 text-sm text-on-surface-variant">
        <Link to="/" className="hover:underline">Trang chủ</Link>
        <span aria-hidden="true">/</span>
        <span>{policy.title}</span>
      </nav>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
        <aside className="order-2 lg:order-1">
          <nav aria-label="Danh mục chính sách" className="lg:sticky lg:top-32 border border-outline-variant/50 p-5">
            <h2 className="mb-4 font-semibold text-primary">Chính sách dành cho khách hàng</h2>
            <ul className="space-y-4 text-sm leading-relaxed">
              {policies.map(item => <li key={item.slug}>
                <Link to={`/policy/${item.slug}`} aria-current={item.slug === slug ? 'page' : undefined}
                  className={item.slug === slug ? 'font-semibold text-primary underline underline-offset-4' : 'text-on-surface-variant hover:text-primary hover:underline'}>
                  {item.title}
                </Link>
              </li>)}
            </ul>
          </nav>
        </aside>
        <article className="min-w-0 max-w-3xl order-1 lg:order-2 pb-12">
          <h1 className="font-serif text-3xl md:text-4xl leading-tight text-primary mb-8">{policy.title}</h1>
          <div className="text-sm md:text-base leading-7 text-on-surface-variant">
            {lines.map((line, index) => {
              if (isHeading(line)) return <h2 key={index} className="font-semibold text-primary text-lg mt-8 mb-4">{line}</h2>
              if (/^[*–-]\s/u.test(line)) {
                const items = []
                for (let next = index; next < lines.length && /^[*–-]\s/u.test(lines[next]); next++) items.push(lines[next].replace(/^[*–-]\s*/u, ''))
                if (index > 0 && /^[*–-]\s/u.test(lines[index - 1])) return null
                return <ul key={index} className="list-disc pl-5 space-y-3 mb-4">{items.map((item, itemIndex) => <li key={itemIndex}>{linkedText(item)}</li>)}</ul>
              }
              return <p key={index} className="mb-4 break-words">{linkedText(line)}</p>
            })}
          </div>
        </article>
      </div>
    </div>
  )
}
