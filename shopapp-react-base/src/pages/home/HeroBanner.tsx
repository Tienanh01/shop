// components/home/HeroBanner.jsx
import { Typography } from "antd";

const { Title } = Typography;

export default function HeroBanner() {
  return (
    <div
      style={{
        borderRadius: 12,
        overflow: "hidden",
        height: 300,
        backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7IuYKWLZcswxChZ1aA6nI9z9mrV7iwYAIeQ&s')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.15)" }} />
      <Title level={2} style={{ position: "relative", color: "#111", textAlign: "center", paddingTop: 18 }}>
        New arrivals in Toys
      </Title>
    </div>
  );
}
