import Head from 'next/head';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import AddProductForm from '../../../../components/customers/products/AddProductFom';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const AddProduct: React.FC = () => {
    const router = useRouter();
    const [customerUsername, setCustomerUsername] = useState('');

    useEffect(() => {
        // Check if router is ready before accessing the query parameter
        if (router.isReady) {
            const customerUsername = router.query.customerUsername as string;
            const sessionCustomer = JSON.parse(sessionStorage.getItem('user'));
            if (!sessionCustomer) {
                router.push('/');
            } else if (customerUsername !== sessionCustomer.username) {
                router.push('/');
            }
            setCustomerUsername(customerUsername);
        }
    }, [router.isReady]);

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Header />
            <main>
                <section>
                    <AddProductForm customerUsername={customerUsername} />
                </section>
            </main>
        </>
    );
};

export default AddProduct;
