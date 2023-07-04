import React from 'react';
import banner from '../../../../assets/banner.jpg'

const HomeBanner = () => {
    return (
        <div>
            <div className="hero min-h-screen to-cyan-0 from-gray-900" style={{ backgroundImage: `url(${banner})` }}>
                <div 
                className="hero-overlay bg-opacity-50 bg-gradient-to-r rounded-lg">
                </div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-3xl font-bold text-white">Hello there, Wellcome To</h1>
                        <h1 className="mb-5 text-5xl font-bold text-warning">RC Cars.</h1>
                        <p className="mb-5">It is platform for resell cars. You can buy and sell your used cars here. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <button className="btn btn-warning" onClick={ () => console.log("triggered")}>Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;