# Kết nối ISC_backend — 13/10/2026

Repo backend: https://github.com/TakiyaYoru/ISC_backend (private), branch main.
Frontend giữ branch `codex/agency-website-updates` để kiểm tra trước khi đưa lên main/Render.

## Đã thực hiện

- Backend sản phẩm, đặt đơn, liên hệ, tài khoản và quản trị; kiểm tra danh tính Supabase Auth trên server.
- Database project hiện có: `poueqhpkzkqruxakkqvp`. Đã áp dụng `001_commerce.sql` và `002_products.sql` qua SQL Editor; 6 bảng `isc_*` đều bật RLS. Giữ nguyên Storage và giá catalog hiện tại.
- Checkout gửi slug/số lượng, địa chỉ, phương thức, phiên bản điều kiện, tổng tiền khách đang nhìn thấy và idempotency key. Database tính lại giá, sinh mã; QR lấy tổng/mã từ phản hồi server.
- Trả lại giỏ với giá mới khi giá thay đổi, yêu cầu khách đồng ý lại. Mất phản hồi sau khi lưu có thể thử lại cùng key để nhận lại đơn cũ.
- Đăng nhập demo, đơn mẫu, điểm thưởng tự cộng và mã quản trị frontend đã được thay bằng dữ liệu/auth thật. Tài khoản đã được tạo trong Supabase có thể đăng nhập; mua hàng vẫn cho phép khách vãng lai.
- Liên hệ không báo thành công khi lưu thất bại; không lưu dữ liệu liên hệ demo vào localStorage.
- Build/lint FE đạt; 11 kiểm thử Instagram đạt. Backend 10 kiểm thử đạt và npm audit không phát hiện lỗ hổng trong bộ dependency mới. Kiểm tra FE -> Fastify -> Postgres/PGlite tại máy đạt, gồm QR/mobile/reload và retry mất phản hồi. Không gửi đơn kiểm thử hoặc tiền vào production.

## Cần hoàn tất khi triển khai

- Render Web Service đang được chuẩn bị cho repo ISC_backend: Node 24.16.0, build `npm ci && npm run build`, start `npm start`, health `/health/ready`, region Singapore.
- Cần khóa server Supabase trong biến `SUPABASE_SERVICE_ROLE_KEY` của Render; tuyệt đối không có khóa này trong FE/GitHub. Chuyển khóa sang Render là cấp ứng dụng backend quyền database, cần chủ project xác nhận.
- Cần tạo/mời tài khoản quản trị và cấp đúng UUID trong `isc_admin_users`; chủ tài khoản tự đặt mật khẩu.
- FE cần URL API Render thật trong `VITE_API_URL`, URL Supabase hiện có và publishable/anon key trong `VITE_SUPABASE_ANON_KEY`; rebuild FE sau cấu hình. Khi chưa có VITE_API_URL, catalog có thể xem bằng nội dung có sẵn nhưng ghi đơn/liên hệ báo chưa cấu hình, không giả thành công.
- Chưa triển khai production hoặc tự chọn gói trả phí. Render Free có thể ngủ sau thời gian không truy cập; cần thống nhất gói vận hành thật.
- VAT, phí giao hàng và quy trình hoàn tiền/đối soát thực tế vẫn theo quyết định riêng của chủ website; backend chưa tự đặt thuế hoặc cộng phí vận chuyển.

Hướng dẫn chi tiết ở README của ISC_backend. Không chạy `supabase_schema.sql` cũ cho phương án mới.
