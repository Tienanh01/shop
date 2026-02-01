// components/home/ProductSection.jsx
import { Row, Col, Typography } from "antd";
import ProductCard from "./ProductCard";

const { Title } = Typography;

  interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating?: number;
}

interface ProductSectionProps {
  title: string;
  products: Product[];
}

export default function ProductSection({ title, products }: ProductSectionProps) {
  return (
    <section>
      <Title level={4} style={{ marginBottom: 16 }}>
        {title}
      </Title>

      <Row gutter={[16, 16]}>
        {products.map((p) => (
          <Col key={p.id} xs={12} md={8} lg={6}>
            <ProductCard product={p} />
          </Col>
        ))}
      </Row>
    </section>
  );
}
