import Head from 'next/head';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import TransactionService from '../../../../services/TransactionService';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Customer, Product } from '../../../../types';

const CustomerCart: React.FC = () => {
    const [isSessionStorageLoaded, setIsSessionStorageLoaded] = useState(false);
    const [cart, setCart] = useState([]);
    const [customer, setCustomer] = useState<Customer>(null);
    const router = useRouter();
    const total = cart.reduce(
        (totalPrice, item) => totalPrice + item.product.price * item.quantity,
        0
    );

    const handlePurchase = async () => {
        try {
            const requests = cart.map(async (element) => {
                return TransactionService.addTransaction(
                    element.quantity,
                    customer.username,
                    element.product.serialNumber
                );
            });

            const responses = await Promise.all(requests);

            const allPassed = responses.every((response) => {
                return response.status === 200;
            });

            if (allPassed) {
                console.log('All transactions passed.');
                sessionStorage.removeItem('cart');
                alert('Success');
                window.location.reload();
            } else {
                console.error('Some transactions failed.');
            }
        } catch (error) {
            console.error('Error during purchase:', error);
        }
    };

    useEffect(() => {
        // Check if session storage is loaded
        const sessionCart = JSON.parse(sessionStorage.getItem('cart')) || [];
        const sessionCustomer = JSON.parse(sessionStorage.getItem('user'));
        if (router.isReady) {
            if (!sessionCustomer) {
                router.push('/');
            } else if (router.query.customerUsername !== sessionCustomer.username) {
                router.push('/');
            }

            if (sessionCart && sessionCustomer) {
                setCart(sessionCart);
                setCustomer(sessionCustomer);
                setIsSessionStorageLoaded(true);
            }
        }
    }, [router.isReady]);
    return (
        <>
            <Head>
                <title>My Products</title>
            </Head>
            <Header></Header>

            <main>
                <div className="bg-base-200 p-4 rounded-box w-full">
                    {isSessionStorageLoaded ? (
                        <div>
                            {cart.length === 0 ? (
                                <p>Cart is empty.</p>
                            ) : (
                                <div>
                                    <table className="table table-striped table-bordered table-hover bg-base-100">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Total Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.product.name}</td>
                                                    <td>${item.product.price}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>${item.product.price * item.quantity}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="text-end">
                                        <button
                                            className="btn btn-primary mt-2"
                                            onClick={handlePurchase}
                                        >
                                            Purchase
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </main>
        </>
    );
};

export default CustomerCart;
