import React from 'react';
import Form from './Form';

const Login = () => {
    return (
        <div className="flex w-full h-screen bg-escarlata justify-center items-center">
            <div className="max-w-md w-full px-4 md:px-0">
                <Form />
            </div>
        </div>
    );
};

export default Login;