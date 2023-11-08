import { useRouter } from 'next/router';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';

import ProductsOverview from '../../../../components/customers/products/ProductsOverview';
import ProductService from '../../../../services/ProductService';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Product } from '../../../../types';

const CustomerProducts: React.FC = () => {
    const router = useRouter();

    const [products, setProducts] = useState<Product[]>();
    const getCustomerProducts = async () => {
        const customerUsername = router.query.customerUsername as string;

        const response = await ProductService.getProductsOf(customerUsername, true);
        const data = await response.json();

        if (response.status === 200) {
            setProducts(data.products);
        }
    };

    useEffect(() => {
        if (router.isReady) {
            const customerUsername = router.query.customerUsername as string;
            const sessionCustomer = JSON.parse(sessionStorage.getItem('user'));
            if (!sessionCustomer) {
                router.push('/');
            } else if (customerUsername !== sessionCustomer.username) {
                router.push('/');
            }
            getCustomerProducts();
        }
    }, [router.isReady]);

    return (
        <>
            <Head>
                <title>My Products</title>
            </Head>
            <Header></Header>

            <main>
                <section className="row justify-content-center min-vh-100">
                    <div className="col-6">
                        <h4>My Products</h4>
                        <ProductsOverview products={products} />
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </>
    );
};

export default CustomerProducts;
