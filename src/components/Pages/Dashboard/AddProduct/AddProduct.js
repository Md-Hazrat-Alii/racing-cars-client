import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthProvider/AuthProvider';

const AddProduct = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const handelSubmit = e => {
        e.preventDefault()

        const form = e.target
        const seller_name = form.name.value
        const name = form.product_name.value
        const category = form.category.value
        const location = form.location.value
        const seller_email = user?.email
        const posted_time = new Date().toDateString()
        const years_of_use = form.years_of_use.value
        const resale_price = form.resale_price.value
        const original_price = form.original_price.value
        const isAdvertised = "false"
        const isReported = "false"
        const img = form.img.files[0]

        const imgbbURL = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_key}`

        const formData = new FormData()
        formData.append('image', img)
        fetch(imgbbURL, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData) {
                    const product = {
                        name,
                        category,
                        location,
                        resale_price,
                        original_price,
                        years_of_use,
                        posted_time,
                        seller_name,
                        seller_email,
                        isAdvertised,
                        isReported,
                        img: imgData.data.url
                    }

                    console.log(product)
                    fetch(`${process.env.REACT_APP_server_url}/addproduct`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            toast.success(`${name} added successfully`)
                            form.reset()
                            navigate('/dashboard/my-products')
                        })
                        .catch(err => {
                            console.err(err)
                            toast.error(err.message)
                        })
                }
            })
    }
    return (
        <div className='mx-10 my-10'>
            <h1 className='text-3xl mb-7 font-semibold'>Add A Product</h1>
            <div className="card bg-slate-200 shadow-xl md:mx-20">
                <div className="card-body">
                    <h1 className='text-center font-semibold text-3xl mx-10 text-warning'>Please provide the info to add a product!</h1>
                    <form onSubmit={handelSubmit} className='mx-5'>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Seller Name</span>
                            </label>
                            <input name='name' type="text" placeholder="Seller Name" defaultValue={user?.displayName} readOnly required className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input name='product_name' type="text" placeholder="Product Name" required className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Product Image</span>
                            </label>
                            <input type="file" name='img' required className="file-input file-input-bordered file-input-warning" />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Select Categories</span>
                            </label>
                            <select name='category' className="select select-bordered w-full">
                                <option>Tesla</option>
                                <option>Audi</option>
                                <option>Mercedes</option>
                            </select>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Location</span>
                            </label>
                            <input type="text" name='location' placeholder="Location" required className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Resale Price</span>
                            </label>
                            <input type="text" name='resale_price' placeholder="Resale Price" required className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Original Price</span>
                            </label>
                            <input type="text" name='original_price' placeholder="Original Price" required className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Year's Of Use</span>
                            </label>
                            <input type="text" name='years_of_use' placeholder="Year's Of Use" required className="input input-bordered w-full" />
                        </div>

                        <div className=' mt-3 text-center'>
                            <button type="submit" className='btn btn-warning'>Add product</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;