import { Transaction } from '../types';

const addTransaction = async (quantity, customerUsername, productSerialNumber) => {
    const transaction: Transaction = {
        quantity,
        buyerUsername: customerUsername,
        productSerialNumber,
    };
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
        body: JSON.stringify(transaction),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
};

const getSales = async (customerUsername: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${customerUsername}/transactions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
};

const TransactionService = {
    addTransaction,
    getSales,
};
export default TransactionService;
