import React, { useState } from 'react';

const Header = () => {

    //declaracion de un estado con un valor por defecto
    const [darkMode, setDarkMode] = useState(false);

    const handleClick = () => {

        setDarkMode(!darkMode);
    }

    return ( 
        <div className="header">
            <h1>ReactHooks</h1>

            { /*Hacer el llamado del mi funcion para setear el estado*/ }
            <button type='button' onClick={handleClick}>{darkMode ? 'Dark Mode' : 'Light Mode'}</button>
            { /*Hacer el llamado del una funcion anonima*/ }
            <button type='button' onClick={() => setDarkMode(!darkMode)}>{darkMode ? 'Dark Mode 2' : 'Light Mode 2'}</button>
        </div>
     );
}
 
export default Header;