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
                        <th className="text-white">Serial</th>
                        <th className="text-white">Quantity</th>
                        <th className="text-white">Date</th>
                        <th className="text-white">Buyer</th>
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
