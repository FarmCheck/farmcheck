import styled from 'styled-components';
import { Input } from 'antd';

const { TextArea } = Input;

const CTextArea = styled(TextArea)`
  font-size: ${props => props.theme.fontsizeBase} !important;
  font-weight: 500 !important;
  .ant-input-lg {
    font-size: ${props => props.theme.fontsizeBase} !important;
  }
  border-width: 1px;
  border-style: solid;
  color: #d9d9d9;
  padding: 12px !important;
  .ant-input {
    padding: 12px !important;
  }
`;

export default CTextArea;
