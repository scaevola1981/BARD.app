import { useState } from 'react';
import './notifications-page.css';



const Modal = ({children}) => {
   
    const [modal, setModal]  = useState(false);

    const toggleModal = () => {
     setModal(!modal);
    }
    
    return (
       <>
       <div onClick={toggleModal}>
         {children}
       </div>

       {modal && (
         <div className='modal-container'>
            <div className='modal-content'>
              <h2>Notificari</h2>
              <p>Notificarile mele</p>
              <button onClick={toggleModal}>Inchide</button>
          </div>
        </div>     
       )}
       </>
    )
};

export default Modal;