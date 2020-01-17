import React from 'react';
import styled from 'styled-components';

const Processing = ({ data }) => {
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
`