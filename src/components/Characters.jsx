import React, { useState, useEffect } from 'react';

const Characters = () => {

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
    useEffect(() => {
        // useEffect llama a fetch, el cual obtiene la informacion de la api de RickAndMorty
        fetch('https://rickandmortyapi.com/api/character/')
        .then(response => response.json())
        .then(data => setCharacters(data.results));

    }, []);

    return (

        <div className="container">
                    
            <div className="row">
                {/* Nombre del personaje
                        Iteramos por cada uno de los elementos */}
                {characters.map((character) => (
                    <div className="col">
                        <>
                            <img className="character__img" src={character.image} alt="" />
                            <h2 className="character__name">{character.name}</h2>
                        </>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default Characters;