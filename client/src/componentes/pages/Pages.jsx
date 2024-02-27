import React, { useState } from 'react';
import style from './Pages.module.css';

export default function Pages({ maxPokemonsPage, totalPokemons, paginado, paginadoActivated }) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(totalPokemons / maxPokemonsPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const lastPageInBar = Math.min(currentPage + 4, totalPages);

    const handlerClick = (number) => {
        paginado(number);
        setCurrentPage(number);
        // paginadoActivated(number);
    };

    const goToFirstPage = () => {
        handlerClick(1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            handlerClick(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            handlerClick(currentPage - 1);
        }
    };

    return (
        <div className={style.mainContainer}>
            <ul className={style.uList}>
                {currentPage > 1 && (
                    <li className={style.numberPage}>
                        <a className={style.aNumber} onClick={goToFirstPage}>
                            {'<<'}
                        </a>
                    </li>
                )}

                {pageNumbers
                    .slice(currentPage - 1, lastPageInBar)
                    .map((number) => (
                        <li key={number} className={style.numberPage}>
                            <a
                                className={currentPage === number ? style.active : style.aNumber}
                                onClick={() => handlerClick(number)}
                            >
                                {number}
                            </a>
                        </li>
                    ))}

                {currentPage < totalPages && (
                    <li className={style.numberPage}>
                        <a className={style.aNumber} onClick={goToNextPage}>
                            {'>>'}
                        </a>
                    </li>
                )}
            </ul>
        </div>
    );
}
