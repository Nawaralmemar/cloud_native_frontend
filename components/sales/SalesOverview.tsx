import React from 'react';
import { Sale } from '../../types';

type Props = {
    sales: Array<Sale>;
};

const SalesOverview: React.FC<Props> = ({ sales }: Props) => {
    return (
        <div className="bg-base-200 p-4 rounded-box w-full">
            <h1 className="font-bold p-2">Your sales</h1>
            <table className="table table-striped table-bordered table-hover bg-base-100">
                <thead className="table-dark">
                    <tr>
                        <th>Serial</th>
                        <th>Quantity</th>
                        <th>Date</th>
                        <th>Buyer</th>
                    </tr>
                </thead>
                <tbody>
                    {sales &&
                        sales.map((sale, index) => (
                            <tr key={index}>
                                <td>{sale.productSerialNumber}</td>
                                <td>{sale.quantity}</td>
                                <td>{new Date(sale.date).toLocaleString()}</td>
                                <td>{sale.buyerUsername}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesOverview;
