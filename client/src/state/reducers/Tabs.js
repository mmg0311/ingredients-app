const initialState = {
    // tabs : [],
    // currentTab: undefined
    tabs: [
        {
          type: 'list',
          title: 'Ingredients'
        },
        {
          type: 'form',
          title: 'Test',
          path: './../apps/Ingredients/data/ingredients/Test.json',
          data: {
            ingredient: {
              name: 'Test',
              allergens: [
                {
                  id: 2,
                  title: 'Option2'
                },
                {
                  id: 3,
                  title: 'Option3'
                },
                {
                  id: 4,
                  title: 'Option4'
                }
              ],
              processings: [
                {
                  name: {
                    id: 4,
                    title: 'Fried'
                  },
                  cost: {
                    value: '23'
                  },
                  'yield': '123',
                  equipments: [
                    {
                      id: 3,
                      title: 'Fork'
                    },
                    {
                      id: 1,
                      title: 'Spoon'
                    }
                  ],
                  bulkDensity: '56',
                  nutritionalValues: {
                    calories: {
                      value: '45'
                    },
                    fat: {
                      value: '23'
                    },
                    proteins: {
                      value: '67'
                    },
                    carbs: {
                      value: '45'
                    }
                  },
                  sachets: []
                }
              ]
            }
          }
        }
      ],
      currentTab: {
        type: 'form',
        title: 'Test',
        path: './../apps/Ingredients/data/ingredients/Test.json'
      }
}

const tabsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'NEW_TAB': {
            let check = state.tabs.find(tab => tab.title === action.payload.title);
            if (check) return { ...state, currentTab : check };
            else return { ...state, tabs : [...state.tabs, action.payload], currentTab : action.payload };
        }    
        case 'TAB_CLOSE': {
            let updatedCurrentTab;
            let updatedTabs = state.tabs;
            let index = state.tabs.findIndex(tab => tab.title === state.currentTab.title);
            updatedTabs.splice(index, 1);
            if (updatedTabs.length) {
                updatedCurrentTab = index === 0 ? updatedTabs[0] : updatedTabs[index - 1];
            }
            return { ...state, tabs : updatedTabs, currentTab : updatedCurrentTab };
        }     
        case 'TAB_SWITCH': {
            return { ...state, currentTab : action.payload.currentTab };
        }
        case 'SAVE_DATA': {
            let index = state.tabs.findIndex(tab => tab.title === action.payload.currentTab.title);
            let tabs = state.tabs;
            tabs[index] = { ...tabs[index], data : { ingredient : action.payload.ingredient } };
            return { ...state, tabs };
        }
        case 'UPDATE_TITLE' : {
            let index = state.tabs.findIndex(tab => tab.title === action.payload.currentTab.title);
            let tabs = state.tabs;
            tabs[index] = { ...tabs[index], title : action.payload.title };
            return { ...state, tabs, currentTab : tabs[index] };
        }
        default:
            return state;
    }
}

export default tabsReducer;
