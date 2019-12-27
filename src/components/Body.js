import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Body = () => {

    let content;
    const { tabs, currentTab } = useSelector(state => state.tabs);

    React.useEffect(() => {
        let showTab = tabs.filter(tab => tab.id === currentTab);
        if (showTab) content = showTab[0].title;
        console.log(content);
    }, []);

    return (
        <Style>
            {/* We'll use this contnet variable to find out which component to render inside body! */}
            { content }
        </Style>
    );
}

export default Body;

const Style = styled.div`

`