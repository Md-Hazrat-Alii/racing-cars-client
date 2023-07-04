import React from 'react';

const Contact = () => {
    return (
        <div className="hero bg-base-200">
            <div className="hero-content flex-col lg:gap-36 lg:flex-row my-10">
                <div className='w-1/2 m-0 p-0'>
                    <img src="https://simplify360.com/wp-content/uploads/2022/03/empathy-in-customer-service.gif" 
                    className=" rounded-lg shadow-2xl" alt='' />
                </div>
                <section className='text-center lg:py-16 lg:my-20 mx-10'>
                    <div className="badge badge-info">Contact</div>
                    <h4 className='text-warning font-bold text-3xl'>CONTACT US</h4>
                    <h2 className='text-4xl mb-10 '>Stay Connected with us</h2>
                    <div className='items-center'>
                        <input type="email" placeholder="Email Address" className="input w-full mx-auto mt-3 block" required />
                        <input type="text" placeholder="Subject" className="input w-full mx-auto mt-3 block " />
                        <textarea className="textarea my-3 h-28 w-full block mx-auto" placeholder="Your Message" required></textarea>
                        <button className='btn btn-warning'>Submit</button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Contact;