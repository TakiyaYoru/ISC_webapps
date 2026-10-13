# Instagram: giao diện riêng và API đọc bài viết

## Hiện trạng

Đã thay widget Elfsight bằng `InstagramGallery`, bỏ script tải widget, lớp che chân widget và đoạn can thiệp watermark. Toàn bộ nhãn do website quản lý là tiếng Việt.

Khi chưa có `VITE_INSTAGRAM_FEED_URL`, trang hiển thị **Bộ sưu tập sản phẩm**, dùng ảnh sản phẩm sẵn có và dẫn đến trang chi tiết sản phẩm. Đây không phải bài Instagram giả lập. Không hiển thị số người theo dõi, số bài hoặc tương tác khi chưa có dữ liệu thật.

Khi endpoint trả về bài viết hợp lệ, gallery chuyển sang **Bài viết từ Instagram**, ảnh dẫn đến bài gốc. Video dùng ảnh đại diện, bộ ảnh dùng ảnh bìa. Khi endpoint lỗi hoặc không có bài phù hợp, gallery trở về bộ sưu tập sản phẩm. Ảnh tải lỗi có phần thay thế mang nhận diện thương hiệu, không để ô đen.

## Cách nối dữ liệu thật

Luồng: `Instagram API → Supabase Edge Function → gallery React`.

Website hiện triển khai dạng static trên Render; token Instagram phải nằm trong môi trường máy chủ của Edge Function. Không đưa token vào `VITE_`, Git hoặc tin nhắn.

1. Xác nhận `@imperialskincare` là tài khoản Doanh nghiệp hoặc Người sáng tạo. Tạo/cấu hình ứng dụng Meta với **Instagram API with Instagram Login**, liên kết tài khoản sở hữu và cấp quyền đọc cần thiết (`instagram_business_basic`). Cấu hình quyền truy cập theo trạng thái ứng dụng/tài khoản trong Meta.
2. Lấy Instagram user ID, access token của tài khoản và phiên bản Graph API được Meta app hỗ trợ. Bản code chưa được gọi bằng token thật; khi kết nối, kiểm tra quyền và các trường media với phiên bản đã chọn.
3. Sao chép `supabase/instagram.env.example` thành `supabase/instagram.env.local`, điền các giá trị và đặt secrets:

   ```powershell
   supabase secrets set --project-ref YOUR_PROJECT_REF --env-file supabase/instagram.env.local
   supabase functions deploy instagram-feed --project-ref YOUR_PROJECT_REF
   ```

4. Thiết lập biến công khai tại Render:

   ```text
   VITE_INSTAGRAM_FEED_URL=https://YOUR_PROJECT_REF.supabase.co/functions/v1/instagram-feed
   ```

   Sau đó build/deploy lại website. Nếu kiểm tra tại máy, thêm `http://127.0.0.1:5173` vào `INSTAGRAM_ALLOWED_ORIGINS`, đặt endpoint trong `.env.local` và khởi động lại Vite.

5. Kiểm tra gallery có bài thật, ảnh đại diện video, liên kết bài gốc và không có token trong response/bundle. Khi token hết hạn hoặc quyền bị thu hồi, cấp/gia hạn token qua quy trình Meta rồi cập nhật secrets.

Endpoint là GET công khai, chỉ đọc bài của một tài khoản do máy chủ cấu hình; không cho khách truyền tài khoản hoặc token. Có timeout, gom request đồng thời, cache trong từng instance 10 phút và dùng bản gần nhất tối đa 1 giờ khi Meta tạm lỗi. Cache trong bộ nhớ không được bảo đảm tồn tại qua cold start. Header cho phép cache HTTP; đây không phải cơ chế lưu trữ đồng bộ bền vững.

## Kiểm tra

```powershell
npm run test:instagram
npm run build
```

Các test dùng dữ liệu và token giả: ảnh/video/bộ ảnh, đường dẫn không hợp lệ, cache, request đồng thời, token lỗi, hủy request, phản hồi lỗi và không lộ token. Kiểm tra trình duyệt có giao diện máy tính/điện thoại/máy tính bảng, API giả lập, ảnh lỗi và fallback khi nhận lỗi 503, HTML hoặc danh sách rỗng. Chưa xác nhận kết nối với tài khoản thật, chưa triển khai Edge Function.

## Tài liệu chính thức

- [Instagram Platform của Meta](https://developers.facebook.com/docs/instagram-platform/)
- [Bộ API Instagram do Meta phát hành trên Postman](https://www.postman.com/meta/workspace/instagram/documentation/23987686-9386f468-7714-490f-9bfc-9442db5c8f00)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
