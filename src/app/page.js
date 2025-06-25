'use client';
import React from 'react';
import { Layout, Menu } from 'antd';
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useEffect,useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button, Card  } from "flowbite-react";
import { Col, Row } from 'antd';


const { Header, Content, Sider, Footer } = Layout;

const MainLayout = () => {
  
 const [cardPrices, setCardPrices] = useState([]); // State để lưu dữ liệu
  const router = useRouter(); // Khởi tạo router

  // Lấy dữ liệu khi component mount
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/get_card_prices');
      console.log('API data:', response.data); // Thêm dòng này
      setCardPrices(response.data || []);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
      setCardPrices([]);
    }
  };
  fetchData();
}, []);
  const sidebarItems = [
    {
      key: 'phone',
      icon: <UserOutlined />,
      label: 'Phone',
      onClick: () => router.push('/cardmobile'),
    },
    {
      key: 'game',
      icon: <LaptopOutlined />,
      label: 'Game',
      onClick: () => router.push('/game'),
    },
    {
      key: 'billing',
      icon: <NotificationOutlined />,
      label: 'Billing',
      onClick: () => router.push('/billing'),
    },
  ];

  return (
    <Layout>
      <Header style={{ position: 'sticky', top: 0, zIndex: 1 }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={[
            { key: 'home', label: 'Trang chủ', onClick: () => router.push('/') },
          ]}
        />
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            style={{ height: '100%' }}
            items={sidebarItems}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content style={{ padding: 24, height: '100vh', overflowY: 'auto' }}>
                    <h1>Card Prices</h1>
                    <Row gutter={[16, 16]}>
                      {       cardPrices.map((card) => (
                <Col key={card.id} xs={20} sm={12} md={8}>
                  <Card className="max-w-sm">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white" style={{ color: 'white' }}>
                     {card.Name} - {card.price} VND
                    </h5>
                    <Button>
                      <Link href={`/cardmobile/${card.id}`} className="text-white" style={{ textDecoration: 'none' , color: 'white' }}>
                        Mua ngay
                     </Link>
                    </Button>
                  </Card>
               </Col>
             ))}
           </Row>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
