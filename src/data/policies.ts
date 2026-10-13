import content from './policyContent.json'

export const policies = [
  { slug: 'privacy', title: 'Chính sách bảo mật' },
  { slug: 'shipping', title: 'Chính sách giao nhận' },
  { slug: 'returns', title: 'Chính sách kiểm hàng, đổi trả' },
  { slug: 'payment', title: 'Chính sách thanh toán' },
  { slug: 'terms', title: 'Chính sách và Quy định chung' },
  { slug: 'supply-conditions', title: 'Điều kiện hoặc hạn chế trong việc cung cấp hàng hóa hoặc dịch vụ' },
  { slug: 'complaints', title: 'Phương thức tiếp nhận và giải quyết phản ánh, yêu cầu, khiếu nại' },
  { slug: 'rights-obligations', title: 'Quyền và nghĩa vụ của các bên' },
] as const

export type PolicySlug = typeof policies[number]['slug']
export const policyContent: Record<PolicySlug, string> = content
