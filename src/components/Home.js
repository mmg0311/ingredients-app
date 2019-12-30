import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import {PageHeading} from './';
import { newTab } from '../state/actions';

const Home = () => {

    const dispatch = useDispatch();

    return (
        <Style>
            <div className="header">
                <PageHeading text="Ingredient App"/>
                <PageHeading text="Ingredient App"/>
            </div>
            <div className="content">
                <div className="card">
                    <div className="card-text">
                        <h2> Ingredients </h2>
                        <p> 29 created so far </p>
                        <i> All available </i>
                    </div>
                    <div className="card-link">
                        <span onClick={ () => dispatch(newTab({ id : 1, title : 'Ingredients' })) }> Go To Ingredients &gt; </span>
                    </div>
                </div>
                <div className="card">
                    <div className="card-text">
                        <h2> Stations </h2>
                        <p> 4 created so far </p>
                        <i> All active </i>
                    </div>
                    <div className="card-link">
                        <span onClick={ () => dispatch(newTab({ id : 2, title : 'Stations' })) }> Go To Stations &gt; </span>
                    </div>
                </div>
            </div>
        </Style>
    )
}

export default Home;

const Style = styled.div`
    padding: 50px;

    .header {
        display: flex;
        justify-content: space-between;
    }

    .content {
        display: flex;
        justify-content: space-around;
        margin-top: 40px;

        .card {
            display: flex;
            align-items: flex-end;
            min-width: 380px;
            border: 1px solid #D8D8D8;
            padding: 24px;
            padding-top: 60px;
            color: #555B6E;

            .card-text {
                flex: 1;

                p {
                    font-weight: 500;
                }
            }

            .card-link {
                flex: 1;
                text-align: right;
                
                span {
                    color: #00A7E1;
                    font-weight: 500;

                    &:hover  {
                        cursor: pointer;
                    }
                }
            }

            &:hover {
                background: #F8F8F8;
            }
        }
    }
`