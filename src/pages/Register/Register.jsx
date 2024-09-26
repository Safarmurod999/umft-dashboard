import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from "../../const/data"
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Error from '../Error/Error';

const Register = () => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        login: "",
        password: "",
        name: ""
    });

    const onChangeHandler = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/auth/reg`, credentials).then(async res => {
                if (res.status == 200) {
                    toast.error("User already registered!")
                } else
                    if (res.data) {
                        localStorage.setItem('access_token', res.data.token);
                        localStorage.setItem('user', JSON.stringify(res.data.user));
                        setCredentials({ login: '', password: '', name: '' });
                        setTimeout(() => navigate('/login'), 1000);
                        toast.success('Registered successfully!');

                    } else {
                        toast.error('Wrong credentials!');
                    }
            })
        } catch (error) {
            <Error error={error} />
        }
    }
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 pt-[100px]">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up</h2>
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
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                        <div className="mt-2">
                            <input id="name" name="name" type="name" autoComplete="name" required value={credentials.name} onChange={onChangeHandler} className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
                    </div>
                    <p className='mt-[30px]'>Already have an account? <a href='/login' className={'text-blue-500'}>Sign In</a></p>

                </form>
            </div>
        </div>
    )
}

export default Register