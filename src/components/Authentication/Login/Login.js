import React, { useContext, useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from 'firebase/auth';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import useToken from '../../../hooks/useToken/useToken';
import toast from 'react-hot-toast';



const Login = () => {

    const [error, setError] = useState('');
    const { login, loginProvider } = useContext(AuthContext);
    const providerGoogle = new GoogleAuthProvider();

    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail)

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

    if(token){
        navigate(from, {replace: true})
    }

    const handelSubmit = e => {
        e.preventDefault()

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // console.log(email, password)

        login(email, password)
            .then(res => {
                const user = res.user;
                setCreatedUserEmail(email)
                console.log(user)
                toast.success('Login succesfull')
                // form.reset()
            })
            .catch(error => {
                setError(error.message)
                console.error(error)
                toast.error(error.message)
            })
    }

    const handelGoogleLogin = () => {
        loginProvider(providerGoogle)
            .then(res => {
                const user = res.user;
                const usert = 'normal';
                const isVerified = "false"
                console.log(user)
                saveUserToDB(user.displayName, user.email, usert, isVerified)
            })
            .catch(error => {
                setError(error.message)
                console.error(error)
            })
    }

    const saveUserToDB = (name, email, role) => {
        const user = { name, email, role }
        fetch(`${process.env.REACT_APP_server_url}/adduser`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log('saved user', data, email)
                setCreatedUserEmail(email)
            })
            .catch(err => {
                console.error(err)
            })
    }

    

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content  flex-col lg:flex-row-reverse">
                <div className="w-1/2 text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Please give your valid email address and password. Then press the login button. If you want to login with any Google. Then press google button.</p>
                </div>
                <div className="card flex-shrink-0 w-1/2 max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handelSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name='email' type="email" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name='password' type="password" placeholder="password" className="input input-bordered" />

                            <label className="label">
                                <Link href="#" className="label-text-alt link link-hover">Forgot password?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-2">
                            <button className="btn btn-primary font-bold">Login</button>
                        </div>
                        <div className="divider">OR</div>
                        <div>
                            <p>Don't have an account?<Link to='/signup' className='link link-info'>Please Signup</Link></p>
                        </div>
                    </form>
                        {/* <div className="mb-10 w-full"> */}
                    <button className="btn btn-primary mx-8 mb-5" onClick={handelGoogleLogin}>
                                <div  className='flex justify-between'>
                                    <FaGoogle className='' />
                                    <p className='pl-3 font-bold'>Google</p>
                                </div>
                            </button>
                        {/* </div> */}
                </div>
            </div>
        </div>
    );
};

export default Login;