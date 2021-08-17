import styled from 'styled-components';
import { Button } from 'antd';

const AddItemButton = styled(Button)`
  background: rgba(42, 193, 126, 0.1) !important;
  border: none !important;
  &:hover {
    .button-class {
      color: #fff !important;
    }
    background: ${props => props.theme.primaryColor} !important;
  }
`;

export default AddItemButton;
