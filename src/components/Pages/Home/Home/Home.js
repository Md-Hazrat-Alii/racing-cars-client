import React from 'react';
import Ads from '../Ads/Ads';
import Cards from '../Cards/Cards';
import Contact from '../Contact/Contact';
import Hero from '../Hero/Hero';
import HomeBanner from '../HomeBanner/HomeBanner';
import HomeCategories from '../HomeCategories/HomeCategories';


const Home = () => {
    return (
        <div>
            <HomeBanner></HomeBanner>
            <HomeCategories></HomeCategories>
            <Hero></Hero>
            <Ads></Ads>
            <Cards></Cards>
            <Contact></Contact>
        </div>
    );
};

export default Home;