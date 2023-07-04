import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import HomeCategoriCard from '../Home/HomeCategoriCard/HomeCategoriCard';

const Categories = () => {

    const {data = [], isLoading} = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const data = await axios.get(`${process.env.REACT_APP_server_url}/categories`)
            // console.log(data)
            return data
        }
    })

    if(isLoading){
        return <progress className="progress w-56 my-10"></progress>
    }

    const categories = data.data
    // console.log(categories)

    return (
        <div className='mt-10 mb-28'>
            <h1 className='text-5xl font-semibold'>Categories</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mx-10 my-20'>
                {
                    categories?.map(category => <HomeCategoriCard key={category._id} category={category}></HomeCategoriCard>)
                }
            </div>
        </div>
    );
};

export default Categories;