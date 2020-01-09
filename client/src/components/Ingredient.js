import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Text } from '@dailykit/ui';

import { saveTabData } from '../state/actions';

const Ingredient = ({ data }) => {

    const dispatch = useDispatch();

    const [loading, setLoading] = React.useState(false);
    const [ingredient, setIngredient] = React.useState({ name : '' });
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIngredient({ ...ingredient, [name] : value });
    }

    const saveAndExit = async () => {
        try {
            console.log(ingredient);
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
                    <Text label='Unititled Ingredient' name='name' value={ ingredient.name } onChange={e => handleChange(e)}/>
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