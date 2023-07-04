import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthProvider/AuthProvider';
import Loading from '../../../Shared/Loading/Loading';

const MyBookings = () => {

    const { user } = useContext(AuthContext)

    const url = `${process.env.REACT_APP_server_url}/bookings?email=${user?.email}`

    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = res.json()
            return data
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }
    refetch()

    // console.log(bookings)
    return (
        <div>
            <h1 className='text-3xl mb-7 font-semibold'>My Bookings</h1>
            <h1 className='text-xl mb-4 font-semibold'>You have {bookings?.length} data.</h1>
            <div>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Price</th>
                                <th>Pay</th>
                            </tr>
                        </thead>
                        <tbody>
                            { bookings && 
                                bookings?.map((booking, i) => <tr className="hover" key={booking._id}>
                                    <th>
                                        {i + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={booking?.productImg} alt="img" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {booking?.productName}
                                    </td>
                                    <td>{booking?.email}</td>
                                    <td>{booking?.price}</td>
                                    <td>
                                        <button className="btn btn-warning btn-xs">Pay Now</button>
                                    </td>
                                </tr>)
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyBookings;