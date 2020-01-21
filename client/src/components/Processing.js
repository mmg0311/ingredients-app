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
        tracking : true,
        mode_of_fulfillment : [
            // {   
            //     active : false,
            //     priority : 1,
            //     type : 'Real Time',
            //     station : {
            //         id : undefined
            //     }
            // },
            // {   
            //     active : false,
            //     priority : 2,
            //     type : 'Copacker',
            //     station : {
            //         id : undefined
            //     }
            // },
            // {   
            //     active : false,
            //     priority : 3,
            //     type : 'Planned Lot',
            //     station : {
            //         id : undefined
            //     }
            // }
        ]
    },
    panel : {
        heading : ''
    },
    mode : {
        station : {
            id : undefined,
            title : ''
        }
    }
};

const tempReducer = (state, action) => {
    switch(action.type) {
        case 'SACHET': {
            return { ...state, sachet : { ...state.sachet, ...action.payload } };
        }
        // case 'TRACKING': {
        //     return { ...state, sachet : { ...state.sachet, tracking : { ...action.payload } } };
        // }
        // case 'MODE': {
        //     const updatedArray = state.mode_of_fulfillment;
        //     console.log(action.payload);
        //     return { ...state, mode_of_fulfillment : [ ...updatedArray ] };
        // }
        case 'PANEL': {
            return { ...state, panel : { ...state.panel, ...action.payload } }
        }
        case 'MODE': {
            return { ...state, panel : { ...state.panel, ...action.payload } }
        }
        default:
            return state;
    }
}


const Processing = ({ data }) => {

    const [temp, dispatchTempAction] = React.useReducer(tempReducer, initialTempState);

    const modeToggled = (e) => {
        const { checked, name } = e;
        if (checked) {
            dispatchTempAction({ type : 'PANEL', payload : { heading : name }});
            togglePanelStations(0);
        }
        const copyModes = temp.sachet.mode_of_fulfillment;
        const index = copyModes.findIndex(mode => mode.type === name);
        console.log(index);
        if (index != -1) {
            copyModes[index].active = checked;
            dispatchTempAction({ type : 'SACHET', payload : { mode_of_fulfillment : copyModes }})
        }
    }

    // Stations
    const [panelsStations, setPanelsStations] = React.useState([
        'hidden',
        'hidden'
    ])
    const [stationOptions] = React.useState([
        { id: 1, title: 'Station 1'},
        { id: 2, title: 'Station 2'},
        { id: 3, title: 'Station 3'},
    ])
    const selectedStationHandler = (option) => {
        console.log(option);
        dispatchTempAction({ type : 'MODE',  payload : option });
        togglePanelStations(1);
    }

    const togglePanelStations = panel => {
        const temp = panelsStations
        if (panel || panel === 0) {
           temp[panel] = 'full'
        }
        if (panel - 1 || panel - 1 === 0) {
           temp[panel - 1] = 'partial'
        }
        let len = panel - 1
        if (len > 0) {
           while (len--) {
              temp[len] = 'hidden'
           }
        }
        setPanelsStations([...temp])
    }
  
     const closePanelStations = panel => {
        const temp = panelsStations
        temp[panel] = 'hidden'
        if (panel < temp.length - 1 && panel + 1) {
           temp[panel + 1] = 'hidden'
        }
        if (panel - 1 || panel - 1 === 0) {
           temp[panel - 1] = 'full'
        }
        if (panel - 2 || panel - 2 === 0) {
           temp[panel - 2] = 'partial'
        }
        setPanelsStations([...temp])
    }

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
                            onChange={e => dispatchTempAction({ type : 'SACHET', payload : { quantity : { value : e.target.value, unit : 'gms' } } } )}
                        />
                        <div className="row">
                            <label> Track inventory </label>
                            <input type="checkbox" checked={ temp.sachet.tracking } onChange={ (e) => dispatchTempAction({ type : 'SACHET', payload : { tracking : e.target.checked } }) }/>
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
                                        <td> <input type="checkbox" name="Real Time" onChange={ (e) => modeToggled(e.target) }/> Real Time </td>
                                        <td> Station 1 </td>
                                        <td> item1, item2, item3 </td>
                                        <td> 85-100% </td>
                                        <td> Packet 1 </td>
                                        <td>  </td>
                                        <td> Potato </td>
                                    </tr>
                                    <tr>
                                        <td> <input type="checkbox" name="Copacker" onChange={ (e) => modeToggled(e.target) }/> Copacker </td>
                                        <td> Station 1 </td>
                                        <td> item1, item2, item3 </td>
                                        <td> 85-100% </td>
                                        <td> Packet 2 </td>
                                        <td>  </td>
                                        <td> Potato </td>
                                    </tr>
                                    <tr>
                                        <td> <input type="checkbox" name="Planned Lot" onChange={ (e) => modeToggled(e.target) }/> Planned lot </td>
                                        <td> Station 1 </td>
                                        <td> item1, item2, item3 </td>
                                        <td> 85-100% </td>
                                        <td> Packet 1 </td>
                                        <td>  </td>
                                        <td> Potato </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Tunnel>
                                <TPanel layer={1} visibility={panelsStations[0]}>
                                <TPanelHead>
                                    <TextButton type='outline' onClick={() => closePanelStations(0)}>
                                        Close
                                    </TextButton>
                                    <h3>Select station for { temp.panel.heading }</h3>
                                </TPanelHead>
                                <TPanelBody>
                                    <ComboBox
                                        type='single'
                                        options={ stationOptions }
                                        selectedOption={ selectedStationHandler }
                                        placeholder="type what you're looking for..."
                                    />
                                </TPanelBody>
                                </TPanel>
                                <TPanel layer={2} visibility={panelsStations[1]}>
                                <TPanelHead>
                                    <TextButton type='outline' onClick={() => closePanelStations(1)}>
                                        Close
                                    </TextButton>
                                    <h3>Configure station for { temp.panel.heading }</h3>
                                </TPanelHead>
                                <TPanelBody>
                                    
                                </TPanelBody>
                                </TPanel>
                            </Tunnel>
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