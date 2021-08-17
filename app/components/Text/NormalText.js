import styled from 'styled-components';

const NormalText = styled.span`
  color: ${props => props.theme.textColorSecondary};
  font-size: ${props => props.theme.fontsizeBase};
  line-height: 22px;
  word-break: break-word;
  font-weight: 500;
`;

export default NormalText;
