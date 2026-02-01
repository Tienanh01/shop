// components/home/CategoryGrid.jsx
import { Row, Col } from "antd";
import CategoryCard from "./CategoryCard";
  
 const categories = [
  { id: 1, title: "Get your game on", items: ["Gaming Headp...", "Keyboard"] },
  { id: 2, title: "Shop deals in Fashion", items: ["Blue Shirt", "Smart Watch"] },
  { id: 3, title: "Gaming accessories", items: ["Pro Headsets", "Wireless Earbu..."] },
  { id: 4, title: "Home essentials", items: ["Kitchen", "Decor"] },
];

export default function CategoryGrid() {
  return (
    <Row gutter={[16, 16]} style={{ marginTop: -40 }}>
      {categories.map((c) => (
        <Col key={c.id} xs={24} md={12} lg={6}>
          <CategoryCard item={c} />
        </Col>
      ))}
    </Row>
  );
}
