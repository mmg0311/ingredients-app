export const tabClose = (payload) => {
    return {
        type : 'TAB_CLOSE',
        payload
    }
}

export const tabSwitch = (payload) => {
    return {
        type : 'TAB_SWITCH',
        payload
    }
}