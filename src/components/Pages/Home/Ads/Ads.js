import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../Shared/Loading/Loading';
import AdCarousel from './AdCarousel';

const Ads = () => {

    const url = `${process.env.REACT_APP_server_url}/ads`

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['allseller'],
        queryFn: async () => {
            const res = await fetch(url)
            const data = await res.json()
            return data
        }
    })

    console.log(products)

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='mt-10 mb-20'>
            <h1 className='mt-20 mb-10 font-semibold text-4xl'>Advertisement</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 full mx-20 gap-10">
                {
                    products?.map((product, i) => <div key={i} className="card bg-base-100 shadow-xl border-4">
                        <figure><img src={product.img} alt="Shoes" className='h-48' /></figure>
                        <div className="text-center">
                            <h2 className="text-center font-semibold text-2xl mt-2">{product.name}</h2>
                        </div>
                    </div>
                    )}
            </div>
                {/* <div className="carousel w-1/2 mx-auto">
                    {

                        products?.map((product, i) => <AdCarousel key={i} product={product} i={i}></AdCarousel>)
                    }

                </div> */}
        </div>
    );
};

export default Ads;