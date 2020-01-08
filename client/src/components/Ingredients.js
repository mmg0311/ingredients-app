import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { Table, Loader } from './';
import { newTab } from '../state/actions';


const Ingredients = () => {

    const dispatch = useDispatch();
    
    const [ingredients, setIngredients] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/ingredients');
                const res = await response.json();
                console.log(res);
                setIngredients(res.data.ingredients);
                setLoading(false);
            } catch(e) {
                setLoading(false);
                console.log(e);
            }
        })();
    }, []);

    const addIngredienthandler = () => {
        dispatch(newTab({ type : 'form', title : 'New Ingredient' }));
    }

    const columns = {
        select : true,
        name : "Name",
        variant : "Variant",
        mode_of_fulfillment : "Mode of FulFillment",
        stations : "Stations",
        supplier_item : "Supplier Item",
        availability : "Availability",
        actions : true
    }

    return (
        <Style>
            {
                loading ? <Loader /> : <Table columns={ columns } data={ ingredients } addButtonHandler={ addIngredienthandler }/>
            }
        </Style>
    )
}

export default Ingredients;

const Style = styled.div`

`