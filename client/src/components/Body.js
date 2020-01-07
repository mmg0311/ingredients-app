import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import {Home, Ingredients, Stations, Ingredient} from './';

const Body = () => {
  const [content, setContent] = React.useState(undefined);
  const { tabs, currentTab } = useSelector(state => state.tabs);

  React.useEffect(() => {
    let showTab = tabs.filter(tab => tab.id === currentTab);
    if (showTab.length) setContent(showTab[0].id);
    else setContent(undefined);
  }, [currentTab]);

  const whatToDisplay = () => {
    switch (content) {
        case 1:
            return <Ingredients />;
        case 2:
            return <Stations />;
        case 11:
            return <Ingredient />;
        case 12:
            return <Ingredient />;
        default:
            return <Home />;
    }
  };

  return <Style>{whatToDisplay()}</Style>;
};

export default Body;

const Style = styled.div`
    padding: 50px;
`;
