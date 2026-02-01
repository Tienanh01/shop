import React from 'react';
import { Button, Space, Typography, Flex } from 'antd';
import { 
  ExportOutlined, 
  ClockCircleOutlined, 
  GiftOutlined, 
  CarOutlined 
} from '@ant-design/icons';

const { Text } = Typography;

const TopBar = () => {
  return (
    <div
      style={{
        backgroundColor: '#001529', // Màu nền tối đặc trưng (hoặc tùy chỉnh)
        color: '#fff',
        padding: '14px 32px',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      <Flex justify="space-between" align="center" wrap="wrap" gap="small">
        
        {/* Nút bên trái */}
        <Button 
          type="primary" 
          href="/shop" 
          icon={<ExportOutlined />}
          size="small" // Topbar thường dùng nút nhỏ
        >
          Shop Now
        </Button>

        {/* Thông tin bên phải */}
        <Space size="large" wrap style={{ fontSize: '12px' }}>
          
          <Space>
            <ClockCircleOutlined style={{ color: '#1890ff' }} />
            <Text style={{ color: '#fff' }}>Same Day Dispatch Before 2PM</Text>
          </Space>

          <Space>
            <GiftOutlined style={{ color: '#eb2f96' }} />
            <Text style={{ color: '#fff' }}>Gift Cards Available</Text>
          </Space>

          <Space>
            <CarOutlined style={{ color: '#52c41a' }} /> {/* CarOutlined thay cho Truck */}
            <Text style={{ color: '#fff' }}>Free Shipping on Orders $50+</Text>
          </Space>

        </Space>

      </Flex>
    </div>
  );
};

export default TopBar;