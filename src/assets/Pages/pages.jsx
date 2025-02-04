

import { Routes, Route } from "react-router-dom";
import Chat from './Chat/chat'
import Home from '../Components/home'
import Favorite from "./Favorite-icon/favorite";

const Pages = () => {
     return (
        
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path='/chat' element={ <Chat/>}/>
            <Route path='/favorite-icon' element={<Favorite/>}/>
        </Routes>
     )
}

export default Pages;