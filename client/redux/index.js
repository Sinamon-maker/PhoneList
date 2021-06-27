import { createStore, applyMiddleware, compose } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import { io } from "socket.io-client";
import thunk from 'redux-thunk'
import createRootReducer from './reducers'


const middleware = [thunk]
const initialState = {}

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose
const composedEnchanters = composeFunc(applyMiddleware(...middleware))
const store = createStore(createRootReducer(), initialState, composedEnchanters)

const socket = io('/');

socket.on("connect", () => {

  console.log("hi", );


 });

socket.on('action', function (data) {
  console.log('connected');
 store.dispatch(data)
})

export function getSocket(){
  return socket
}

export default store