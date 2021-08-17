import styled from 'styled-components';

const Text = styled.span`
  color: ${props => (props.color ? props.color : '#8C8C8C')};
  font-size: ${props => (props.size ? props.size : '14px')};
  line-height: ${props => (props.lineHeight ? props.lineHeight : '26px')};
  word-break: break-word;
  font-weight: ${props => (props.weight ? props.weight : '600')} !important;
`;

export default Text;
