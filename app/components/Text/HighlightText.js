import styled from 'styled-components';

const HighlightText = styled.span`
  color: #17431d;
  line-height: 22px;
  word-break: break-word;
  font-weight: 600;

  width: 100%;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: ${props => props.line};
  -webkit-box-orient: vertical;
  display: -webkit-box;
`;

export default HighlightText;
