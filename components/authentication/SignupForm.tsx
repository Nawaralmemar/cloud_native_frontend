import React, { useState } from 'react';
import CustomerService from '../../services/CustomerService';
import StatusMessageParser from '../StatusMessageParser';
import { Button, Form } from 'react-bootstrap';
import { Customer } from '../../types';
import { useRouter } from 'next/router';

const SignupForm: React.FC = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [firstnameError, setFirstnameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [statusMessage, setStatusMessage] = useState(null);
    const router = useRouter();

    const validate = (): boolean => {
        let isValid = true;
        setFirstnameError('');
        setLastnameError('');
        setUsernameError('');
        setPasswordError('');

        setStatusMessage(null);

        if (!firstname && firstname.trim() === '') {
            setFirstnameError("First name can't be empty");
            isValid = false;
        }

        if (!lastname && lastname.trim() === '') {
            setLastnameError("Last name can't be empty");
            isValid = false;
        }

        if (!username && username.trim() === '') {
            setUsernameError("Username can't be empty");
            isValid = false;
        }

        if (!password && password.trim() === '') {
            setPasswordError("Password can't be empty");
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validate()) {
            return;
        }

        const customer: Customer = {
            username,
            password,
            firstname,
            lastname,
        };
        const response = await CustomerService.signup(customer);

        const data = await response.json();
        if (response.status === 200) {
            setStatusMessage({
                type: 'success',
                message: `Registration successful. Please log in.`,
            });
            setTimeout(() => {
                router.push('/login');
            }, 1000);
        } else {
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
                    <h1 className="text-5xl font-bold">Signup</h1>
                    <p className="py-6">
                        Join our marketplace community and explore a world of unique offerings. Sign
                        up now to create your account and start buying or selling. Your journey to
                        discovering exclusive deals and connecting with other users begins here.
                    </p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <Form.Group className="form-control">
                            <Form.Label className="label">
                                <span className="label-text">First Name</span>
                            </Form.Label>
                            <Form.Control
                                id="firstname"
                                type="text"
                                value={firstname}
                                onChange={(event) => {
                                    setFirstname(event.target.value);
                                }}
                                placeholder="First Name"
                                className="input input-bordered"
                                required
                            />
                            <Form.Text className="text-muted">
                                {firstnameError && (
                                    <div className="text-danger">{firstnameError}</div>
                                )}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="form-control">
                            <Form.Label className="label">
                                <span className="label-text">Last Name</span>
                            </Form.Label>
                            <Form.Control
                                id="lastname"
                                type="text"
                                value={lastname}
                                onChange={(event) => {
                                    setLastname(event.target.value);
                                }}
                                placeholder="Last Name"
                                className="input input-bordered"
                                required
                            />
                            <Form.Text className="text-muted">
                                {lastnameError && (
                                    <div className="text-danger">{lastnameError}</div>
                                )}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="form-control">
                            <Form.Label className="label">
                                <span className="label-text">Username</span>
                            </Form.Label>
                            <Form.Control
                                id="username"
                                type="text"
                                value={username}
                                onChange={(event) => {
                                    setUsername(event.target.value);
                                }}
                                placeholder="Username"
                                className="input input-bordered"
                                required
                            />
                            <Form.Text className="text-muted">
                                {usernameError && (
                                    <div className="text-danger">{usernameError}</div>
                                )}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="form-control">
                            <Form.Label className="label">
                                <span className="label-text">Password</span>
                            </Form.Label>
                            <Form.Control
                                id="password"
                                type="password"
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                                placeholder="Password"
                                className="input input-bordered"
                                required
                            />
                            <Form.Text className="text-muted">
                                {passwordError && (
                                    <div className="text-danger">{passwordError}</div>
                                )}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="form-control mt-6">
                            <Button variant="primary" type="submit">
                                Sign Up
                            </Button>
                        </Form.Group>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
