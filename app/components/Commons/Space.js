import styled from 'styled-components';

const Space = styled.div`
  width: ${props => (props.width ? `${props.width}px` : 0)};
  height: ${props => (props.height ? `${props.height}px` : 0)};
  flex-shrink: 0 !important;
`;

export default Space;
