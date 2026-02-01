// components/home/ProductCard.jsx
import { Card, Typography, Rate, Space, Button } from "antd";
import { HeartOutlined } from "@ant-design/icons";

const { Text } = Typography;

  interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating?: number;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card
      hoverable
      cover={
        <div style={{ height: 150, display: "flex", alignItems: "center", justifyContent: "center", background: "#fafafa" }}>
          <img src={product.image} alt={product.name} style={{ maxHeight: "100%", maxWidth: "100%" }} />
        </div>
      }
      actions={[
        <Button key="wish" type="text" icon={<HeartOutlined />} />,
      ]}
    >
      <Space direction="vertical" size={6} style={{ width: "100%" }}>
        <Text strong>{product.name}</Text>
        <Text type="secondary">From ${product.price}</Text>
        <Rate disabled value={product.rating} />
      </Space>
    </Card>
  );
}
