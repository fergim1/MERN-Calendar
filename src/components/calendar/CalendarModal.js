import React, { useState } from "react";
import Modal from "react-modal";
import DateTimePicker from 'react-datetime-picker';

import "./styleModal.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/uiAction";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const now = moment().minute(0).second(0).add( 1 , 'hours')
const nowPlus1 = now.clone().add( 1 , 'hours')




export const CalendarModal = () => {

  const dispatch = useDispatch()
  
  const [ dateStart, setDateStart ] = useState( now.toDate() )
  const [ dateEnd, setDateEnd ] = useState( nowPlus1.toDate() )
  const [formValues, setFormValues] = useState({
    title: 'Evento',
    start: now.toDate(),
    end: nowPlus1.toDate(),
    notes: ''
  })
  const [ titleValid, setTitleValid ] = useState(true)

  const { modalOpen } = useSelector(state => state.ui)
  const [modalOpened, setModalOpened] = useState(modalOpen)
  console.log( modalOpen)


  const { title, notes } = formValues;

  const handleInputChange = ( { target } ) => {
    setFormValues( {
      ...formValues,
      [ target.name ] : target.value
    })
  }

  const handleSubmitForm = ( e ) => {
    e.preventDefault();
        
    if( title.trim().length < 2 ){
      return setTitleValid ( false )
    }
    setTitleValid ( true )
    closeModal()
  }

  const closeModal = () => {
    console.log("cerrando....");
    dispatch( uiCloseModal() )
    setModalOpened(false)
  };

  const handleStartDateChange = ( e ) => {
    setDateStart(e);

  }

  const handleEndDateChange = ( e ) => {
    setDateEnd( e );
  }

  return (
    <Modal
      isOpen={modalOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h3> Nuevo evento </h3>
      <hr />
      <form 
        className="container"
        onSubmit= { handleSubmitForm }
      >
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={ handleStartDateChange }
            value={ dateStart }
            className='form-control'
            disableClock={ true }
            clearIcon= {<i className="fas fa-times"></i>}
            calendarIcon= {<i className="far fa-calendar-alt"/>}
          />

        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={ handleEndDateChange }
            value={ dateEnd }
            className='form-control'
            disableClock={ true }
            minDate= { dateStart }
            clearIcon= {<i className="fas fa-times"></i>}
            calendarIcon= {<i className="far fa-calendar-alt"/>}
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={ `form-control ${ !titleValid && 'is-invalid' } `}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value= { title }
            onChange= { handleInputChange }
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value= { notes }
            onChange= { handleInputChange }
          ></textarea>

          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
