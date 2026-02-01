import { Layout, Row, Col, Typography, Input, Button, Space } from 'antd'
import {
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled,
  YoutubeFilled,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  SendOutlined,
} from '@ant-design/icons'

const { Footer } = Layout
const { Title, Text, Link } = Typography

export default function AppFooter() {
  return (
    <Footer style={{ background: '#0b1220', color: '#cbd5e1' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Row gutter={[32, 32]}>
          {/* Brand */}
          <Col xs={24} md={12} lg={6}>
            <Title level={5} style={{ color: '#fff' }}>
              SS-ECOMMERCE
            </Title>
            <Text type="secondary">
              Discover high-quality, handcrafted products at NexsyMart. Shop
              with confidence and enjoy premium selections tailored just for you.
            </Text>

            <Space direction="vertical" style={{ marginTop: 16 }}>
              <Text><EnvironmentOutlined /> 123 Commerce Street, 10001</Text>
              <Text><PhoneOutlined /> +1 (555) 123-4567</Text>
              <Text><MailOutlined /> support@nexsymart.com</Text>
            </Space>
          </Col>

          {/* Shop */}
          <Col xs={12} md={6} lg={4}>
            <Title level={5} style={{ color: '#fff' }}>Shop</Title>
            <Space direction="vertical">
              <Link>New Arrivals</Link>
              <Link>Best Sellers</Link>
              <Link>Featured Products</Link>
              <Link>Collections</Link>
              <Link>Gift Cards</Link>
              <Link>Sale & Clearance</Link>
            </Space>
          </Col>

          {/* Company */}
          <Col xs={12} md={6} lg={4}>
            <Title level={5} style={{ color: '#fff' }}>Company</Title>
            <Space direction="vertical">
              <Link>About Us</Link>
              <Link>Our Story</Link>
              <Link>Sustainability</Link>
              <Link>Careers</Link>
              <Link>Press & Media</Link>
              <Link>Partner With Us</Link>
            </Space>
          </Col>

          {/* Customer Service */}
          <Col xs={12} md={6} lg={4}>
            <Title level={5} style={{ color: '#fff' }}>Customer Service</Title>
            <Space direction="vertical">
              <Link>Help Center</Link>
              <Link>Shipping Information</Link>
              <Link>Returns & Exchanges</Link>
              <Link>Order Tracking</Link>
              <Link>Size Guide</Link>
              <Link>Contact Support</Link>
            </Space>
          </Col>

          {/* Newsletter */}
          <Col xs={24} md={12} lg={6}>
            <Title level={5} style={{ color: '#fff' }}>
              Stay Updated
            </Title>
            <Text type="secondary">
              Subscribe to get exclusive offers and updates.
            </Text>

            <Input.Group compact style={{ marginTop: 12 }}>
              <Input
                style={{ width: 'calc(100% - 40px)' }}
                placeholder="Your email address"
              />
              <Button type="primary" icon={<SendOutlined />} />
            </Input.Group>

            <Space size="middle" style={{ marginTop: 16 }}>
              <FacebookFilled style={{ fontSize: 20 }} />
              <TwitterSquareFilled style={{ fontSize: 20 }} />
              <InstagramFilled style={{ fontSize: 20 }} />
              <YoutubeFilled style={{ fontSize: 20 }} />
            </Space>
          </Col>
        </Row>

        {/* Bottom bar */}
        <Row
          justify="space-between"
          align="middle"
          style={{
            borderTop: '1px solid #1e293b',
            marginTop: 32,
            paddingTop: 16,
          }}
        >
          <Text type="secondary">
            © {new Date().getFullYear()} NexsyMart. All rights reserved.
          </Text>

          <Space>
            <Link>Terms</Link>
            <Link>Privacy</Link>
            <Link>Cookies</Link>
          </Space>
        </Row>
      </div>
    </Footer>
  )
}
