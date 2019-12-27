const initialState = {
    tabs : [{ id : 0, title : 'Ingredients'}, { id : 1, title : 'Stations'}],
    currentTab : 0
}

const tabsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'TAB_CLOSE':
            return { ...state, tabs : action.payload.tabs, currentTab : action.payload.currentTab  };
        case 'TAB_SWITCH':
            return { ...state, currentTab : action.payload.currentTab };
        default:
            return state;
    }
}

export default tabsReducer;