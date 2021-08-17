import styled from 'styled-components';

const Row = styled.div`
  width: 100%;

  display: flex;
  flex-direction: ${props => (props.direction ? props.direction : 'row')};
  justify-content: ${props =>
    props.justifyContent ? props.justifyContent : 'flex-start'};
  align-items: ${props => (props.alignItems ? props.alignItems : 'flex-start')};
`;

export default Row;
