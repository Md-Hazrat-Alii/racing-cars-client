import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../context/AuthProvider/AuthProvider';
import ConfirmationModal from '../../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../../Shared/Loading/Loading';

const MyProducts = () => {
    const { user } = useContext(AuthContext)
    const [deleteProduct, setDeleteProduct] = useState(null)

    const url = `${process.env.REACT_APP_server_url}/myproducts?email=${user?.email}`

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products', user?.email],
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

    const handelDeleteProduct = (product) => {
        fetch(`${process.env.REACT_APP_server_url}/deleteProduct/${product._id}`, {
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
                    toast.success(`${product.name} deleted successfully`)
                }
            })
    }

    const handelAdvertise = (product) => {
        fetch(`${process.env.REACT_APP_server_url}/advertiseProduct/${product._id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if (result.modifiedCount > 0) {
                    refetch()
                    toast.success(`${product.name} advertised successfully`)
                }
            })

    }

    const closeModal = () => {
        setDeleteProduct(null)
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h1 className='text-3xl mb-7 font-semibold'>My Products</h1>
            <h1 className='text-xl mb-4 font-semibold'>You have {products?.length} data.</h1>
            <div>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Sale State</th>
                                <th>Delete</th>
                                <th>Advertise</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products &&
                                products?.map((product, i) => <tr className="hover" key={product._id}>
                                    <th>
                                        {i + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={product?.img} alt="img" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{product?.name}</td>
                                    <td>{product?.category}</td>
                                    <td>{product?.resale_price}</td>
                                    <td>
                                        <button className='btn btn-warning btn-xs'>Abailable</button>
                                    </td>
                                    <td>
                                        <label onClick={() => setDeleteProduct(product)} htmlFor="confirmation-modal" className="btn btn-error btn-xs">Delete</label>
                                    </td>
                                    <td>
                                        {
                                            product?.isAdvertised === 'true'
                                            ?
                                                <button className="btn btn-success btn-xs">Ad running</button>
                                            :
                                                <button onClick={() => handelAdvertise(product)} className="btn btn-warning btn-xs">Play Ad</button>
                                        }
                                    </td>
                                </tr>)
                            }
                        </tbody>

                    </table>
                </div>
                {
                    deleteProduct &&
                    <ConfirmationModal
                        title={`Are you sure you want to delete?`}
                        message={`If you delete ${deleteProduct?.name}. You will unable to restore it ever.`}
                        successAction={handelDeleteProduct}
                        buttonContent="Delete"
                        modalData={deleteProduct}
                        closeModal={closeModal}
                    >

                    </ConfirmationModal>
                }
            </div>
        </div>
    );
};

export default MyProducts;