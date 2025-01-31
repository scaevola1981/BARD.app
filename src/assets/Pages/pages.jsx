

import { Routes, Route } from "react-router-dom";
import Chat from './Chat/chat'
import Home from '../Components/home'

const Pages = () => {
     return (
        
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path='/chat' element={ <Chat/>}/>
        </Routes>
     )
}

export default Pages;