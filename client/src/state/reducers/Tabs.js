const initialState = {
    tabs : [],
    currentTab: undefined
}

// tab : { type : 'form', id: 'asd7123', path : './sdasd', title : 'New Ingredient' }
// tab : { type : 'list', title : 'Ingredients' }

const tabsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'NEW_TAB':
            let check = state.tabs.find(tab => tab.title === action.payload.title);
            if (check) return { ...state, currentTab : check };
            else return { ...state, tabs : [...state.tabs, action.payload], currentTab : action.payload };
        case 'TAB_CLOSE':
            let updatedCurrentTab;
            let updatedTabs = state.tabs;
            let index = state.tabs.findIndex(tab => tab.title === state.currentTab.title);
            updatedTabs.splice(index, 1);
            if (updatedTabs.length) {
                updatedCurrentTab = index === 0 ? updatedTabs[0] : updatedTabs[index - 1];
            }
            return { ...state, tabs : updatedTabs, currentTab : updatedCurrentTab };
        case 'TAB_SWITCH':
            return { ...state, currentTab : action.payload.currentTab };
        case 'SAVE_DATA':
            return { ...state, currentTab : { ...state.currentTab, data : action.payload } }
        default:
            return state;
    }
}

export default tabsReducer;