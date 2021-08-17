import styled from 'styled-components';

const NameText = styled.span`
  font-size: ${props =>
    props.fontSize ? props.fontSize : props.theme.fontsizeBase};
  line-height: 22px;
  word-break: break-word;
  color: #17431d;
  font-weight: 700;

  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: ${props => props.line};
  -webkit-box-orient: vertical;
  display: -webkit-box;
`;

export default NameText;
