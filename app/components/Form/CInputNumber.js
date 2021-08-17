import styled from 'styled-components';
import { InputNumber } from 'antd';

const CInputNumber = styled(InputNumber)`
  min-height: 50px;
  font-size: ${props => props.theme.fontsizeBase} !important;
  font-weight: 500 !important;
  align-items: center;
  .ant-input-number-input {
    height: 50px;
    font-size: ${props => props.theme.fontsizeBase} !important;
  }
`;

export default CInputNumber;
