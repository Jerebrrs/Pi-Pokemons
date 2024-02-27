import React, { useState } from 'react';
import style from './Pages.module.css';

export default function Pages({ maxPokemonsPage, totalPokemons, paginado }) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(totalPokemons / maxPokemonsPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlerClick = (number) => {
        paginado(number);
        setCurrentPage(number);
    };

    const goToFirstPage = () => {
        handlerClick(1);
    };

    const goToLastPage = () => {
        handlerClick(totalPages);
    };

    const goToNextPage = () => {
        const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;
        handlerClick(nextPage);
    };

    const goToPreviousPage = () => {
        const previousPage = currentPage > 1 ? currentPage - 1 : 1;
        handlerClick(previousPage);
    };

    // Lógica para mostrar solo 4 números de página
    const firstPageInBar = Math.max(currentPage - 1, 1);
    const lastPageInBar = Math.min(firstPageInBar + 3, totalPages);

    return (
        <div className={style.mainContainer}>
            <ul className={style.uList}>
                <li className={style.numberPage}>
                    <a className={style.aNumber} onClick={goToFirstPage}>
                        {'<<'}
                    </a>
                </li>

                <li className={style.numberPage}>
                    <a className={style.aNumber} onClick={goToPreviousPage}>
                        {'<'}
                    </a>
                </li>

                {pageNumbers
                    .slice(firstPageInBar - 1, lastPageInBar)
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

                <li className={style.numberPage}>
                    <a className={style.aNumber} onClick={goToNextPage}>
                        {'>'}
                    </a>
                </li>

                <li className={style.numberPage}>
                    <a className={style.aNumber} onClick={goToLastPage}>
                        {'>>'}
                    </a>
                </li>
            </ul>
        </div>
    );
}