import { combineReducers } from 'redux'
import appCommon from './index'

const appReducer = combineReducers({
    appCommon
})

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer