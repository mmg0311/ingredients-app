import React from 'react';
import styled from 'styled-components';

import { Tab } from './';

const Tabs = () => {

    const [currentTab, setCurrentTab] = React.useState(0); // ID of the Tab
    const [tabs, setTabs] = React.useState([{ id : 0, title : 'Home' }, { id : 1, title : 'About' }]);

    const tabClickHandler = (id) => {
        setCurrentTab(id);
    }

    const closeTabHandler = (id) => {
        let index = tabs.findIndex((tab) => tab.id === id);
        setTabs(tabs.filter(tab => tab.id !== id));
        if (tabs.length) {
            // Issue here: doesn't switch the tab even if current index is changed.
            index === 0 ? setCurrentTab(tabs[0].id) : setCurrentTab(tabs[index - 1].id);
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