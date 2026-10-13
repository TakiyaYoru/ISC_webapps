# Cập nhật website theo yêu cầu Agency — 13/10/2026

## Phần đã triển khai trong source

- Thông tin pháp nhân tại chân trang, xuất hiện trên trang chủ và các trang công khai; dùng cùng dữ liệu tại trang liên hệ.
- Giao diện công khai, nội dung bài viết đang dùng và thẻ mô tả website bằng tiếng Việt. Giữ nguyên tên thương hiệu, tên sản phẩm và INCI.
- Ô đồng ý điều kiện giao dịch ở giỏ hàng và bước xác nhận; mặc định chưa tích. Kiểm tra trước khi chuyển bước và trước khi xử lý tất cả phương thức thanh toán. Liên kết mở tab riêng để giữ thông tin đang nhập. Thời điểm đồng ý được ghi kèm ghi chú đặt hàng.
- Tám trang chính sách có đường dẫn riêng, danh mục điều hướng và liên kết ở chân trang. Giữ các đường dẫn bảo mật, đổi trả và quy định chung đã có.
- Bản văn bản Agency được lưu tại `docs/agency-policies/`. Nội dung hiển thị tại `src/data/policyContent.json`, danh mục tại `src/data/policies.ts`. Chỉ xử lý chỗ trống tên website và chỉ dẫn liên kết trong bản mẫu; chưa tự thay đổi các điều khoản cần xác nhận.

## Nội dung cần chốt trước khi đưa bản này lên website chính thức

1. **Thanh toán:** bản mẫu thanh toán liệt kê trực tiếp tại văn phòng, COD, MoMo và VNPAY; quy định chung liệt kê chuyển khoản và thẻ. Hướng dẫn mua hàng có sẵn cũng đề cập chuyển khoản/thẻ. MoMo/VNPAY trong source vẫn là cổng mô phỏng. Chưa tích hợp thanh toán thật trong đợt này. Khi Agency xác nhận, cập nhật đồng thời chính sách thanh toán, quy định chung, hướng dẫn mua hàng và giao diện chọn phương thức.
2. **Hồ sơ công ty:** thông tin MST, ngày cấp và tên cơ quan cấp đang dùng đúng bản Agency cung cấp; cần đối chiếu giấy chứng nhận.
3. **Vận hành được mô tả trong mẫu:** quyền và nghĩa vụ đề cập thu CCCD, gửi email xác nhận đơn và nút hủy đơn. Chưa bổ sung những chức năng này trong đợt sửa bốn mục; cần sửa nội dung hoặc xác nhận triển khai sau.
4. **Cam kết bảo mật:** mẫu đề cập mã hóa toàn bộ dữ liệu, trung tâm dữ liệu an toàn cấp 1, tường lửa, chống mã độc và nhật ký truy cập. Chưa có đủ bằng chứng kỹ thuật để xác nhận các nội dung này.
5. **Giao nhận/đổi trả:** bản giao nhận loại trừ khiếu nại sau khi ký nhận, còn bản đổi trả cho phép phản hồi trong 24 giờ; cần thống nhất. Mẫu điều kiện cung cấp ghi mọi độ tuổi, cần đối chiếu hướng dẫn sử dụng của từng mỹ phẩm.
6. **Nội dung bài viết:** các tuyên bố nghiên cứu và số liệu có sẵn đã được dịch, chưa xác minh hồ sơ nghiên cứu. Không thêm dữ liệu công dụng hoặc xuất xứ mới.
7. **Dữ liệu sản phẩm/VAT:** chưa bổ sung nguồn gốc, xuất xứ, hạn sử dụng chưa mở nắp hoặc thuế suất khi chưa có hồ sơ và xác nhận của công ty.

## Kiểm tra

- `npm run build`: thành công.
- Kiểm tra trình duyệt máy tính và màn hình 390 px: thông tin pháp nhân; tám chính sách; liên kết chính sách; bộ lọc tiếng Việt; bài viết tiếng Việt; bố cục không tràn ngang.
- Kiểm tra đồng ý giao dịch: chặn chuyển bước khi chưa tích, mở quy định chung bằng tab mới, không tự tích khi đọc, bỏ tích sẽ chặn cả ba phương thức, đóng giỏ hàng sẽ bỏ lựa chọn. Đơn COD kiểm thử dùng hàm nhận đơn giả lập tại máy để không gửi đơn kiểm thử lên hệ thống thật.
- ESLint hiện có 16 lỗi, cùng số lượng và nhóm lỗi trên commit gốc; không thêm lỗi lint trong phần thay đổi.

Bản này được sửa và kiểm tra tại máy, chưa đẩy lên GitHub hoặc triển khai website chính thức. Các chính sách là bản để rà soát theo tài liệu Agency, chưa được xác nhận là hồ sơ đã đủ điều kiện duyệt.
