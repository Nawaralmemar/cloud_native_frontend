import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SignupForm from '../../components/authentication/SignupForm';

const Signup: React.FC = () => {
    return (
        <>
            <Head>
                <title>Sign Up</title>
            </Head>

            <Header></Header>
            <main>
                <section>
                    <SignupForm />
                </section>
            </main>
        </>
    );
};

export default Signup;
