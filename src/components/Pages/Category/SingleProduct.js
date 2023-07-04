import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { FaCheckSquare } from "react-icons/fa";
import Loading from '../../Shared/Loading/Loading';
import BookingModal from './BookingModal';

const SingleProduct = ({ product }) => {
    const { name, img, location, resale_price, original_price, years_of_use, posted_time, seller_name, seller_email } = product

    const [modalData, setModalData] = useState(null)
    const [isVerified,  setIsVerified] = useState(false)

    // const { data : isVerified  , isLoading, refetch } = useQuery({
    //     queryKey: ['products', seller_email],
    //     queryFn: async () => {
    //         const res = await fetch(`${process.env.REACT_APP_server_url}/sellerMailVerify?email=${seller_email}`)
    //         const data = await res.json()
    //         return data.isV
    //     }
    // })
    
    // refetch()

    useEffect( () => {
        fetch(`${process.env.REACT_APP_server_url}/sellerMailVerify?email=${seller_email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setIsVerified(data.isVerified)
            })
    },[seller_email])

    // if(isLoading){
    //     return <Loading></Loading>
    // }
    console.log(seller_email, isVerified)

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={img} alt="product" className='h-64'/></figure>
            <div className="ml-4 mt-4 ">
                <h2 className="card-title font-bold my-4">{name}</h2>
                <div className='flex'>
                    <p className='text-left font-semibold text-xl'>Seller Name: {seller_name}</p>
                    {
                        isVerified 
                        && <FaCheckSquare className='align-center ml-2 mt-2 text-blue-600'></FaCheckSquare>
                        // : <></>
                    }
                </div>
                <p className='text-left text-lg'>Location: {location}</p>
                <p className='text-left text-lg'>Resale Price: {resale_price}$</p>
                <p className='text-left text-lg'>Original Price: {original_price}</p>
                <p className='text-left text-lg'>Years Of Use: {years_of_use}</p>
                <p className='text-left text-lg'>Posted Time: {posted_time}</p>
                <div className="card-actions justify-center my-5">
                    <label htmlFor="booking-modal" onClick={() => setModalData({ name, resale_price, img })} className="btn btn-warning">Book Now</label>
                </div>
            </div>
            {
                modalData &&
                <BookingModal modalData={modalData} setModalData={setModalData}></BookingModal>
            }
        </div>
    );
};

export default SingleProduct;