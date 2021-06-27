import axios from 'axios'
import { getSocket } from '../index'

const UPDATE_CODE = 'UPDATE_CODE'
const UPDATE_LIST = 'UPDATE_LIST'
const RECEIVE_LIST = 'RECEIVE_LIST'

const initialState = {
  testPhone: 1,
  code: "",
  list: [],
  message: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CODE: {
      return {
        ...state,
        code: action.code
      }
    }
    case UPDATE_LIST: {
      return {
        ...state,
        list: [action.phone, ...state.list]
      }
    }
    case RECEIVE_LIST: {
      return {
        ...state,
        list: [...action.phones]
      }
    }
    default:
      return state
  }

}

export function updateCode(code) {
  return { type: UPDATE_CODE, code }
}

export function phoneToRedux(phone) {
  return (dispatch, getState) => {
    const { code } = getState().phone
    axios.post('/api/v1/phone', { phone: `${code}${phone}` }).then(({ data }) => {

      dispatch({ type: UPDATE_LIST, phone: data })
    })
  }

}

export function phoneToReduxViaSocket(phone) {
  return (dispatch, getState) => {
    const { code } = getState().phone
    const data = {
      phone: `${code}${phone}`,
      type: UPDATE_LIST
    }

    getSocket().emit('action', data)
  }
}