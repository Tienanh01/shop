import { Card, Typography, Space } from "antd";

const { Title, Text } = Typography;

  interface CategoryItem {
  title: string;
  items: string[];
}

export default function CategoryCard({ item }: { item: CategoryItem }) {
  return (
    <Card
      hoverable
      style={{
        borderRadius: 12,
        height: "100%",
      }}
      bodyStyle={{ padding: 16 }}
      onClick={() => {
        // sau này navigate sang category
        console.log("Go to category:", item.title);
      }}
    >
      <Space direction="vertical" size={8} style={{ width: "100%" }}>
        {/* Title */}
        <Title level={5} style={{ margin: 0 }}>
          {item.title}
        </Title>

        {/* Items preview */}
        <Space size="large">
          {item.items.map((name, idx) => (
            <div key={idx} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 8,
                  background: "#f5f5f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 4,
                }}
              >
                {/* placeholder image */}
                <Text type="secondary">{name[0]}</Text>
              </div>

              <Text style={{ fontSize: 12 }} type="secondary">
                {name}
              </Text>
            </div>
          ))}
        </Space>
      </Space>
    </Card>
  );
}
