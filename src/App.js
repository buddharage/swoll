import React from 'react';

import styled from 'styled-components';

const StyledApp = styled.div`
  padding: ${props => props.theme.padding};
`;

function App(props) {
  return <StyledApp>{props.children}</StyledApp>;
}

export default App;
