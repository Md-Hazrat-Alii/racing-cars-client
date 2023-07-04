import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const BookingModal = ({ modalData, setModalData }) => {

    // const { name } = name
    const { user } = useContext(AuthContext)

    const handelOrder = e => {
        e.preventDefault()

        const form = e.target
        const productName = form.productName.value;
        const productImg = form.productImg.value;
        const c_name = form.name.value;
        const email = form.email.value;
        const price = form.price.value;
        const phone = form.phone.value;
        const location = form.meeting_location.value;

        const orderData = {
            productName,
            productImg,
            c_name,
            email, 
            price,
            phone,
            location
        }

        fetch(`${process.env.REACT_APP_server_url}/bookings`, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(orderData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged){
                    setModalData(null)
                    toast.success('Booked successfully')
                }
            })
            .catch(err => {
                console.error(err.message)
                toast.error('Somethig wrong happened.')
            })
            console.log(orderData)
    }


    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label onClick={() => setModalData(null)} htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Book {modalData?.name} now</h3>
                    <form onSubmit={handelOrder} className='mt-5 text-center'>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Product name</span>
                            </label>
                            <input type="text" name='productName' placeholder="Type here" value={modalData?.name} className="input input-bordered w-full" disabled />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Product image</span>
                            </label>
                            <input type="text" name='productImg' placeholder="Type here" value={modalData?.img} className="input input-bordered w-full" disabled />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">your Name</span>
                            </label>
                            <input name='name' type="text" placeholder="Your Name" disabled defaultValue={user?.displayName} required className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">your Email</span>
                            </label>
                            <input name='email' type="email" defaultValue={user?.email} disabled placeholder="Email Address" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input name='price' type="text" defaultValue={`${modalData?.resale_price}$`} disabled placeholder="Price" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input name='phone' type="text" required placeholder="Phone Number" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Meeting Location</span>
                            </label>
                            <input name='meeting_location' type="text" required placeholder="Meeting Location" className="input input-bordered w-full" />
                        </div>
                        <input type="submit" value="Submit" className='btn btn-warning mt-5 w-full' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;