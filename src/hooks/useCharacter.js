import { useState, useEffect } from 'react'

const useCharacters = url => {

    /**
     * Lógica de useState
     * constante donde internamente estructuramos los elementos que necesitamos
     * de useState y lo iniciamos como un array vacío
     */
    const [characters, setCharacters] = useState([]);

    /**
     * Lógica de useEffect
     * es una función con 2 parámetros
     * el primero es una función anónima donde va a estar la lógica
     * el segundo es una variable que esta escuchando si hay cambios 
     */
    useEffect(()=> {
        //llamado a nuestro fetch
        fetch(url)
        .then(response => response.json())
        .then(data => setCharacters(data.results))
    }, [url]);
    
    return characters;
};

export default useCharacters;