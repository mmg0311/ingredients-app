import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Tab = ({ data, active, tabClickHandler, closeTabHandler }) => {

    return (
        <Style active={ active } onClick={ () => tabClickHandler(data.id) }>
            { data.title } <i className="fa fa-times" onClick={ () => closeTabHandler(data.id) }/>
        </Style>
    );
}

export default Tab;

const Style = styled.span(
    ({ active }) => `
        background: ${ active ? '#fff' : 'rgba(255, 255, 255, 0.5);' };
        padding: 15px;
        color: #555B6E;

        i {
            margin-left: 28px;
            display: ${ active ? 'inline' : 'none' };

            &:hover {
                cursor: pointer;
            }
        }

        &:hover {
            cursor: pointer;
        }
    `
);