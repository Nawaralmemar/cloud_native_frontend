import { Product } from '../types';

const getProductsOf = async (customerUsername: string, isMyProduct: boolean) => {
    const link = isMyProduct
        ? `${process.env.NEXT_PUBLIC_API_URL}/${customerUsername}/products`
        : `${process.env.NEXT_PUBLIC_API_URL}/${customerUsername}/othersProducts`;

    return await fetch(link, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
};

const addProduct = async (product: Product) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/products', {
        body: JSON.stringify(product),
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
};

const CustomerService = {
    getProductsOf,
    addProduct,
};

export default CustomerService;
