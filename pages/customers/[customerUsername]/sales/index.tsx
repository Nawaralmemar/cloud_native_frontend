import { useRouter } from 'next/router';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import SalesOverview from '../../../../components/sales/SalesOverview';
import TransactionService from '../../../../services/TransactionService';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Sale } from '../../../../types';

const CustomerSales: React.FC = () => {
    const router = useRouter();

    const [sales, setSales] = useState<Sale[]>();

    const getCustomerSales = async () => {
        const customerUsername = router.query.customerUsername as string;
        const response = await TransactionService.getSales(customerUsername);
        const data = await response.json();

        if (response.status === 200) {
            setSales(data.transactions);
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
            getCustomerSales();
        }
    }, [router.isReady]);

    return (
        <>
            <Head>
                <title>My Sales</title>
            </Head>
            <Header></Header>

            <main>
                <section>
                    <div>
                        <SalesOverview sales={sales} />
                    </div>
                </section>
            </main>
        </>
    );
};

export default CustomerSales;
