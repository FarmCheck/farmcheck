import styled from 'styled-components';
import { Form } from 'antd';

const CFormItem = styled(Form.Item)`
  min-height: 50px;
  margin-bottom: ${props => (props.marginouter ? props.marginouter : '24px')};
}
  .ant-form-item-label-left {
    text-align: left;
    display: flex !important;
    height: 50px;
  }


  .ant-form-item-control {
    margin-bottom: ${props =>
      props.margininer ? props.margininer : '12px !important'};
  }
`;

export default CFormItem;
