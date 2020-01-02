import React from 'react';
import styled from 'styled-components';

import { Sidebar, Tabs } from './';

const Header = () => {    
    return (
        <Style>
            <Sidebar />
            <Tabs />
        </Style>
    );
}

export default Header;

const Style = styled.div`
    background: #D9E9F1;
    overflow: hidden;
`