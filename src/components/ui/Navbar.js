import React from 'react'

export const Navbar = () => {
    return (
        <div className='navbar navbar-dark bg-dark mb-3'>
            <span className='navbar-brand'>
                Fernando
            </span>

            <button className='btn btn-outline-danger'>
                <i className='fas fa-sign-out-alt'></i>
                <span> Salir</span>
                
            </button>
            
        </div>
    )
}
