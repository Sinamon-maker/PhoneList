import { combineReducers } from 'redux'
import phone from './phone'

const createRootReducer = () => combineReducers({
  phone
})

export default createRootReducer