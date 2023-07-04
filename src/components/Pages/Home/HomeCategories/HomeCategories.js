import React, { useEffect, useState } from 'react';
import HomeCategoriCard from '../HomeCategoriCard/HomeCategoriCard';

const HomeCategories = () => {

    const [categories, setCategories] = useState([])

    // console.log(categories)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_server_url}/categories`)
            .then(res => res.json())
            .then(data => {
                setCategories(data)
            })
    }, [])


    return (
        <div className='my-10'>
            <h1 className='text-5xl mb-10'>Categories</h1>
            <div className='mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mx-10'>
                    {
                        categories.map(category => <HomeCategoriCard key={category._id} category={category}></HomeCategoriCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default HomeCategories;