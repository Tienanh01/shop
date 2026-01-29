# Sơ Đồ Tuần Tự RegisterPage

## 1. Sơ Đồ Luồng Khi Submit Form

```mermaid
sequenceDiagram
    participant User as Người Dùng
    participant Form as Form Component
    participant Validation as Kiểm Tra
    participant API as API Server
    participant Auth as AuthContext
    participant Router as React Router

    User->>Form: Điền form & Click Submit
    Form->>Validation: Kiểm tra password === confirm_password?
    alt Password không khớp
        Validation->>Form: Hiển thị lỗi
        Form->>User: "Mật khẩu không khớp"
    else Password khớp
        Validation->>Form: Hợp lệ
        Form->>Form: setLoading(true)
        Form->>API: POST /users/register
        
        alt Thành công
            API->>Form: Trả về token
            Form->>Auth: auth.login(token)
            Auth->>Auth: Lưu token vào context
            Form->>Form: setSuccess("Đăng ký thành công")
            Form->>Router: navigate('/') sau 7 giây
            Router->>User: Chuyển sang trang Home
        else Thất bại
            API->>Form: Lỗi 4xx/5xx
            Form->>Form: Bắt exception
            Form->>Form: setError(message)
            Form->>User: Hiển thị lỗi
        end
        
        Form->>Form: setLoading(false)
    end
```

## 2. Sơ Đồ Vòng Đời Component (Lifecycle)

```mermaid
graph TD
    A["Component Mount"] --> B["fetchRoles - useEffect"]
    B --> C["GET /roles/getlist"]
    C --> D["setRoles vào state"]
    D --> E["Render form với các role"]
    E --> F{Người dùng<br/>submit?}
    F -->|Có| G["handleSubmit được gọi"]
    G --> H["Validate password"]
    H --> I["POST /users/register"]
    I --> J{Thành công?}
    J -->|Có| K["auth.login token"]
    J -->|Không| L["Hiển thị lỗi"]
    K --> M["Redirect home"]
    L --> N["Vẫn ở trang register"]
    F -->|Không| E
```

## 3. Sơ Đồ State Management

```mermaid
graph LR
    A["formData<br/>(tất cả thông tin)"] -->|handleChange| B["Cập nhật state"]
    A -->|handleSubmit| C["Gửi lên server"]
    
    D["loading<br/>(false/true)"] -->|Khi submit| E["true: Disable button"]
    E -->|Sau submit| F["false: Enable button"]
    
    G["error<br/>(null/message)"] -->|Khi lỗi| H["Hiển thị thông báo lỗi"]
    
    I["success<br/>(null/message)"] -->|Khi thành công| J["Hiển thị thông báo & redirect"]
```

## 4. Chi Tiết Các Bước Chính

| Bước | Hành Động | State Thay Đổi |
|------|----------|----------------|
| 1 | Người dùng nhập form | `formData` cập nhật |
| 2 | Click Submit | `setError(null)`, `setSuccess(null)` |
| 3 | Kiểm tra password | Nếu sai → Lỗi & return |
| 4 | Gửi request | `loading = true` |
| 5 | API thành công | `auth.login(token)` → Redirect |
| 6 | API thất bại | `setError(message)` |
| 7 | Kết thúc | `loading = false` |

## 5. Danh Sách Các API Calls

```mermaid
graph LR
    A["Mount Component"] -->|GET /roles/getlist| B["Lấy danh sách roles"]
    B --> C["setRoles"]
    C --> D["Render dropdown"]
    
    E["Submit Form"] -->|POST /users/register| F["Đăng ký user"]
    F --> G{Có token?}
    G -->|Có| H["auth.login"]
    G -->|Không| I["Hiển thị success message"]
```

---

## Cách Sử Dụng Diagram Này

1. **Xem tại đây**: Mở file này trong VS Code với extension Markdown Preview Enhanced hoặc Markdown Preview
2. **Copy sang draw.io**: Vào https://mermaid.live, paste Mermaid code ở trên
3. **Các tool khác**:
   - **draw.io/Lucidchart**: Vẽ diagram tương tự bằng UI
   - **PlantUML**: Dùng language khác tương tự Mermaid
   - **Figma**: Vẽ theo style của bạn

Bạn có thể cài extension **Markdown Preview Enhanced** hoặc **Mermaid** trong VS Code để xem diagram ngay tại editor!
