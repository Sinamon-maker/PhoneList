import axios from 'axios'

const UPDATE_CODE = 'UPDATE_CODE'
const UPDATE_LIST = 'UPDATE_LIST'

const initialState = {
  testPhone: 1,
  code: "+7",
  list: []
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
        list: [...state.list, action.phone]
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
    axios.post('http://localhost:8090/api/v1/phone', { phone: `${code}${phone}` }).then(({ data }) => {
      console.log("data", data)
      dispatch({ type: UPDATE_LIST, phone: data })
    })
  }

}