import { APP_COMMON_ACTION_TYPES, AppCommonRecord } from './constants'

const initialState = new AppCommonRecord()

const appCommon = (state = initialState, action) => {

  switch (action.type) {
    case APP_COMMON_ACTION_TYPES.SET_HOME_DATA:
        return state.set('data', {count: action.data})
    default:
      return state
  }
}

export default appCommon