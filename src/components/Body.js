import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import {Home, Ingredients, Stations} from './';

const Body = () => {
  const [content, setContent] = React.useState(undefined);
  const { tabs, currentTab } = useSelector(state => state.tabs);

  React.useEffect(() => {
    let showTab = tabs.filter(tab => tab.id === currentTab);
    if (showTab.length) setContent(showTab[0].title);
    else setContent(undefined);
  }, [currentTab]);

  const whatToDisplay = () => {
    switch (content) {
        case 'Ingredients':
            return <Ingredients />;
        case 'Stations':
            return <Stations />;
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
