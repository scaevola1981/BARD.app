
import Header from './Header/header';
import Navbar from './NavBar/navBar';
import Categories  from './Categories/categories';
import Card from './Card/card';
import Footer from './Footer/footer'
import LazyImage from './LazyImage/lazyImage';


const Home = () => {
    return (
    <>
      <Header/>
      <Navbar/>
      <Categories/>
      <Card/>
      <Footer/>
      <LazyImage/>
    </>
    )
}

export default Home ;