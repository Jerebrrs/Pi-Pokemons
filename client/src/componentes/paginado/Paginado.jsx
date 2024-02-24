// import React, { useState } from 'react'
// import { connect } from 'react-redux';
// import { setPagePokemon } from '../../redux/actions'
// import stylos from './Paginado.module.css'
// import { useEffect } from 'react';

// const Paginado = ({ pokemon, setPagePokemon }) => {


//     const [poke, Setpoke] = useState(pokemon);
//     const [pokePerPage] = useState(12); //poke por paginas
//     const [currentPage, SetCurrentPage] = useState(1); // pagina actual

//     const onPageChangeEvent = (start, end) => {
//         if (!isNaN(start) && !isNaN(end)) {
//             setPagePokemon(start, end)
//         };
//     };

//     let pages = Math.ceil(poke.length / pokePerPage); // calculamos el numero de paginas

//     const buttons = [];
//     for (let i = 1; i <= pages; i++) {
//         buttons.push(i);
//     };

//     //paginas anterior/siguiente
//     const handlePrev = () => {
//         console.log("Página anterior:", currentPage - 1);
//         SetCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
//     };
//     const handleNext = () => {
//         console.log("Página siguiente:", currentPage + 1);
//         SetCurrentPage((prev) => (prev < buttons.length ? prev + 1 : prev))
//     };

//     const start = () => {
//         console.log("Inicio de la página");
//         SetCurrentPage(1);
//     };

//     const end = () => {
//         console.log("Fin de la página");
//         SetCurrentPage(buttons.length);
//     };

//     const [arrButons, setarrButons] = useState([]);

//     useEffect(() => {
//         console.log("currentPage:", currentPage);
//         console.log("buttons:", buttons);
//         console.log("pokePerPage:", pokePerPage);
//         console.log("poke:", poke);

//         if (poke.length !== pokemon.length) Setpoke(pokemon);
//         let templateButtons = [...arrButons];

//         if (buttons.length < 4) {
//             templateButtons = buttons;
//         } else if (currentPage >= 1 && currentPage <= 2) {
//             templateButtons = [1, 2, 3];
//         } else if (currentPage > 2 && currentPage < buttons.length - 1) {
//             const numPrev = buttons.slice(currentPage - 2, currentPage);
//             const numNext = buttons.slice(currentPage, currentPage + 1);

//             templateButtons = [...numPrev, ...numNext];
//         } else if (currentPage > buttons.length - 3) {
//             const sliced = buttons.slice(buttons.length - 3);
//             templateButtons = [...sliced];
//         }

//         setarrButons(templateButtons);

//         const value = currentPage * pokePerPage;


//         onPageChangeEvent(value - pokePerPage, value);
//     }, [pokemon, currentPage, pokePerPage, pages]);


//     return (
//         <div className={stylos.container}>
//             <div className={stylos.pagination}>
//                 <ul>
//                     <li
//                         className={`${stylos.items} ${currentPage === 1 ? "disabled" : ""}`}
//                     >
//                         <a className={stylos.arrow} onClick={start}>
//                             ❮❮
//                         </a>
//                         <a className={stylos.arrow} onClick={handlePrev}>
//                             ❮
//                         </a>
//                     </li>
//                     {buttons.map((data, index) => {

//                         return (
//                             <li key={index} className={`${stylos.items}`}>
//                                 <a
//                                     className={`${currentPage === data ? stylos.current : stylos.diferents}`} onClick={() => SetCurrentPage(data)} >
//                                     {data}
//                                 </a>
//                             </li>
//                         )
//                     })}
//                     <li className={`${stylos.items} ${currentPage === buttons.length ? "disebled" : ""}`}>
//                         <a className={stylos.arrow} onClick={handleNext}>
//                             ❯
//                         </a>
//                         <a className={stylos.arrow} onClick={end} >
//                             ❯❯
//                         </a>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     )
// }

// const mapStateToProps = (state) => {
//     return {
//         pokemon: state.pokemon,
//         allpokemon: state.allPokemon,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         setPagePokemon: (start, end) => {
//             dispatch(setPagePokemon(start, end));
//         }
//     };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Paginado);


// import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import { setPagePokemon } from '../../redux/actions';
// import stylos from './Paginado.module.css';

// const Paginado = ({ pokemon, setPagePokemon }) => {
//     const [pokePerPage] = useState(12); // Pokemones por página
//     const [currentPage, setCurrentPage] = useState(1); // Página actual

//     useEffect(() => {
//         const start = (currentPage - 1) * pokePerPage;
//         const end = start + pokePerPage;
//         setPagePokemon(start, end);
//     }, [currentPage, pokePerPage, setPagePokemon]);

//     const totalPages = Math.ceil(pokemon.length / pokePerPage);

//     const handlePrev = () => {
//         setCurrentPage(prev => Math.max(prev - 1, 1));
//     };

//     const handleNext = () => {
//         setCurrentPage(prev => Math.min(prev + 1, totalPages));
//     };

//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     return (
//         <div className={stylos.container}>
//             <div className={stylos.pagination}>
//                 <ul>
//                     <li className={`${stylos.items} ${currentPage === 1 ? "disabled" : ""}`}>
//                         <a className={stylos.arrow} onClick={() => handlePageChange(1)}>❮❮</a>
//                         <a className={stylos.arrow} onClick={handlePrev}>❮</a>
//                     </li>
//                     {[...Array(totalPages)].map((_, index) => (
//                         <li key={index} className={stylos.items}>
//                             <a
//                                 className={currentPage === index + 1 ? stylos.current : stylos.diferents}
//                                 onClick={() => handlePageChange(index + 1)}
//                             >
//                                 {index + 1}
//                             </a>
//                         </li>
//                     ))}
//                     <li className={`${stylos.items} ${currentPage === totalPages ? "disabled" : ""}`}>
//                         <a className={stylos.arrow} onClick={handleNext}>❯</a>
//                         <a className={stylos.arrow} onClick={() => handlePageChange(totalPages)}>❯❯</a>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     );
// };

// const mapStateToProps = (state) => {
//     return {
//         pokemon: state.pokemon,
//         allpokemon: state.allPokemon,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         setPagePokemon: (start, end) => {
//             dispatch(setPagePokemon(start, end));
//         },
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Paginado);

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setPagePokemon } from '../../redux/actions';
import stylos from './Paginado.module.css';

const Paginado = ({ pokemon, setPagePokemon }) => {
    const [pokePerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const startIndex = (currentPage - 1) * pokePerPage;
        const endIndex = Math.min(startIndex + pokePerPage, pokemon.length);
        setPagePokemon(startIndex, endIndex);
    }, [pokemon, currentPage, pokePerPage]);

    const handlePrev = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(pokemon.length / pokePerPage)));
    };

    return (
        <div className={stylos.container}>
            <div className={stylos.pagination}>
                <ul>
                    <li className={`${stylos.items} ${currentPage === 1 ? "disabled" : ""}`}>
                        <a className={stylos.arrow} onClick={() => setCurrentPage(1)}>❮❮</a>
                        <a className={stylos.arrow} onClick={handlePrev}>❮</a>
                    </li>
                    {Array.from({ length: Math.ceil(pokemon.length / pokePerPage) }).map((_, index) => (
                        <li key={index} className={`${stylos.items}`}>
                            <a
                                className={`${currentPage === index + 1 ? stylos.current : stylos.diferents}`}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </a>
                        </li>
                    ))}
                    <li className={`${stylos.items} ${currentPage === Math.ceil(pokemon.length / pokePerPage) ? "disabled" : ""}`}>
                        <a className={stylos.arrow} onClick={handleNext}>❯</a>
                        <a className={stylos.arrow} onClick={() => setCurrentPage(Math.ceil(pokemon.length / pokePerPage))}>❯❯</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        pokemon: state.pokemon,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setPagePokemon: (start, end) => {
            dispatch(setPagePokemon(start, end));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Paginado);