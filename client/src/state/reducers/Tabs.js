const initialState = {
    tabs : [],
    currentTab : 0,
    path : null
}

const tabsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'NEW_TAB':
            let check = state.tabs.find(tab => tab.id === action.payload.id);
            if (check) return { ...state, currentTab : check.id };
            else return { ...state, tabs : [...state.tabs, action.payload], currentTab : action.payload.id, path : action.payload.path };
        case 'TAB_CLOSE':
            let updatedCurrentTab;
            let updatedTabs = state.tabs;
            let index = state.tabs.findIndex(tab => tab.id === state.currentTab);
            updatedTabs.splice(index, 1);
            if (updatedTabs.length) {
                updatedCurrentTab = index === 0 ? updatedTabs[0].id : updatedTabs[index - 1].id;
            }
            return { ...state, tabs : updatedTabs, currentTab : updatedCurrentTab };
        case 'TAB_SWITCH':
            return { ...state, currentTab : action.payload.currentTab };
        default:
            return state;
    }
}

export default tabsReducer;