import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../actions/uiAction';



export const AddNewFab = () => {

    const dispatch = useDispatch();

    const handleFabClick = () =>{
        dispatch( uiOpenModal() )
    }

    return (
        <button
            className='btn btn-primary fab'
            onClick={ handleFabClick }
        >
            <i className='fas fa-plus'></i>
            
        </button>
    )
}
