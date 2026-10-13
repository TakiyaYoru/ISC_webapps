# Chuyển khoản ngân hàng — 13/10/2026

Đã đối chiếu ảnh QR do chủ website cung cấp bằng giải mã tại máy: Vietcombank (BIN 970436), tài khoản 0421000545898, tên hiển thị CONG TY CO PHAN IMPERIAL CARE, VCB Hùng Vương – PGD Đầm Sen.

QR theo đơn được tạo tại trình duyệt, không gửi tài khoản/số tiền/mã đơn sang dịch vụ tạo ảnh QR bên ngoài. Dùng cấu trúc tài khoản và dịch vụ QRIBFTTA của QR gốc, bổ sung số tiền theo đơn, nội dung chuyển khoản là mã đơn và tính lại CRC. Đã giải mã QR tạo ra để kiểm tra đúng ngân hàng, tài khoản, số tiền, nội dung và CRC; CRC của payload gốc khớp 77A3. Chưa thực hiện giao dịch ngân hàng thật.

Checkout hỗ trợ COD và chuyển khoản. MoMo/VNPAY demo đã bỏ khỏi lựa chọn và route cổng demo chuyển về chính sách thanh toán. Dữ liệu lịch sử cũ vẫn đọc được. Thông tin chuyển khoản có thể mở lại tại `/payment/bank-transfer` trên trình duyệt đặt đơn.

Chỉ hiển thị QR sau khi API ghi nhận đơn thành công. Khi lưu dữ liệu thất bại, không xóa giỏ hoặc báo thành công. Đơn chuyển khoản ghi chú CHỜ XÁC NHẬN THANH TOÁN; quét QR không tự chuyển trạng thái đã thanh toán. Đối soát tiền vào tài khoản do công ty thực hiện, chưa có webhook ngân hàng hoặc xác nhận tự động.

Chính sách thanh toán, mục phương thức trong quy định chung và phần giới thiệu hướng dẫn mua hàng đã đồng bộ COD/chuyển khoản. Đây là triển khai theo phương án Agency hướng dẫn, không phải cam kết hồ sơ chắc chắn được duyệt.

Build và kiểm tra trình duyệt đạt: tick điều kiện, ẩn phương thức demo, lỗi lưu giữ dữ liệu, QR khớp, trạng thái chờ xác nhận, mở lại sau tải trang và không tràn ngang trên điện thoại. Test nhận đơn dùng mock tại máy, không gửi đơn kiểm thử vào hệ thống thật.

Ngày 13/10/2026 đã triển khai ISC_backend trên Render và cấu hình kết nối cho frontend production; database Supabase hiện có đã có các bảng commerce và dữ liệu sản phẩm. Checkout lấy mã đơn/tổng tiền từ server, không tự sinh mã hoặc tin giá frontend. Chuyển khoản vẫn chờ đối soát thủ công; chưa kiểm thử giao dịch tiền thật. Không đưa khóa server vào frontend. Cấu hình và phần còn lại ở `docs/backend-rollout.md`.
