import Header from './Header/header';
import Navbar from './NavBar/navBar';
import Categories from './Categories/categories';
import Card from './Card/card';
import Footer from './Footer/footer';
import categoriesData from './Categories/categoriesData';
import cardData from './Card/cardData';
import AddPostForm from '../Pages/FormAddPost/AddPostForm';

const Home = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Categories categories={categoriesData} />
      <Card cardData={cardData} />
      <AddPostForm/>
      <Footer />
    </>
  );
};

export default Home;
