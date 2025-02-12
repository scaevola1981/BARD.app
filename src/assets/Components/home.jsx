
import Header from './Header/header';
import Navbar from './NavBar/navBar';
import Categories  from './Categories/categories';
import Card from './Card/card';
import Footer from './Footer/footer';
import categoriesData from './Categories/categoriesData'
import cardData from './Card/cardData'



const Home = () => {
    return (
    <>
      <Header/>
      <Navbar />
      <Categories categories={categoriesData}/>
      <Card cardData={cardData}/>
      <Footer/>
    </>
    )
}

export default Home ;