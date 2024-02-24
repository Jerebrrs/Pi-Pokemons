
import React, { useState } from 'react';
import style from './Pages.module.css';

export default function Pages({ maxPokemonsPage, pokemons, paginado }) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(pokemons / maxPokemonsPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Calcular el índice de la última página que se mostrará en la barra de paginación
    const lastPageInBar = Math.min(currentPage + 4, totalPages);

    const handlerClick = (number) => {
        paginado(number);
        setCurrentPage(number);
    };

    const goToFirstPage = () => {
        handlerClick(1);
    };

    const goToNextPage = () => {
        handlerClick(currentPage + 1);
    };

    return (
        <div className={style.mainContainer}>
            <ul className={style.uList}>
                {/* Botón para ir a la primera página */}
                {currentPage > 1 && (
                    <li className={style.numberPage}>
                        <a className={style.aNumber} onClick={goToFirstPage}>
                            {'<<'}
                        </a>
                    </li>
                )}

                {/* Renderizar las cinco páginas */}
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

                {/* Botón para ir a la siguiente página */}
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



// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import style from './Pages.module.css';

// export default function Pages({ maxPokemonsPage, pokemons, paginado }) {
// 	const [activated, setActivated] = useState({
// 		1: true,
// 	});

// 	const loading = useSelector((state) => state.loading);

// 	const handlerClick = (event, number) => {
// 		const clicked = event.target.name;
// 		paginado(number);
// 		setActivated({
// 			[clicked]: true,
// 		});
// 	};
// 	const pageNumbers = [];
// 	for (let i = 0; i <= Math.ceil(pokemons / maxPokemonsPage) - 1; i++) {
// 		pageNumbers.push(i + 1);
// 	}

// 	return (
// 		<>
// 			<div className={style.mainContainer}>
// 				<ul className={style.uList}>
// 					{pageNumbers?.map((number) => (
// 						<li key={number} className={style.numberPage}>
// 							<a
// 								name={number}
// 								className={`${
// 									activated[number] ? style.active : style.aNumber
// 								}`}
// 								onClick={(event) => handlerClick(event, number)}
// 							>
// 								{number}
// 							</a>
// 						</li>
// 					))}
// 				</ul>
// 			</div>
// 			{loading ? null : (
// 				<div className={style.mainContainer}>
// 					<ul className={style.uList}>
// 						{pageNumbers?.map((number) => (
// 							<li key={number} className={style.numberPage}>
// 								<a
// 									name={number}
// 									className={`${
// 										activated[number] ? style.active : style.aNumber
// 									}`}
// 									onClick={(event) => handlerClick(event, number)}
// 								>
// 									{number}
// 								</a>
// 							</li>
// 						))}
// 					</ul>
// 				</div>
// 			)}
// 		</>
// 	);
// }