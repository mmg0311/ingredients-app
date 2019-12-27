import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Tab } from './';
import { tabClose, tabSwitch } from '../state/actions';

const Tabs = () => {

    const dispatch = useDispatch();
    const { tabs, currentTab } = useSelector(state => state.tabs);

    const tabClickHandler = (id) => {
        dispatch(tabSwitch({ currentTab : id }));
    }

    const closeTabHandler = (id) => {
        let index = tabs.findIndex((tab) => tab.id === id);
        let updateTabs = tabs.filter(tab => tab.id !== id);
        if (tabs.length) {
            let updatedCurrentTab;
            // Issue here: doesn't switch the tab even if current index is changed.
            index === 0 ? updatedCurrentTab = tabs[0].id : updatedCurrentTab = tabs[index - 1].id;
            console.log(updatedCurrentTab);
            dispatch(tabClose({ tabs : updateTabs, currentTab : updatedCurrentTab }));
        } else {
            dispatch(tabClose({ tabs : [] }))
        }
    }

    return (
        <Style>
            {
                tabs.length && tabs.map(tab => <Tab key={ tab.id } data={ tab } active={ currentTab === tab.id } tabClickHandler={ tabClickHandler } closeTabHandler={ closeTabHandler } />)   
            }
        </Style>
    );
}

export default Tabs;

const Style = styled.span`
`