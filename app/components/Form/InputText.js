import styled from 'styled-components';
import { Input } from 'antd';

const InputText = styled(Input)`
  min-height: 50px;
  font-size: ${props => props.theme.fontsizeBase} !important;
  font-weight: 500 !important;
  .ant-input-lg {
    font-size: ${props => props.theme.fontsizeBase} !important;
  }
  border-width: 1px;
  border-style: solid;
  color: #d9d9d9;
`;

export default InputText;
