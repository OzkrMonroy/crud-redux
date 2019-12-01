import React, { useEffect, useRef } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { obtenerProductoEditarAction, editarProductoAction } from "../actions/productosActions";
import { validarFormularioAction, validacionExito, validacionError } from '../actions/validarAction'
import Swal from 'sweetalert2'

const EditarProducto = ({ match, history }) => {
  const dispatch = useDispatch();
  const editarProducto = producto => dispatch( editarProductoAction(producto) )
  // Obtener el id
  const { id } = match.params;

  // crear los Ref
  const nombreRef = useRef('')
  const precioRef = useRef('')

  useEffect(() => {
    dispatch(obtenerProductoEditarAction(id));
  }, [dispatch, id]);

  const producto = useSelector(state => state.productos.producto)
  const error = useSelector(state => state.error.error)

  const validarFormulario = () => dispatch(validarFormularioAction())
  const exitoValidacion = () => dispatch( validacionExito() )
  const errorValidacion = () => dispatch( validacionError() )

  const submitEditarProducto = e => {
    e.preventDefault()
    
    const nombre = nombreRef.current.value
    const precio = precioRef.current.value
    // Validacion
    validarFormulario()
    if(nombre.trim() === '' || precio === '') {
      errorValidacion()
      return
    }

    // No hay error
    exitoValidacion()

    // Editar
    editarProducto({
      id,
      nombre,
      precio
    })
    // Mostrar Alerta
    Swal.fire(
      'Editado',
      'El libro se editó correctamente',
      'success'
    )

    // Reedireccionar
    history.push('/')
  }

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-8">
      {(error) ? <div className="alert alert-danger text-center text-weight-bold">Todos los Campos son obligatorios</div> : null}
        <div className="card">
          <div className="card-body">
            <h2 className="text-center">Editar Producto</h2>
            <form
              onSubmit={submitEditarProducto}
            >
              <div className="form-group">
                <label>Titulo</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Titulo"
                  defaultValue={producto.nombre}
                  ref={nombreRef}
                />
              </div>
              <div className="form-group">
                <label>Precio del Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Precio"
                  defaultValue={producto.precio}
                  ref={precioRef}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
