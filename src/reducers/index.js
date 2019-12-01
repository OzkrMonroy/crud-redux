import { combineReducers } from 'redux'
import validacionReducer from './validacionReducer'
import productosReducer from './productosReducer'

export default combineReducers({
  productos: productosReducer,
  error: validacionReducer
})