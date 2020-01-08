import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';

import { newTab } from '../state/actions';

const Sidebar = () => {

    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
        <Icon onClick={ () => setIsOpen(true) }>
            <i className="fas fa-bars"/>
            {/* <ReactSVG src='../assets/icons/bars.svg'/> */}
        </Icon>
        <Content open={ isOpen }>
            <span className="close-icon" onClick={ () => setIsOpen(false) }>
                <i className="fas fa-times"></i>
            </span>
            <ul className="nav-list-top">
               <li onClick={ () => {dispatch(newTab({ type : 'list', title : 'Ingredients' })); setIsOpen(false);} }> Ingredients </li>
               <li onClick={ () => {dispatch(newTab({ type : 'list', title : 'Stations' })); setIsOpen(false);} }> Stations </li> 
            </ul>
            <ul className="nav-list-bottom">
                <li> <i className="fas fa-cog"></i> Manage Settings </li>
            </ul>
        </Content>
        </>
    );
}

export default Sidebar;

const Icon = styled.span`
    padding: 6px 10px;
    background: #D9E9F1;
    color: #555B6E;
    font-size: 2rem;

    &:hover {
        cursor: pointer;
    }
`

const Content = styled.div(
    ({ open }) => `
        position: absolute;
        top: 0;
        bottom: 0;
        left: ${ open ? '0' : '-500px' };
        color: #555B6E;
        background: #D9E9F1;
        min-width: 200px;
        transition: .5s ease;

        .close-icon {
            position: absolute;
            top: 15px;
            left: 15px;
            
            &:hover {
                cursor: pointer;
            }
        }

        ul {
            list-style-type: none;
            margin: 50px 0;
            padding: 15px;
            font-weight: 500;

            li {
                border-bottom: 1px solid #D9E9F1;
                padding: 5px;
            }

            li:hover {
                cursor: pointer;
                border-bottom: 1px solid #fff;
            }

            li:not(:last-child) {
                margin-bottom: 15px;
            }
        }

        .nav-list-bottom {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;

            i {
                margin-right: 12px;
            }
        }
    `
);