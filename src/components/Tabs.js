import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Tab } from './';

const Tabs = () => {

    const { tabs, currentTab } = useSelector(state => state.tabs);

    return (
        <Style>
            {
                tabs.map(tab => <Tab key={ tab.id } data={ tab } active={ currentTab === tab.id } />)
            }
        </Style>
    );
}

export default Tabs;

const Style = styled.span`
`