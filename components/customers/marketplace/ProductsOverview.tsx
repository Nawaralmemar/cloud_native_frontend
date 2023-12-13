import React, { useState } from 'react';
import { Product } from '../../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHashtag, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

type Props = {
    products: Array<Product>;
};

const ProductsOverview: React.FC<Props> = ({ products }: Props) => {
    const [quantities, setQuantities] = useState<{ [productId: number]: number }>({});

    const handleQuantityChange = (productId: string, quantity: number) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: quantity,
        }));
    };

    const addToCart = (product: Product) => {
        const quantity = quantities[product.serialNumber] || 1;

        // Create a copy of the current cart or initialize it as an empty array
        const cart: { product: Product; quantity: number }[] =
            JSON.parse(sessionStorage.getItem('cart')) || [];

        let exist = false;

        cart.forEach((element) => {
            if (element.product.serialNumber === product.serialNumber) {
                exist = true;
                element.quantity += quantity;
            }
        });

        if (!exist) {
            cart.push({
                product: product,
                quantity: quantity,
            });
        }
        alert('Added to cart');
        // Save the updated cart back to sessionStorage
        sessionStorage.setItem('cart', JSON.stringify(cart));
    };

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
                            <span
                                style={{ border: '2px solid #2a323c' }}
                                className="border-1 p-3 text-md indicator-item indicator-center badge badge-primary"
                            >
                                ${product.price}
                            </span>
                            <div className="card-body">
                                <h2
                                    style={{ fontSize: '32px', color: '#646ee4' }}
                                    className="font-bold"
                                >
                                    {' '}
                                    {product.name}
                                </h2>
                                <span className="text-xs">
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                    <span style={{ marginLeft: '5px' }}>{product.description}</span>
                                </span>
                                <span className="text-xs">
                                    <FontAwesomeIcon icon={faUser} />
                                    <span style={{ marginLeft: '5px' }}>
                                        {product.sellerUsername}
                                    </span>
                                </span>
                                <span className="text-xs">
                                    <FontAwesomeIcon icon={faHashtag} />
                                    <span style={{ marginLeft: '5px' }}>
                                        {product.serialNumber}
                                    </span>
                                </span>
                                <input
                                    type="number"
                                    onChange={(e) =>
                                        handleQuantityChange(
                                            product.serialNumber,
                                            parseInt(e.target.value, 10)
                                        )
                                    }
                                    value={quantities[product.serialNumber] || '1'}
                                    min={1}
                                    className="input input-bordered w-full max-w-xs"
                                />
                                <button
                                    className="btn btn-primary"
                                    onClick={() => addToCart(product)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
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
