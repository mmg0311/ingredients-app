import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { Table } from './';
import { newTab } from '../state/actions';

const Ingredients = () => {

    const dispatch = useDispatch();

    const addIngredienthandler = () => {
        dispatch(newTab({ id : 11, title : 'New Ingredient' }));
    }

    return (
        <Style>
            <Table addButtonHandler={ addIngredienthandler }/>
        </Style>
    )
}

export default Ingredients;

const Style = styled.div`

`