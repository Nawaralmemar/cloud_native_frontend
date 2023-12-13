import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Customer } from '../../types';
import { Product } from '../../types';

const Nav: React.FC = () => {
    const router = useRouter();
    const [user, setUser] = useState<Customer | null>(null);
    const [cartCount, setCartCount] = useState(0);

    const handleLogOut = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('cart');
        setUser(null);
    };

    const handleCartCount = () => {
        const storedCart: { product: Product; quantity: number }[] =
            JSON.parse(sessionStorage.getItem('cart')) || [];
        const cartCount = storedCart.reduce((totalCount, item) => totalCount + item.quantity, 0);
        setCartCount(cartCount);
        setTimeout(handleCartCount, 1000); //eww
    };

    useEffect(() => {
        const storedUser: Customer = JSON.parse(sessionStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
        handleCartCount();
    }, []);

    return (
        <div className="navbar bg-neutral text-neutral-content shadow-lg rounded-box my-3">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    {user && (
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral rounded-box w-52"
                        >
                            <li>
                                <Link
                                    href={`/customers/${user.username}/products`}
                                    style={{
                                        backgroundColor:
                                            router.pathname ===
                                            '/customers/[customerUsername]/products'
                                                ? '#373f49'
                                                : 'transparent',
                                    }}
                                >
                                    My Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/customers/${user.username}/sales`}
                                    style={{
                                        backgroundColor:
                                            router.pathname ===
                                            '/customers/[customerUsername]/sales'
                                                ? '#373f49'
                                                : 'transparent',
                                    }}
                                >
                                    My Sales
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/customers/${user.username}/marketplace`}
                                    style={{
                                        backgroundColor:
                                            router.pathname ===
                                            '/customers/[customerUsername]/marketplace'
                                                ? '#373f49'
                                                : 'transparent',
                                    }}
                                >
                                    Marketplace
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/customers/${user.username}/cart`}
                                    style={{
                                        backgroundColor:
                                            router.pathname === '/customers/[customerUsername]/cart'
                                                ? 'transparent'
                                                : 'transparent',
                                    }}
                                >
                                    Cart
                                </Link>
                            </li>
                            <li>
                                <Link onClick={handleLogOut} href="/login">
                                    Log Out
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
                <Link
                    href="/"
                    className={`btn btn-ghost text-xl ${router.pathname === '/' ? '' : ''}`}
                >
                    E-commerce
                </Link>
            </div>
            {user && (
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link
                                href={`/customers/${user.username}/products`}
                                style={{
                                    backgroundColor:
                                        router.pathname === '/customers/[customerUsername]/products'
                                            ? '#373f49'
                                            : 'transparent',
                                }}
                            >
                                My Products
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/customers/${user.username}/sales`}
                                style={{
                                    backgroundColor:
                                        router.pathname === '/customers/[customerUsername]/sales'
                                            ? '#373f49'
                                            : 'transparent',
                                }}
                            >
                                My Sales
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/customers/${user.username}/marketplace`}
                                style={{
                                    backgroundColor:
                                        router.pathname ===
                                        '/customers/[customerUsername]/marketplace'
                                            ? '#373f49'
                                            : 'transparent',
                                }}
                            >
                                Marketplace
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
            <div className="navbar-end">
                {user && (
                    <>
                        <div className="dropdown dropdown-end">
                            <div role="button" className="btn btn-ghost btn-circle">
                                <Link
                                    href={`/customers/${user.username}/cart`}
                                    className={`link nav-link px-4 fs-5 ${
                                        router.pathname === '/customers/[customerUsername]/cart'
                                            ? 'bg-base-100'
                                            : ''
                                    }`}
                                    style={{
                                        backgroundColor:
                                            router.pathname === '/customers/[customerUsername]/cart'
                                                ? 'transparent'
                                                : 'transparent',
                                    }}
                                >
                                    <div className="indicator">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                        <span className="badge badge-sm indicator-item">
                                            {cartCount}
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </>
                )}
                <div role="button" className="btn btn-ghost btn-sm">
                    <Link onClick={handleLogOut} href="/login">
                        {user ? 'Logout' : 'Login'}
                    </Link>
                </div>
                {!user && (
                    <div role="button" className="btn btn-ghost btn-sm">
                        <Link onClick={handleLogOut} href="/signup">
                            Signup
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Nav;
