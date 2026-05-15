## Flow custom component:

1. xem input có gì để khai báo kiểu dữ liệu (className, type, name ...)
2. sau đó tạo input gán kiểu dữ liệu vào
3. gọi component rồi truyền dữ liệu cho từng input

## Flow gọi API Login: 14-7-2025

1. gọi axios -> auth.api.ts
2. sau đó vào file layout Login, dùng useMuation of React Query
3. xử lý onSubmit thông qua handleSubmit
4. khi submit form, gọi mutation.mutate(data) để thực hiện login

## Flow xử lý đăng nhập:

1. Người dùng nhập form
2. Gọi axios → /auth/login
3. Nhận access_token
4. Lưu vào localStorage
5. Dùng token này gọi /users/profile
