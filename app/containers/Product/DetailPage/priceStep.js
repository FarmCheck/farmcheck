import React from 'react';
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.snow.css';
import { Form } from 'antd';

import {
  PageTitle,
  NameText,
  CFormItem,
  CSelect,
  CInputNumber,
} from 'components';

import { unitList, unitTimeList } from 'containers/Product/commons/data';

export function PriceStep({ form, onSetBodyUpdate }) {
  return (
    <>
      <PageTitle
        subTitle="Thông tin phụ"
        description=" Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin
              tưởng về khả năng khống chế dịch của Việt Nam."
      />
      <Form
        form={form}
        style={{ marginTop: '20px' }}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 11 }}
        layout="horizontal"
        labelAlign="left"
        onValuesChange={onSetBodyUpdate}
      >
        <CFormItem name="price" label={<NameText>Giá bán lẻ đề nghị</NameText>}>
          <CInputNumber style={{ width: '100%' }} size="large" />
        </CFormItem>
        <CFormItem name="unit" label={<NameText>Đơn vị bán</NameText>}>
          <CSelect list={unitList} placeHolder="Chọn đơn vị" />
        </CFormItem>
        <CFormItem
          name="duration"
          label={<NameText>Thời gian sử dụng</NameText>}
        >
          <CInputNumber style={{ width: '50%' }} size="large" />
        </CFormItem>
        <CFormItem
          name="durationType"
          label={<NameText>Đơn vị thời gian</NameText>}
        >
          <CSelect
            width="50%"
            style={{ width: '50% !important' }}
            list={unitTimeList}
            placeHolder="Chọn đơn vị thời gian"
          />
        </CFormItem>
      </Form>
    </>
  );
}

PriceStep.propTypes = {
  form: PropTypes.any,
  onSetBodyUpdate: PropTypes.func,
};

export default PriceStep;
