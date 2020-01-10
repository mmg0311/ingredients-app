import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { 
    Text, 
    TextButton, 
    Select,
    Tunnel,
    TPanel,
    TPanelBody,
    TPanelFooter,
    TPanelHead,
} from '@dailykit/ui';

import { saveTabData, updateTitle } from '../state/actions';

const Ingredient = ({ data }) => {

    const dispatch = useDispatch();

    const [loading, setLoading] = React.useState(false);
    const [ingredient, setIngredient] = React.useState({ 
        name : '', 
        allergens : [{ id : 0, title : 'Allergen 1' }, { id : 2, title : 'Allergen 2' }], 
        processings : []
    });
    const [panels, setPanels] = React.useState([
        'hidden',
        'hidden',
        'hidden',
        'hidden'
     ])
    const { currentTab } = useSelector(state => state.tabs);

    React.useEffect(() => {
        console.log(data);
        if (data) {
            setIngredient(data.ingredient);
        }
        if (!data && currentTab.path) {
            (async() => {
                try {
                    setLoading(true);
                    const response = await fetch('/api/ingredients/file', {
                        method : 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body : JSON.stringify({ path : currentTab.path })
                    });
                    const res = await response.json();
                    setIngredient(res.data.ingredient);
                    setLoading(false);
                } catch(e) {
                    setLoading(false);
                    console.error(e);
                }
            })();
        }
    }, [data])

    React.useEffect(() => {
        dispatch(saveTabData({ currentTab, ingredient }));
    }, [ingredient])

    const togglePanel = panel => {
        const temp = panels
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
        setPanels([...temp])
     }

    const closePanel = panel => {
        const temp = panels
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
        setPanels([...temp])
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIngredient({ ...ingredient, [name] : value });
    }

    const changeTitle = (e) => {
        const title = e.target.value;
        if (title) {
            dispatch(updateTitle({ title, currentTab }));
        }
    }

    const saveAndExit = async () => {
        try {
            const response = await fetch('/api/ingredients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ingredient})
            })
            const res = await response.json();
            console.log(res);
        } catch(e) {
            console.error(e);
        }
    }

    return (
        <Style>
            <div className="top-bar">
                <div className="left">
                    <Text placeholder='Untitled Ingredient' name='name' value={ ingredient.name } onChange={e => handleChange(e)} onBlur={ e => changeTitle(e) }/>
                </div>
                <div className="right">
                    <span>
                        Open in editor
                    </span>
                    <span onClick={ saveAndExit }>
                        <TextButton type='ghost'>Save and Exit</TextButton>
                    </span>
                    <span>
                        <TextButton type='solid'>Publish</TextButton>
                    </span>
                </div>
            </div>
            <div className="content">
                <div className="row">
                    <div className="allergens">
                        <div className="label"> Allergans </div>
                        <div className="list-allergens">
                            <Select options={ ingredient.allergens } addOption={ () => togglePanel(0) } removeOption={ () => console.log('click') }/>
                        </div>
                    </div>
                    <div className="allergens">
                        <div className="label"> Allergans </div>
                        <div className="list-allergens">
                            <Select options={ ingredient.allergens } addOption={ () => togglePanel(0) } removeOption={ () => console.log('click') }/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="processings">
                        {
                            ingredient.processings.length > 0 && 
                            <div className="list-processings">
                                Here
                            </div>
                        }
                        <div className="add-processing" onClick={ () => console.log('OPENED') }>
                            <i className="fas fa-plus"></i>
                            Add Processing
                        </div>
                    </div>
                </div>
            </div>
        </Style>
    );
}

export default Ingredient;

const Style = styled.div`
    .top-bar {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #D8D8D8;
        padding: 15px 0;

        .right {
            span:not(:last-child) {
                margin-right: 20px;
            }
        }
    }

    .content {
        padding: 50px 20px;

        .row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 50px;

            div:not(:last-child) {
                margin-right: 20px;
            }
        }

        .allergens {
            flex: 1;

            .label {
                color: #888D9D;
                margin-bottom: 20px;
            }
        }

        .processings {
            flex: 1;

            .add-processing {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 128px;
                background: #FFFFFF;
                border: 1px dashed #F3F3F3;
                box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.13);
                color: #555B6E;

                i {
                    font-size: 2rem;
                }

                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
`