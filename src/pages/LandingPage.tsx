import AboutUs from "./AboutUs";
import Category from "./Category";
import ContactUs from "./ContactUs";
import Footer from "./Footer";

import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import Products from "./Products";


const LandingPage = () => {
  return (
    <>
      <div id="Navbar">
        <Navbar></Navbar>
      </div>
      <div id="HeroSection">
        <HeroSection></HeroSection>
      </div>
      <Category></Category>
      <Products></Products>

      <div id="AboutUs">
        <AboutUs></AboutUs>
      </div>
      <div id="ContactUs"> 
        <ContactUs></ContactUs>
      <Footer></Footer>
      </div>
      
    </>
  );
};

export default LandingPage;
