import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../../Shared/Loading/Loading';

const AllSeller = () => {

    const url = `${process.env.REACT_APP_server_url}/all-seller?type=seller`
    const [ deleteSeller, setDeleteseller ] = useState(null)

    const { data: allseller = [], isLoading, refetch } = useQuery({
        queryKey: ['allseller'],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    
    const handelDeleteSeller = (seller) => {
        fetch(`${process.env.REACT_APP_server_url}/deleteSeller/${seller._id}`, {
            method: 'DELETE', 
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if (result.deletedCount > 0) {
                    refetch()
                    toast.success(`Seller ${seller?.name} deleted successfully`)
                }
            })
    }

    const handelVerify = (id) => {
        fetch(`${process.env.REACT_APP_server_url}/user/verify/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res=> res.json())
            .then(data => {
                console.log('verifyed', data)
                if (data.modifiedCount > 0) {
                    refetch()
                    toast.success(` verified successfully`)
                }
            })
    }

    
    const closeModal = () => {
        setDeleteseller(null)
    }
    
    if (isLoading) {
        return <Loading></Loading>
    }
    

    return (
        <div>
            <h1 className='text-3xl mb-3 font-semibold'>All Seller</h1>
            <h1 className='text-xl mb-4 font-semibold'>You have {allseller?.length} data.</h1>
            <div>
                <div>
                    <div className="overflow-x-auto w-full">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Verify</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allseller &&
                                    allseller?.map((seller, i) => <tr className="hover" key={seller._id}>
                                        <th>
                                            {i + 1}
                                        </th>
                                        <td>{seller?.name}</td>
                                        <td>{seller?.email}</td>
                                        <td>
                                            {
                                                seller?.isVerified === "true"
                                                    ?  <label className="btn disabled btn-secondary btn-xs">Verified</label>
                                                    :
                                                    <label onClick={() => handelVerify(seller._id)} htmlFor="confirmation-modal" className="btn btn-info btn-xs">Verify</label>
                                            }
                                        </td>
                                        <td>
                                            <label onClick={() => setDeleteseller(seller)} htmlFor="confirmation-modal" className="btn btn-error btn-xs">Delete</label>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {
                    deleteSeller &&
                    <ConfirmationModal
                        title={`Are you sure you want to delete?`}
                        message={`If you delete ${deleteSeller?.name}. You will unable to restore it ever.`}
                        successAction={handelDeleteSeller}
                        buttonContent="Delete"
                        modalData={deleteSeller}
                        closeModal={closeModal}
                    >

                    </ConfirmationModal>
                }
            </div>
        </div>
    );
};

export default AllSeller;