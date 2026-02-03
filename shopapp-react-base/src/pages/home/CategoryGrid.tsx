import { Row, Col } from "antd";
import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import axiosClient from "../../api/axiosClient";

interface ApiCategory {
  id: number;
  name: string;
  imageUrl: string;
  group: number;
}

interface CategoryPreviewItem {
  name: string;
  imageUrl: string;
}

interface CategoryUI {
  id: number;
  title: string;
  items: CategoryPreviewItem[];
}

const GROUP_TITLE_MAP: Record<number, string> = {
  1: "Get your game on",
  2: "Shop deals in Fashion",
  3: "Gaming accessories",
  4: "Home essentials",
};

export default function CategoryGrid() {
  const [categories, setCategories] = useState<CategoryUI[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosClient.get<ApiCategory[]>(
          "/categories?page=1&limit=100"
        );

        const data = res.data;

        // group theo group
        const grouped: Record<number, CategoryPreviewItem[]> = {};

        data.forEach((c) => {
          if (!grouped[c.group]) {
            grouped[c.group] = [];
          }

          grouped[c.group].push({
            name: c.name,
            imageUrl: c.imageUrl,
          });
        });

        // transform sang UI format
        const uiData: CategoryUI[] = Object.keys(grouped).map((groupId) => ({
          id: Number(groupId),
          title: GROUP_TITLE_MAP[Number(groupId)],
          items: grouped[Number(groupId)].slice(0, 2), // optional: chỉ lấy 2 item
        }));

        setCategories(uiData);
      } catch (error) {
        console.error("Fetch categories failed", error);
      }
    };

    fetchCategories();
  }, []);

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
