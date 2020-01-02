import React from 'react';
import styled from 'styled-components';

import { PageHeading } from './';

const Table = ({ addButtonHandler }) => {

    const [currentCount, setCurrentCount] = React.useState(50);
    const [totalCount, setTotalCount] = React.useState(1350);

    return (
        <Style>
            <div className="header">
                <PageHeading text="Ingredients" size={ 20 } stats={ 29 } />
                <div className="pagination">
                    { currentCount } of { totalCount }
                    <span> &lt; </span>
                    <span> &gt; </span>
                </div>
            </div>
            <div className="operations">
                <div className="left">
                    <div className="filters">
                    <i className="fas fa-filter" /> Filters
                    </div>
                </div>
                <div className="right">
                    <div className="search">
                        Search here
                    </div>
                    <div className="add" onClick={ addButtonHandler }>
                        Add button
                    </div>
                </div>
            </div>
            <div className="body">
                <table>
                    <thead>
                        <tr>
                            <th> Select </th>
                            <th> Ingredient Name </th>
                            <th> Variant </th>
                            <th> Modes of Fulfillment </th>
                            <th> Stations </th>
                            <th> Supplier Item </th>
                            <th> Availability </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> Select </td>
                            <td> Potato </td>
                            <td> 200gm, Portioned </td>
                            <td> Real-time, Co-packer </td>
                            <td> Station 1, Station 2 </td>
                            <td> Item 1, Item 2 </td>
                            <td> true </td>
                            <td> edit delete </td>
                        </tr>
                        <tr>
                            <td> Select </td>
                            <td> Red Cabbage </td>
                            <td> 400gm, Portioned </td>
                            <td> Real-time </td>
                            <td> Station 1, Station 2 </td>
                            <td> Item 1 </td>
                            <td> false </td>
                            <td> edit delete </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Style>
    );
}

export default Table;

const Style = styled.div`
    color: #555B6E;

    .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        .pagination {
            span:first-child {
                margin-left: 30px;
            }
        }
    }

    .operations {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        .right {
            display: flex;
            
            div:not(:last-child) {
                margin-right: 20px;
            }
        }
    }

    .body {
        display: flex;
        
        table {
            flex: 1;
            border-spacing: 0;

            thead {
                color: #888D9D;
                font-size: 12px;
                
                th {
                    border-bottom: 1px solid #D8D8D8;
                    font-weight: normal;
                    padding: 12px 0;
                    margin: 0;
                    text-align: left;
                }
            }

            tbody {

                tr {
                    border: 1px solid #F3F3F3!important;
                }

                td {
                    padding: 12px 0;
                    border-bottom: 1px solid #F3F3F3;
                }

                td:first-child {
                    border-left: 1px solid #F3F3F3;
                }

                td:last-child {
                    border-right: 1px solid #F3F3F3;
                }
            }
        }
    }
`