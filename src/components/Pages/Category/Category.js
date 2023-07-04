import React from 'react';
import { useLoaderData } from 'react-router-dom';
import SingleProduct from './SingleProduct';

const Category = () => {
    const products = useLoaderData();
    
    return (
        <div className=' mb-20'>
            <h1 className='text-5xl font-semibold my-10'>Products</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mx-10 my-20'>
                {
                    products.map(product => <SingleProduct key={product._id} product={product}></SingleProduct>)
                }
            </div>
        </div>
    );
};

export default Category;