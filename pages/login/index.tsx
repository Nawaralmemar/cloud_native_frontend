import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LoginForm from '../../components/authentication/LoginForm';

const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>Log In</title>
            </Head>

            <Header></Header>
            <main>
                <section>
                    <LoginForm />
                </section>
            </main>
        </>
    );
};

export default Login;
