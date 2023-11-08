import { Customer } from '../types';

const login = async (customer: Customer) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/login', {
        body: JSON.stringify(customer),
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
    });
};

const signup = async (customer: Customer) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/register', {
        body: JSON.stringify(customer),
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
    });
};

const CustomerService = {
    login,
    signup,
};

export default CustomerService;
