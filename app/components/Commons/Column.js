import styled from 'styled-components';

const Column = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: ${props =>
    props.justifyContent ? props.justifyContent : 'flex-start'};
  align-items: ${props => (props.alignItems ? props.alignItems : 'flex-start')};
`;

export default Column;
