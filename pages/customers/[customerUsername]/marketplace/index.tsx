import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';

import ProductsOverview from '../../../../components/customers/marketplace/ProductsOverview';
import ProductService from '../../../../services/ProductService';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Product } from '../../../../types';
import { useRouter } from 'next/router';

const Sales: React.FC = () => {
    const [products, setProducts] = useState<Product[]>();
    const router = useRouter();

    const customerUsername = router.query.customerUsername as string;

    const getOtherProducts = async () => {
        const response = await ProductService.getProductsOf(customerUsername, false);
        const data = await response.json();

        if (response.status === 200) {
            setProducts(data.products);
        }
    };
    useEffect(() => {
        if (router.isReady) {
            const sessionCustomer = JSON.parse(sessionStorage.getItem('user'));
            const customerUsername = router.query.customerUsername as string;

            if (!sessionCustomer) {
                router.push('/');
            } else if (customerUsername !== sessionCustomer.username) {
                router.push('/');
            }
            getOtherProducts();
        }
    }, [router.isReady]);

    return (
        <>
            <Head>
                <title>Marketplace</title>
            </Head>
            <Header></Header>

            <main>
                <ProductsOverview products={products} />
            </main>
        </>
    );
};

export default Sales;
