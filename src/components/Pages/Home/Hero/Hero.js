import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="hero bg-base-200 my-20">
            <div className="hero-content flex-col lg:flex-row-reverse my-10">
                <div className='w-100 m-0 p-0'>
                    <img src="https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2Fyc3xlbnwwfHwwfHw%3D&w=1000&q=80" alt='' className="rounded-lg shadow-2xl" />
                </div>
                <div className='max-w-6xl mr-20 text-left'>
                    <div className="badge badge-secondary">Get the best price!</div>
                    <h1 className="text-3xl font-bold">Buy & Sell Your Car's for the Best Price!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam illum ullam, non architecto consectetur quis quos provident nisi facilis rem ex nihil, ut dicta. Quas repellat tempore quos nobis natus.</p>
                    <Link to='/blog'>
                        <button className="btn btn-secondary mr-4">Our Blogs</button>
                    </Link>
                        <button className="btn btn-info">Contact Us</button>
                </div>
            </div>
        </div>
    );
};

export default Hero;