
import Featured from "./Featured";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";

const LandingPage = () => {
    return (
      <div>
            <Navbar></Navbar>
        <HeroSection></HeroSection>
        
            <Featured></Featured>
            
            
      </div>
    );
};

export default LandingPage;


//  <div className="flex justify-center mx-[600px] px-12 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-500 to-red-500">
//    <h2 className="font-semibold text-4xl">Newest</h2>
//    <h2 className="font-semibold text-4xl ml-2">Treasures</h2>
//  </div>;