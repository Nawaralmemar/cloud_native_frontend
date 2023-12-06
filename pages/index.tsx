import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import logo from '../public/logo.png';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Customer } from '../types';
import { useRouter } from 'next/router';

const Home: React.FC = () => {
    const [user, setUser] = useState<Customer | null>(null);

    const router = useRouter();

    useEffect(() => {
        const storedUser: Customer = JSON.parse(sessionStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>
            <Header></Header>
            <main>
                <div className="hero bg-base-200 rounded-box p-2">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <Image src={logo} alt="logo" className="max-w-xs" />
                        <div>
                            <h1 className="text-5xl font-bold">Welcome!</h1>
                            <p className="py-6">
                                Explore the aisles of our digital marketplace and witness the
                                creativity, innovation, and craftsmanship that make each item
                                special. Discover the stories behind the products and the talented
                                individuals who bring them to life.
                            </p>

                            {user ? (
                                <Link
                                    href={`/customers/${user.username}/products`}
                                    className={`btn btn-primary ${
                                        router.pathname == '/customers/[customerUsername]/products'
                                            ? 'active'
                                            : ''
                                    }`}
                                >
                                    Shop now
                                </Link>
                            ) : (
                                <Link href="/signup">
                                    <button className="btn btn-primary">Get Started</button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            {/* <Footer></Footer> */}
        </div>
    );
};

export default Home;
