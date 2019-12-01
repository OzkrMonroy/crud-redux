import React, { useState } from "react";
// import { withRouter } from 'react-router-dom'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { validarFormularioAction, validacionExito, validacionError } from '../actions/validarAction'
import { crearNuevoProductoAction } from '../actions/productosActions'

const NuevoProducto = ({history}) => {
  const [nombre, guardarNombre] = useState('')
  const [precio, guardarPrecio] = useState('')

  const dispatch = useDispatch()
  const nuevoProducto = (producto) => dispatch(crearNuevoProductoAction(producto))
  const validarFormulario = () => dispatch(validarFormularioAction())
  const exitoValidacion = () => dispatch( validacionExito() )
  const errorValidacion = () => dispatch( validacionError() )

  const error = useSelector(state => state.error.error)
  
  const submitNuevoProducto = e => {
    e.preventDefault()
    
    validarFormulario()

    if(nombre.trim() === '' || precio.trim() === ''){
      errorValidacion()
      return
    }

    exitoValidacion()
    nuevoProducto({
      nombre,
      precio
    })

    validarFormulario(false)
    history.push('/')

  }

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-8">
        {(error) ? <div className="alert alert-danger text-center text-weight-bold">Todos los Campos son obligatorios</div> : null}
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold ">
              Agregar Nuevo Libro
            </h2>
            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label>Nombre Libro</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Libro"
                  value={nombre}
                  onChange={e => guardarNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Precio Libro</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Precio Libro"
                  value={precio}
                  onChange={e => guardarPrecio(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
// export default withRouter(NuevoProducto);
