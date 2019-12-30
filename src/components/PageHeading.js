import React from 'react';
import styled from 'styled-components';

const PageHeading = ({ text }) => {
    return (
        <Style>
            { text }
        </Style>
    )
}

export default PageHeading;

const Style = styled.h1`
    color: #555B6E;
`    