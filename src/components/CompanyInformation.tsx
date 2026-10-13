import { company } from '../data/company'

export default function CompanyInformation() {
  return (
    <section aria-label="Thông tin công ty" className="space-y-3 text-sm leading-relaxed text-on-surface-variant">
      <h2 className="font-semibold text-primary">{company.name}</h2>
      <p>MST: {company.taxCode}, cấp ngày {company.registrationDate}, cấp bởi {company.registrationAuthority}.</p>
      <p>Đại diện pháp luật: {company.legalRepresentative}</p>
      <p>Địa chỉ: {company.address}</p>
      <p>Điện thoại: <a href={company.phoneHref} className="hover:underline">{company.phone}</a></p>
      <p>Thư điện tử: <a href={`mailto:${company.email}`} className="break-all hover:underline">{company.email}</a></p>
    </section>
  )
}
