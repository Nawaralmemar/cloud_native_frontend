import React, { useEffect, useState } from 'react';
import { Product } from '../../../types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Customer } from '../../../types';

type Props = {
    products: Array<Product>;
};

const ProductsOverview: React.FC<Props> = ({ products }: Props) => {
    const router = useRouter();
    const [user, setUser] = useState<Customer | null>(null);

    useEffect(() => {
        const storedUser: Customer = JSON.parse(sessionStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <div className="bg-base-200 p-4 rounded-box w-full">
            <div className="grid-container mt-2">
                {products &&
                    products.map((product, index) => (
                        <div
                            className="card bg-base-100 rounded-box indicator mb-4"
                            key={index}
                            style={{ width: '240px', border: '2px solid #2a323c' }}
                        >
                            <figure>
                                <img
                                    src={`https://loremflickr.com/320/240?random=${index}`}
                                    alt="product"
                                />
                            </figure>
                            <span
                                style={{ border: '2px solid #2a323c' }}
                                className="border-1 p-3 text-md text-white indicator-item indicator-center badge badge-primary"
                            >
                                ${product.price}
                            </span>
                            <div className="card-body">
                                <h2 className="card-title font-bold text-3xl">
                                    {product.name}{' '}
                                    <div className="text-xs font-thin">
                                        (#{product.serialNumber})
                                    </div>
                                </h2>
                                <p className="text-sm">{product.description}</p>
                            </div>
                        </div>
                    ))}
            </div>
            {user && (
                <Link
                    href={`/customers/${user.username}/products/add`}
                    className={`btn btn-primary mb-4${
                        router.pathname == '/customers/[customerUsername]/products/add'
                            ? 'bg-base-100'
                            : ''
                    }`}
                >
                    Add Products
                </Link>
            )}
            <style jsx>{`
                .grid-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
                    gap: 10px;
                }

                @media (max-width: 767px) {
                    .grid-container {
                        grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
                    }
                }
            `}</style>
        </div>
    );
};

export default ProductsOverview;
