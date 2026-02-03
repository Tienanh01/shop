import { Card, Typography, Space } from "antd";

const { Title, Text } = Typography;

interface CategoryPreviewItem {
  name: string;
  imageUrl: string;
}

interface CategoryItem {
  title: string;
  items: CategoryPreviewItem[];
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
          {item.items.map((item, idx) => (
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
                  overflow: "hidden",
                }}
              >
                <img
                  src={`http://10.2.22.63:8188${item.imageUrl}`}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <Text style={{ fontSize: 12 }} type="secondary">
                {item.name}
              </Text>
            </div>
          ))}
        </Space>
      </Space>
    </Card>
  );
}
