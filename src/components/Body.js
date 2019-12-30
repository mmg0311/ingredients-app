import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import {Home, Ingredients, Stations} from './';

const Body = () => {
  let content;
  const { tabs, currentTab } = useSelector(state => state.tabs);

  React.useEffect(() => {
    let showTab = tabs.filter(tab => tab.id === currentTab);
    if (showTab.length) content = showTab[0].title;
    console.log(content);
  }, []);

  React.useEffect(() => {
    let showTab = tabs.filter(tab => tab.id === currentTab);
    if (showTab.length) content = showTab[0].title;
    console.log(content);
  }, [currentTab]);

  const whatToDisplay = () => {
      console.log('running...')
      console.log(typeof content); // Always returns undefined
    switch (content) {
        case 'Ingredients':
            console.log('Opening Ingredients...');
            return <Ingredients />;
        case 'Stations':
            console.log('Opening Stations...');
            return <Stations />;
        default:
            return <Home />;
    }
  };

  return <Style>{whatToDisplay()}</Style>;
};

export default Body;

const Style = styled.div``;
