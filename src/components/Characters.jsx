import React, { useState, useEffect, useReducer, useMemo, useRef, useCallback } from 'react';
import Search from './Search';
//inicializadmos el state de favorites
const initialState ={
    favorites: [],
}


//Crear nuestro Reducer
const favoriteReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_FAVORITE': 
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            };
        default:
            return state;
    }
}

const Characters = () => {

    /**
     * Lógica de useState
     * constante donde internamente estructuramos los elementos que necesitamos
     * de useState y lo iniciamos como un array vacío
     */
    const [characters, setCharacters] = useState([]);
    /**
     * implementacion de useReducer, y dispatch
     */
    const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

    /**
     * Implementacion de useMemo
     */
    const [search, setSearch] = useState('');

    /**
     * Implementacion de useRef
     */
    const searchInput = useRef(null);


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

    //funcion que se encarga de agregar informacion al estado de favorites
    const handleClick = favorite => {
        dispatch({type: 'ADD_TO_FAVORITE', payload: favorite })
    }

    //funcion que se encarga de realizar la busqueda 
    // const handleSearch = () => {

    //     setSearch(searchInput.current.value);
    // }

    const handleSearch = useCallback(() => {
        setSearch(searchInput.current.value);
    }, []);

    // const filteredUsers = characters.filter((user) => {
    //     return user.name.toLowerCase().includes(search.toLowerCase());
    // });

    //Utilizacion de useMemo 
    const filteredUsers = useMemo(() => 

        characters.filter((user) => {
            return user.name.toLowerCase().includes(search.toLowerCase());
        }),
        [characters,search]
    );

    return (

        <div className="container">
                    
            <div className="row">
                {/* Mostrar el contenido de nuestros elementos favoritos */}
                <h2>Lista de favoritos</h2>
                {favorites.favorites.map(favorite =>(
                    <li key={favorite.id}>
                        {favorite.name}
                    </li>
                ))}

                {/*Crear div para la busqueda */}
                <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />

                {/* Nombre del personaje
                        Iteramos por cada uno de los elementos */}
                <h2>Lista de personajes</h2>
                {filteredUsers.map((character) => (
                    <div className="item" key={character.id}>
                        <>
                            <img className="character__img" src={character.image} alt="" />
                            <h2 className="character__name">{character.name}</h2>
                            <button 
                                type="burron" 
                                onClick={() => handleClick(character)}
                            >
                                Agregar a Favoritos
                            </button>
                        </>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default Characters;