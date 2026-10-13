# Rà soát các mục còn lại — 13/10/2026

Phạm vi: kiểm tra khả năng xử lý các mục còn lại. Không sửa thông tin sản phẩm, giá/VAT hoặc phương thức/tích hợp thanh toán. Đợt rà này không thay đổi code vận hành hay triển khai lên hệ thống thật.

| Mục | Kết quả kiểm tra | Có thể xử lý từ source | Phần cần xác nhận bên ngoài |
| --- | --- | --- | --- |
| Thông tin pháp nhân | Đã có đủ thông tin Agency gửi, dùng chung ở chân trang và liên hệ | Đồng bộ hiển thị đã làm | Giấy đăng ký doanh nghiệp để xác nhận ngày và cơ quan cấp; chưa xác minh được từ kết quả tra cứu công khai chính thức |
| Chính sách mô tả quy trình | Mẫu quyền/nghĩa vụ ghi CCCD, email xác nhận và nút hủy, trong khi luồng hiện tại không có đủ các chức năng này | Có thể sửa mô tả theo chức năng đang vận hành; dùng điện thoại/email để tiếp nhận yêu cầu hủy, không tự thêm yêu cầu CCCD | Agency rà lại bản chỉnh sửa; nếu muốn email tự động thì cần dịch vụ gửi email và xác thực tên miền |
| Giao nhận/đổi trả | Mẫu giao nhận loại trừ khiếu nại sau ký nhận, mẫu đổi trả cho phản hồi 24 giờ | Có thể dẫn từ giao nhận sang chính sách kiểm hàng/đổi trả và bỏ câu mâu thuẫn | Công ty/Agency chốt thời hạn, điều kiện đổi trả áp dụng thực tế |
| Cam kết bảo mật | Nhiều tuyên bố kỹ thuật trong mẫu chưa có bằng chứng trong repo | Có thể sửa nội dung không khớp và triển khai xác thực/phân quyền thật | Cần cấu hình Supabase và kiểm tra quyền/cấu hình thật, thông tin vận hành hạ tầng; sửa câu chữ không thay thế triển khai bảo mật |
| Instagram | Gallery riêng, handler API, test đã có; chưa kết nối tài khoản Meta | Giao diện hiện tại dùng ảnh sản phẩm được; phần API đã chuẩn bị | Tài khoản chuyên nghiệp, Meta app, quyền đọc và token máy chủ để lấy bài thật; mục này không nằm trong danh sách yêu cầu Agency đã gửi |
| Lint | 16 lỗi có sẵn, chưa phát sinh lỗi mới qua các đợt sửa | Có thể sửa lỗi kiểu dữ liệu, vòng đời state và cấu trúc context | Không cần hồ sơ công ty; cần kiểm tra hành vi sau sửa |
| Ghi nhận dữ liệu | Có nhánh báo thành công dù ghi DB lỗi hoặc chưa cấu hình | Có thể sửa để đợi kết quả ghi thật, báo lỗi và giữ dữ liệu để gửi lại | Cần cấu hình Supabase hoặc backend để kiểm tra lưu thật |
| Push/deploy | Repo có remote GitHub và cấu hình static Render; source đã build được | Có thể chuẩn bị commit/PR và bản build | Chưa xác minh quyền ghi GitHub, quyền/cấu hình dịch vụ Render hoặc việc auto-deploy; chưa thực hiện push/deploy |
| Khảo sát lại | Chưa có bản mới trên website chính thức | Có thể chuẩn bị nội dung báo Agency | Cần triển khai và kiểm tra web thật trước; chủ website gửi hoặc cho phép gửi liên hệ Agency |

## Phát hiện kỹ thuật có căn cứ từ source

- `src/services/api.ts`: các nhánh `contact.submit` và `orders.create` bắt lỗi Supabase nhưng vẫn trả `success: true`.
- `src/components/CartDrawer.tsx`: nhánh COD gửi dữ liệu không chờ kết quả, hiển thị thành công và xóa giỏ sau bộ đếm thời gian. Đây là lỗi ghi nhận đơn; không phải yêu cầu thay đổi phương thức thanh toán.
- `src/pages/Contact.tsx`: đặt trạng thái thành công trong `finally`, kể cả khi API lỗi.
- `src/context/UserContext.tsx`: tài khoản và đơn lưu trong `localStorage`; luồng đăng nhập là mô phỏng.
- `src/pages/AdminDashboard.tsx`: cửa quản trị được kiểm tra trong trình duyệt và lưu trạng thái ở `sessionStorage`, không xác thực quản trị phía máy chủ.
- `supabase_schema.sql`: các policy có tên "admin" thực tế cho tất cả người dùng có role `authenticated` truy cập quản lý. Cần phân biệt quản trị thật với tài khoản khách hàng. Chưa xác nhận production đang áp dụng đúng schema này.
- Workspace hiện chỉ có `.env.example`, không có cấu hình kết nối thật tại máy. Điều này không cho biết môi trường production đang cấu hình thế nào.

## Thứ tự đề xuất, ngoài ba mục tạm gác

1. Chỉnh bản chính sách theo hoạt động thực tế, lưu rõ thay đổi để Agency rà lại.
2. Sửa báo thành công sai ở form liên hệ/lưu đơn, rồi xử lý lint và kiểm tra hành vi.
3. Kiểm tra hoặc triển khai xác thực, phân quyền và lưu dữ liệu thật trước khi công bố các cam kết bảo mật.
4. Đối chiếu hồ sơ công ty và xác nhận hạ tầng/quyền triển khai.
5. Đưa bản đã chốt lên website, kiểm tra rồi báo Agency khảo sát lại.

Instagram tự cập nhật có thể hoàn thiện sau khi kết nối Meta; gallery riêng hiện tại vẫn dùng được.
