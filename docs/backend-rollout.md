# Kết nối ISC_backend — 13/10/2026

Repo backend: https://github.com/TakiyaYoru/ISC_backend (private), branch main.
Frontend đã được fast-forward lên main và deploy Render sau khi kiểm thử. Branch `codex/agency-website-updates` lưu cùng phần thay đổi để theo dõi.

## Trạng thái triển khai

- Backend đã Live: `https://isc-backend-g4b3.onrender.com`, Render service `srv-db6ufl3ncjis73etb8ng`, region Singapore, gói Free dùng kiểm thử.
- Website `https://imperialskincare.vn` đã deploy bản mới; bundle có đúng URL API và khóa publishable, không có khóa server. CORS cho domain website trả đúng; health/readiness 200, products 200 với 7 sản phẩm, admin không đăng nhập trả 401.
- Khóa server hiện có đã được chủ project cho phép lưu trong môi trường Render, không vào GitHub hoặc frontend.
- Email dự kiến quản trị: `duykhafoot@gmail.com`. Còn bước chủ tài khoản tự đặt mật khẩu, tạo tài khoản và cấp đúng UUID vào bảng admin. Chưa gửi email mời hoặc nhập mật khẩu thay chủ tài khoản.
- Sau khi chủ website xác nhận gửi một đơn kiểm thử và đồng ý điều kiện giao dịch, đã kiểm thử production với đơn `ISC274DC7B161104A44854A`, 11.200.000 VNĐ, dùng thông tin liên hệ công khai của công ty. Supabase có đúng một bản ghi; payment_status=pending, status=processing. Tên và ghi chú đều ghi rõ KIỂM THỬ – KHÔNG GIAO HÀNG. QR đã giải mã kiểm tra đúng ngân hàng, tài khoản, số tiền, mã đơn và CRC; trang chuyển khoản mở lại được sau reload. Không chuyển tiền hoặc xác nhận đã thanh toán. Đơn kiểm thử được giữ lại để chủ website xem, chưa hủy/xóa.
- Checkout đã sửa khác biệt validation FE/BE: nhận số điện thoại có dấu cách/dấu chấm và mã 84/+84, kiểm tra trường nhập trước khi gửi, thông báo rõ trường sai. Backend hiện có 11 kiểm thử đạt; FE build/lint đạt.

## Đã thực hiện

- Backend sản phẩm, đặt đơn, liên hệ, tài khoản và quản trị; kiểm tra danh tính Supabase Auth trên server.
- Database project hiện có: `poueqhpkzkqruxakkqvp`. Đã áp dụng `001_commerce.sql` và `002_products.sql` qua SQL Editor; 6 bảng `isc_*` đều bật RLS. Giữ nguyên Storage và giá catalog hiện tại.
- Checkout gửi slug/số lượng, địa chỉ, phương thức, phiên bản điều kiện, tổng tiền khách đang nhìn thấy và idempotency key. Database tính lại giá, sinh mã; QR lấy tổng/mã từ phản hồi server.
- Trả lại giỏ với giá mới khi giá thay đổi, yêu cầu khách đồng ý lại. Mất phản hồi sau khi lưu có thể thử lại cùng key để nhận lại đơn cũ.
- Đăng nhập demo, đơn mẫu, điểm thưởng tự cộng và mã quản trị frontend đã được thay bằng dữ liệu/auth thật. Tài khoản đã được tạo trong Supabase có thể đăng nhập; mua hàng vẫn cho phép khách vãng lai.
- Liên hệ không báo thành công khi lưu thất bại; không lưu dữ liệu liên hệ demo vào localStorage.
- Build/lint FE đạt; 11 kiểm thử Instagram đạt. Backend 10 kiểm thử đạt và npm audit không phát hiện lỗ hổng trong bộ dependency mới. Kiểm tra FE -> Fastify -> Postgres/PGlite tại máy đạt, gồm QR/mobile/reload và retry mất phản hồi. Không gửi đơn kiểm thử hoặc tiền vào production.

## Cấu hình vận hành và phần còn lại

- Render Web Service dùng Node 24.16.0, build `npm ci && npm run build`, start `npm start`, health `/health/ready`, region Singapore.
- Khóa server Supabase trong biến `SUPABASE_SERVICE_ROLE_KEY` của Render; tuyệt đối không có khóa này trong FE/GitHub.
- Cần tạo/mời tài khoản quản trị và cấp đúng UUID trong `isc_admin_users`; chủ tài khoản tự đặt mật khẩu.
- FE production đã có URL API Render thật trong `VITE_API_URL`, URL Supabase hiện có và publishable key trong `VITE_SUPABASE_ANON_KEY`. Với máy phát triển riêng, cấu hình `.env.local` và backend local như README; không mặc định gửi đơn thử vào database production. Khi chưa có VITE_API_URL, catalog có thể xem bằng nội dung có sẵn nhưng ghi đơn/liên hệ báo chưa cấu hình, không giả thành công.
- Chưa chọn gói trả phí. Render Free có thể ngủ sau thời gian không truy cập; cần thống nhất gói vận hành thật.
- VAT, phí giao hàng và quy trình hoàn tiền/đối soát thực tế vẫn theo quyết định riêng của chủ website; backend chưa tự đặt thuế hoặc cộng phí vận chuyển.

Hướng dẫn chi tiết ở README của ISC_backend. Không chạy `supabase_schema.sql` cũ cho phương án mới.
