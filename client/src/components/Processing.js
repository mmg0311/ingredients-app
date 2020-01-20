import React from 'react';
import styled from 'styled-components';
import { 
    Text, 
    TextButton, 
    Select,
    Tunnel,
    TPanel,
    TPanelBody,
    TPanelFooter,
    TPanelHead,
    ComboBox
} from '@dailykit/ui';

const initialTempState = {
    sachet : {
        quantity : {
            value : '',
            unit : ''
        },
        tracking : true
    }
};

const tempReducer = (state, action) => {
    switch(action.type) {
        case 'sachet': {
            console.log(action.payload);
            return { ...state, sachet : { ...state.sachet , ...action.payload }};
        }
        default:
            return state;
    }
}


const Processing = ({ data }) => {

    const [temp, dispatchTempAction] = React.useReducer(tempReducer, initialTempState);

    return(
        <Style>
            <div className="info">
                <div className="content">
                    <div className="row">
                        <h3>{ data.name.title }</h3>
                    </div>
                    <div className="row">
                        <div className="stat">
                            <span className="label"> Processing cost: </span>
                            <span className="value"> { data.cost.value } { data.cost.unit } </span>
                        </div>
                        <div className="stat">
                            <span className="label"> Percentage of yield: </span>
                            <span className="value"> { data.yield }% </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="stat">
                            <span className="label"> Equipments needed: </span>
                            <span className="value"> { Object.keys(data.equipments).join() } </span>
                        </div>
                        <div className="stat">
                            <span className="label"> Bulk Density: </span>
                            <span className="value"> { data.bulkDensity } </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="stat">
                            <div className="label">
                                Standard operating procedure
                            </div>
                        </div>
                    </div>
                </div>
                <div className="img-container">
                    <img src="https://source.unsplash.com/400x400/?food"/>
                </div>
            </div>
            <div className="sachets">
                <div className="row">
                    <div className="heading">
                        Sachets({ data.sachets.length }):
                    </div>
                </div>
                {
                    data.sachets.length > 0 &&
                    <div className="list-sachets">
                        here
                    </div>    
                }
                <div className="row">
                    <div className="new-sachet">
                        <Text
                            label='Enter Quantity'
                            name='quantity'
                            value={ temp.sachet.quantity.value }
                            onChange={e => dispatchTempAction({ type : 'processing', payload : { cost : { value : e.target.value } } })}
                        />
                        <div className="row">
                            <label> Track inventory </label>
                            <input type="checkbox" checked={ temp.sachet.tracking } onChange={ (e) => dispatchTempAction({ type : 'sachet', payload : {tracking : e.target.checked} }) }/>
                        </div>
                        <div className="row">
                            <table cellPadding="0" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th> Mode of fulfillment </th>
                                        <th> Stations </th>
                                        <th> Supplier Items </th>
                                        <th> Accuracy Range </th>
                                        <th> Packaging </th>
                                        <th> Label template </th>
                                        <th> Slip name </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td> Real Time </td>
                                        <td> Station 1 </td>
                                        <td> item1, item2, item3 </td>
                                        <td> 85-100% </td>
                                        <td> Packet 1 </td>
                                        <td>  </td>
                                        <td> Potato </td>
                                    </tr>
                                    <tr>
                                        <td> Copacker </td>
                                        <td> Station 1 </td>
                                        <td> item1, item2, item3 </td>
                                        <td> 85-100% </td>
                                        <td> Packet 2 </td>
                                        <td>  </td>
                                        <td> Potato </td>
                                    </tr>
                                    <tr>
                                        <td> Planned lot </td>
                                        <td> Station 1 </td>
                                        <td> item1, item2, item3 </td>
                                        <td> 85-100% </td>
                                        <td> Packet 1 </td>
                                        <td>  </td>
                                        <td> Potato </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="add-sachet">
                        <i className="fas fa-plus" />
                        Add Sachet
                    </div>
                </div>
            </div>
        </Style>
    );
}

export default Processing;

const Style = styled.div`
    background: #FFFFFF;
    border: 1px dashed #F3F3F3;
    padding: 20px;
    margin-bottom: 50px;

    .info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        .content {
            padding 0;

            .row {
                margin-bottom: 20px;
            }

            h3 {
                font-size: 20px;
                font-weight: 500;
                color: #555B6E;
            }

            .stat {
                font-weight: 500;
                font-size: 14px;
                color: #888D9D;
                min-width: 250px;

                .label {
                    margin-right: 10px;
                }
            }
        }

        .img-container {
            max-width: 200px;
            max-height: 200px;
            
            img {
                width: 100%;
                height: auto;
            }
        }
    }

    .sachets {

        .row {
            margin-bottom: 20px;
            width: 100%;
        }

        .heading {
            font-weight: 500;
            font-size: 14px;
            line-height: 16px;
            color: #888D9D;
        }

        .add-sachet {
            text-align: center;
            padding: 20px;
            background: #FFFFFF;
            border: 1px dashed #F3F3F3;
            box-sizing: border-box;
            box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.13);
            font-size: 16px;
            line-height: 14px;
            
            color: #555B6E;
            &:hover {
                cursor: pointer;
            }
        }

        .new-sachet {
            padding: 20px;
            background: #FFFFFF;
            border: 1px dashed #F3F3F3;
            width: 100%;

            table {
                width: 100%;

                thead{

                    tr {
                        background: #F3F3F3;
                        
                        th {
                            text-align: left;
                            padding: 7px 5px;
                            font-weight: normal;
                            font-size: 12px;
                            line-height: 14px;
                            color: #888D9D;
                        }
                    }
                }

                tbody {

                    tr {

                        td {
                            font-weight: normal;
                            font-size: 14px;
                            line-height: 14px;
                            color: #555B6E;
                            padding: 20px 5px;
                        }
                    }
                }
            }
        }
    }
`