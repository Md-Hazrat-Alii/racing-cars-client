import React from 'react';
import { FaBolt, FaDollarSign, FaHandsHelping, FaMoneyBillAlt } from 'react-icons/fa';


const Cards = () => {
    return (
        <div className='bg-base-300 py-20'>
            <h1 className='flex justify-center font-semibold text-4xl mb-16 '>Why we are the best?</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 full mx-24 gap-10">
                <div className="card card-compact text-white shadow-xl bg-slate-600">
                    <div className='flex justify-center mt-3'>
                        <FaMoneyBillAlt className='text-5xl text-center text-secondary'></FaMoneyBillAlt>
                    </div>
                    <div className="card-body">
                        <h2 className="card-title flex justify-center text-secondary">Best Price!</h2>
                        <p className='text-left'>You can get the best price of any car in our company. Perspiciatis dolor illo blanditiis itaque iusto est esse adipisci, sed ea, aut, odio perferendis praesentium sunt suscipit.</p>
                    </div>
                </div>
                <div className="card card-compact text-white shadow-xl bg-slate-600">
                    <div className='flex justify-center mt-5'>
                        <FaBolt className='text-5xl text-center text-secondary'></FaBolt>
                    </div>
                    <div className="card-body">
                        <h2 className="card-title flex justify-center text-secondary">Fastest Delivery!</h2>
                        <p className='text-left'>We deliver our products as fast as possible. Quaerat consequuntur exercitationem accusamus illum quas nisi voluptate possimus doloribus molestias minus dolorem amet nobis, at mollitia.</p>
                    </div>
                </div>
                <div className="card card-compact text-white shadow-xl bg-slate-600">
                    <div className='flex justify-center mt-5'>
                        <FaHandsHelping className='text-5xl text-center text-secondary'></FaHandsHelping>
                    </div>
                    <div className="card-body">
                        <h2 className="card-title flex justify-center text-secondary">100% Deal Completed!</h2>
                        <p className='text-left'>Successfully completed about 20,000 deals with our consumers. Quaerat consequuntur exercitationem accusamus illum quas nisi voluptate possimus doloribus molestias minus dolorem amet nobis, at mollitia.</p>
                    </div>
                </div>
                <div className="card card-compact text-white shadow-xl bg-slate-600">
                    <div className='flex justify-center mt-5'>
                        <FaDollarSign className='text-5xl text-center text-secondary'></FaDollarSign>
                    </div>
                    <div className="card-body">
                        <h2 className="card-title flex justify-center text-secondary">30%-60% Cashback!</h2>
                        <p className='text-left'>You can get about 30-60% cashback depending on your luck and performance. Quaerat consequuntur voluptate possimus doloribus molestias minus dolorem amet nobis, at mollitia.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;