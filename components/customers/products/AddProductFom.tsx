import React, { useState } from 'react';
import ProductService from '../../../services/ProductService';
import StatusMessageParser from '../../StatusMessageParser';
import { Button, Form } from 'react-bootstrap';
import { Product } from '../../../types';
import { useRouter } from 'next/router';

interface Props {
    customerUsername: string;
}

const AddProductForm: React.FC<Props> = ({ customerUsername }) => {
    const [name, setName] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [nameError, setNameError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [serialNumberError, setSerialNumberError] = useState('');

    const [statusMessage, setStatusMessage] = useState(null);
    const router = useRouter();

    const validate = (): boolean => {
        let isValid = true;
        setNameError('');
        setPriceError('');
        setDescriptionError('');
        setSerialNumberError('');

        setStatusMessage(null);

        if (!name || name.trim() === '') {
            setNameError("Product name can't be empty");
            isValid = false;
        }
        if (!price || !/^\d+$/.test(price)) {
            setPriceError('Please enter a valid price with digits only');
            isValid = false;
        }

        if (!description || description.trim() === '') {
            setDescriptionError("Description can't be empty");
            isValid = false;
        }

        if (!serialNumber || serialNumber.trim() === '') {
            setSerialNumberError("Serial number can't be empty");
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validate()) {
            return;
        }

        const product: Product = {
            name,
            price: parseInt(price),
            description: description.trim(),
            sellerUsername: customerUsername,
            serialNumber,
        };

        const response = await ProductService.addProduct(product);

        if (response.status === 200) {
            setStatusMessage({
                type: 'success',
                message: 'Product added successfully.',
            });
            router.push(`/customers/${customerUsername}/products`);
        } else {
            const data = await response.json();
            setStatusMessage({
                type: 'bad_request',
                message: data.message,
            });
        }
    };

    return (
        <div className="hero bg-base-200 rounded-box p-2">
            <StatusMessageParser statusMessage={statusMessage} />
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Add Product</h1>
                    <p className="py-6">
                        Expand your inventory by adding a new product. Fill in the details below to
                        showcase your item to potential buyers. Make sure to provide accurate and
                        appealing information to attract more customers.
                    </p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <Form.Group className="form-control">
                            <Form.Label className="label">
                                <span className="label-text">Product Serial</span>
                            </Form.Label>
                            <Form.Control
                                id="serialNumber"
                                type="text"
                                value={serialNumber}
                                onChange={(event) => {
                                    setSerialNumber(event.target.value);
                                }}
                                placeholder="Product Serial"
                                className="input input-bordered"
                                required
                            />
                            <Form.Text className="text-muted">
                                {serialNumberError && (
                                    <div className="text-danger">{serialNumberError}</div>
                                )}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="form-control">
                            <Form.Label className="label">
                                <span className="label-text">Product Name</span>
                            </Form.Label>
                            <Form.Control
                                id="name"
                                type="text"
                                value={name}
                                onChange={(event) => {
                                    setName(event.target.value);
                                }}
                                placeholder="Product Name"
                                className="input input-bordered"
                                required
                            />
                            <Form.Text className="text-muted">
                                {nameError && <div className="text-danger">{nameError}</div>}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="form-control">
                            <Form.Label className="label">
                                <span className="label-text">Price</span>
                            </Form.Label>
                            <Form.Control
                                id="price"
                                type="text" // You can use type="number" for numeric input
                                value={price}
                                onChange={(event) => {
                                    setPrice(event.target.value);
                                }}
                                placeholder="Price"
                                className="input input-bordered"
                                required
                            />
                            <Form.Text className="text-muted">
                                {priceError && <div className="text-danger">{priceError}</div>}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="form-control">
                            <Form.Label className="label">
                                <span className="label-text">Description</span>
                            </Form.Label>
                            <Form.Control
                                id="description"
                                as="textarea"
                                rows={3}
                                value={description}
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                }}
                                placeholder="Description"
                                className="input input-bordered"
                                required
                            />
                            <Form.Text className="text-muted">
                                {descriptionError && (
                                    <div className="text-danger">{descriptionError}</div>
                                )}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="form-control mt-6">
                            <Button variant="primary" type="submit">
                                Add Product
                            </Button>
                        </Form.Group>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProductForm;
