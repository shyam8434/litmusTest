import { Record } from 'immutable'

export const APP_COMMON_ACTION_TYPES = {
    SET_HOME_DATA: 'SET_HOME_DATA',
}

export const AppCommonRecord = Record({
    data: {count: 0}
})
