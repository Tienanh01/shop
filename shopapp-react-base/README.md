# ShopApp React Base

Skeleton frontend project cho web bán hàng (React + Vite + TypeScript) dùng để gọi API từ Spring Boot.

## Yêu cầu

- Node.js >= 16.0.0
- npm >= 8

## Cài đặt

```bash
npm install
npm run dev
```

Mặc định chạy ở: http://localhost:5173

## Cấu trúc chính

- \`src/api\`: cấu hình axios, file gọi API.
- \`src/components\`: layout, common component, component cho shop.
- \`src/pages\`: các trang (Home, Login, ProductList, Cart, Admin...).
- \`src/routes\`: khai báo router, PrivateRoute.
- \`src/context\`: quản lý Auth, Cart...
- \`src/utils\`: hàm tiện ích (localStorage, format tiền, v.v.).
- \`src/styles\`: css global.

Hiện tại chỉ là base tối thiểu để chạy, bạn tự bổ sung logic, UI và các page khác.