import React from 'react';
import { Link } from 'react-router-dom';

const HomeCategoriCard = ({ category }) => {
    const { name, img } = category

    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure><img src={img} alt="cars" className='h-80' /></figure>
            <div className="card-body">
                <h2 className="text-3xl font-semibold text-center">{name}</h2>
                <div className="card-actions justify-center">
                    <Link to={`/categories/${name}`} className='btn btn-warning'>Check</Link>
                </div>
            </div>
        </div>
    );
};

export default HomeCategoriCard;