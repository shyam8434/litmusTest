import { APP_COMMON_ACTION_TYPES } from './constants'

export const setHomeData = (data) => {
    return{
        type: APP_COMMON_ACTION_TYPES.SET_HOME_DATA,
        data
    }
}