import React, { use, useState } from 'react';
import CustomerService from '../../services/CustomerService';
import StatusMessageParser from '../StatusMessageParser';
import { Customer } from '../../types';
import { useRouter } from 'next/router';

type Props = {};

const LoginForm: React.FC<Props> = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [statusMessage, setStatusMessage] = useState(null);
    const router = useRouter();

    const validate = (): boolean => {
        let isValid = true;
        setUsernameError('');
        setPasswordError('');

        setStatusMessage(null);

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
        };
        const response = await CustomerService.login(customer);
        const data = await response.json();
        if (response.status === 200) {
            setStatusMessage({
                type: 'success',
                message: `Welcome ${username}`,
            });
            const token = data.token;
            const user = data.customer;

            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', JSON.stringify(user));
            setTimeout(() => {
                router.push('/');
            }, 1000);
        } else if (response.status === 401) {
            setStatusMessage({
                type: 'unauthorized',
                message: data.message,
            });
        } else {
            setStatusMessage({
                type: 'error',
                message: data.message,
            });
        }
    };

    return (
        <div className="bg-base-200 rounded-box p-2">
            <StatusMessageParser statusMessage={statusMessage} />
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="">
                    <h1 className="text-5xl font-bold">Login</h1>
                    <p className="py-6">
                        Discover a world of unique offerings on our marketplace. Login now to
                        explore a diverse range of products and services. Uncover exclusive deals,
                        connect with sellers, and make your shopping experience memorable.
                    </p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label" htmlFor="username">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                placeholder="username"
                                className="input input-bordered"
                                required
                            />
                            <div className="text-muted">
                                {usernameError && (
                                    <div className="text-danger">{usernameError}</div>
                                )}
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="password">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="password"
                                className="input input-bordered"
                                required
                            />
                            <div className="text-muted">
                                {passwordError && (
                                    <div className="text-danger">{passwordError}</div>
                                )}
                            </div>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">
                                    Forgot password?
                                </a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
