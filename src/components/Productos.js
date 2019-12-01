import React, { useEffect } from "react";
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { obtenerProductosAction } from '../actions/productosActions'
import Producto from "./Producto";

const Productos = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const cargarProductos = () => dispatch(obtenerProductosAction())
    cargarProductos()
  }, [dispatch])

  const loading = useSelector(state => state.productos.loading)
  const error = useSelector(state => state.productos.error)
  const productos = useSelector(state => state.productos.productos)

  return (
    <React.Fragment>
      {error 
      ? <div className="text-weight-bold text-center mt-4 alert alert-danger">Hubo un error...</div> 
      : 
        <React.Fragment>
          <h2 className="text-center my-5">Listado de Productos</h2>
  
          <table className="table table-striped">
            <thead className="bg-primary table-dark">
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Precio</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(producto => (
                <Producto
                  key={producto.id}
                  producto={producto}
                />
              ))}
            </tbody>
          </table>
          {loading ? 'Cargando...' : null}
        </React.Fragment>
      }
    </React.Fragment>
  );
};

export default Productos;
