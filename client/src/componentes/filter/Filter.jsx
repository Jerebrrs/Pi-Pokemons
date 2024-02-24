import React from 'react';
import { useDispatch } from 'react-redux';
import { filterTypes, orderFilter, refresh } from '../../redux/actions';

function Filter({ name, all, opciones, paginado, ordenado, defaultOption, paginadoActivated }) {
    const dispatch = useDispatch();

    const handlerChange = async (event) => {
        const targetName = event.target.name;
        const targetValue = event.target.value;
  
        console.log('Target Name:', targetName); // Verifica el nombre del target
        console.log('Target Value:', targetValue);



        paginadoActivated();
        switch (targetName) {
            case 'Types':
                paginado(1);
                event.target.value === 'All types'
                    ? dispatch(refresh())
                    : dispatch(filterTypes(targetValue));
                break;
            default:
                paginado(1);
                ordenado(targetValue);
                dispatch(orderFilter(targetValue))
                break;
        }
    };


    function capitalize(word) {
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
    }
    return (
        <div>

            <select
                defaultValue={defaultOption}
                name={name}
                id={name}
                onChange={handlerChange}>
                <option hidden key={defaultOption} value={defaultOption}>
                    {defaultOption}
                </option>

                <option key={all} value={all}>
                    {all}
                </option>

                {opciones?.map((element, index) => (
                    <option key={element} value={element}>
                        {capitalize(element)}
                    </option>
                ))}
            </select>
        </div>
    );

}

export default Filter;


