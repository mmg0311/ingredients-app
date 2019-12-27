const initialState = {
    tabs : [{ id : 0, title : 'Ingredients'}, { id : 1, title : 'Stations'}],
    currentTab : 0
}

const tabsReducer = (state = initialState, action) => {
    switch(action.type) {
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