import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo1.png'
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const Header = () => {

    const { user, logOut } = useContext(AuthContext)

    const handelLogout = () => {
        logOut()
            .then(res => {
                console.log('logout successfull')
                localStorage.removeItem('accessToken')
            })
            .catch(err => console.log(err))
    }

    const menuItems = <React.Fragment>
        <li><Link to='/home'>Home</Link></li>
        <li><Link to='/categories'>Categories</Link></li>
        <li><Link to='/blog'>Blog</Link></li>
        {
            user
                ?
                <>
                    <Link to='/dashboard' className="btn btn-ghost">Dashboard</Link>
                    <Link onClick={handelLogout} className="btn btn-warning">LogOut</Link>
                </>
                :
                <Link to='/login' className="btn btn-warning">Login</Link>
        }
    </React.Fragment>

    const dashboardItems = <>
        {
        user ?
            <>
                    <li><Link>My Bookings</Link></li>
                    <li><Link>My Products</Link></li>
                    <li><Link>Add Product</Link></li>
            </>
        :
            <></>}
    </>


    return (
        <div>
            <div className="navbar bg-base-100 p-0 flex justify-between">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menuItems}
                        </ul>
                    </div>
                    <Link className="normal-case text-xl w-36 pr-0">
                        <img src={logo} alt="" srcSet="" />
                    </Link>
                    <h1 className='text-2xl font-bold'>RC Cars</h1>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {menuItems}
                    </ul>
                </div>

                <div className="dropdown dropdown-bottom dropdown-end lg:hidden">
                    <label tabIndex={2} htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={3} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-28">
                        {dashboardItems}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;