import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import toast from 'react-hot-toast'
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import useToken from '../../../hooks/useToken/useToken';

const SignUp = () => {
    const [error, setError] = useState('');
    const { createUser, loginProvider, updateUserProfile } = useContext(AuthContext)
    const providerGoogle = new GoogleAuthProvider();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail)

    if (token) {
        navigate(from, {replace: true})
    }

    const handelSubmit = (e) => {
        e.preventDefault()

        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        const usert = form.radio.value
        const isVerified = "false"

        createUser(email, password)
            .then(res => {
                console.log(res.user)
                toast.success('User created successfully.')
                const userInfo = {
                    displayName: name
                }
                updateUserProfile(userInfo)
                    .then( () => {
                        saveUserToDB(name, email, usert, isVerified)
                        console.log('ok')
                        form.reset()
                    })
            })
            .catch(err => {
                console.error(err.message)
                toast.error(err.message)
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
                'content-type' : 'application/json'
            },
            body: JSON.stringify(user) 
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email)
                console.log(email)
                console.log('saver user', data)
            })
            .catch(err => {
                console.error(err)
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content  flex-col lg:flex-row-reverse">
                <div className="w-1/2 text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up!</h1>
                    <p className="py-6">Please give your valid email address and password. Then press the login button. If you want to login with any Google. Then press google button.</p>
                </div>
                <div className="card flex-shrink-0 w-1/2 max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handelSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input name='name' type="text" placeholder="name" className="input input-bordered" />
                        </div>
                        {/* <div className="form-control">
                            <label className="label">
                                <span className="label-text">image</span>
                            </label>
                            <input name='image' type="file" placeholder="image" className="input input-bordered" />
                        </div> */}
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
                        </div>


                        <div className='mt-2'>
                            <h1 className='font-semibold'>Please select the role of a user</h1>
                            <div className='flex justify-evenly mt-2'>
                                <div className="flex items-center">
                                    <input defaultChecked id="default-radio-1" type="radio" value="normal" name="radio" className="radio radio-accent" />
                                    <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium">Normal</label>
                                </div>
                                <div className="flex items-center">
                                    <input id="default-radio-2" type="radio" value="seller" name="radio" className="radio radio-accent" />
                                    <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium">Seller</label>
                                </div>
                            </div>
                        </div>

                        <div className="form-control mt-2">
                            <button className="btn btn-primary font-bold">Signup</button>
                        </div>
                        <div className="divider">OR</div>
                        <div className="form-control">
                            <button onClick={handelGoogleLogin} className="btn btn-primary">
                                <div className='flex justify-between'>
                                    <FaGoogle className='' />
                                    <p className='pl-3 font-bold'>Google</p>
                                </div>
                            </button>
                        </div>
                        <div>
                            <p>Already have an account?<Link to='/login' className='link link-info'>Please login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;