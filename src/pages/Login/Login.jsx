import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from "../../const/data"
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Error from "../Error/Error";

const Login = () => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        login: "",
        password: "",
    });

    const onChangeHandler = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/auth/login`, credentials).then(async res => {

                if (res.data) {
                    localStorage.setItem('access_token', res.data.token);
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                    toast.success('Logged in successfully!', { duration: 1000 });
                    setCredentials({ login: '', password: '' });
                    setTimeout(() => navigate("/dashboard"), 1000);
                } else {
                    toast.error('Wrong credentials!');
                }
            })
        } catch (error) {
            if (error?.status == '404') {
                toast.error('Wrong credentials!');
            } else {
                <Error error={error} />
            }
        }
    }
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 pt-[100px]">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="login" className="block text-sm font-medium leading-6 text-gray-900">Login</label>
                        <div className="mt-2">
                            <input id="login" name="login" type="login" autoComplete="login" required value={credentials.login} onChange={onChangeHandler} className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" autoComplete="current-password" required value={credentials.password} onChange={onChangeHandler} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                    </div>
                    <p className='mt-[30px]'>Don't have an account? <a href='/register' className={'text-blue-500'}>Sign Up</a></p>
                </form>
            </div>
        </div>
    )
}

export default Login