'use client';
import React from 'react';
import { Button } from 'antd';

// giao dien chinh trang bán thẻ điên thoại
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
function Home ()  {
    const router = useRouter();
    
    useEffect(() => {
        // Chuyển hướng đến trang /product
        router.push('/product');
    }, [router]);
    
    return (
        <div style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
        <h1>Trang chủ</h1>
        <p>Chào mừng bạn đến với trang chủ của chúng tôi!</p>
        <Button type="primary" onClick={() => router.push('/product')}>
            Xem sản phẩm
        </Button>
        </div>
    );

}
