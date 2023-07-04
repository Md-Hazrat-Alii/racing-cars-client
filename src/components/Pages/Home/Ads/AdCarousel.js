import React from 'react';

const AdCarousel = ({ product, i }) => {
    return (
            <div id={`#slide${i + 1}`} className="carousel-item relative w-full ">
                <img src={product.img} alt='' className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide4" className="btn btn-circle">❮</a>
                    <a href={`#slide${i + 1}`} className="btn btn-circle">❯</a>
                </div>
            </div>
    );
};

export default AdCarousel;