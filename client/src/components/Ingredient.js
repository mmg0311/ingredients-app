import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Text } from '@dailykit/ui';

import { saveTabData } from '../state/actions';

const Ingredient = () => {

    const dispatch = useDispatch();

    let schema = {
        name : ''
    }

    const [loading, setLoading] = React.useState(false);
    const [ingredient, setIngredient] = React.useState(schema);
    const { currentTab } = useSelector(state => state.tabs);

    React.useEffect(() => {
        if (currentTab.data) {
            setIngredient(currentTab.data.ingredient);
        } 
        if(currentTab.path) {
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
        return () => {
            dispatch(saveTabData({ ingredient }));
        };
    }, [])

    const handleChange = (name, value) => {
        switch(name) {
            case 'name':
                setIngredient({ ...ingredient, name : { value, error : '' } });
            default:
                setIngredient({ ...ingredient });
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
                    <Text label='Unititled Ingredient' name='name' value={ ingredient.name } onChange={e => handleChange(e.target.name, e.target.value)}/>
                </div>
                <div className="right">
                    <span>
                        Open in editor
                    </span>
                    <span onClick={ saveAndExit }>
                        Save and Exit
                    </span>
                    <span>
                        Publish
                    </span>
                </div>
            </div>
            <div className="content">
                <div className="allergans">
                    <label> Allergans </label>
                    <div className="allergans-list">

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
`