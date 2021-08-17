import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Barcode from 'react-barcode';
import QRCode from 'qrcode.react';

import { Form, Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import {
  PrinterOutlined,
  DownloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import {
  Space as Spacing,
  CUploadList,
  CSelect,
  NameText,
  CFormItem,
  InputText,
  CButton,
  TextEditor,
} from 'components';

import { useFetch } from 'hooks';

import { find as findProduct } from 'containers/Product/productSlice';
import { find as findProcess } from 'containers/Process/processSlice';
import { find as findArea } from 'containers/Area/areaSlice';

import { baseObjectTypeList } from 'containers/ProductObject/commons/data';

import {
  product as productQuery,
  area as areaQuery,
  process as processQuery,
} from 'containers/ProductObject/commons/query';

import { env } from 'env';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ActionQR = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;

const CQRCode = styled(QRCode)`
  width: 266px !important;
  height: 266px !important;
`;

const DivRow = styled.div`
  display: flex;
`;

const BarcodeWrapper = styled.div`
  width: 266px;
  height: auto;
`;

const WrapBarCode = styled.div`
  > svg {
    > rect {
      fill: rgba(57, 181, 74, 0.1) !important;
      border-radius: 6px !important;
    }
  }
`;

function InformationStep({ productObject, form, onSetBodyUpdate }) {
  const farmID = useSelector(state => state.farm.item.id);

  const { data: productList } = useFetch({
    selector: state => state.product.list,
    action: findProduct,
    query: { ...productQuery, where: { farmID } },
  });

  const { data: areaList } = useFetch({
    selector: state => state.area.list,
    action: findArea,
    query: { ...areaQuery, where: { farmID } },
  });

  const { data: processList } = useFetch({
    selector: state => state.process.list,
    action: findProcess,
    query: { ...processQuery, where: { farmID } },
  });

  const [countImg, setCountImg] = React.useState(0);

  const handleChangeTextEditor = value => {
    form.setFieldsValue({ description: value });
    onSetBodyUpdate({ description: value });
  };

  const handleChangeImg = e => {
    if (Array.isArray(e)) {
      return e;
    }

    const { fileList } = e;
    if (Array.isArray(fileList)) {
      setCountImg(fileList.length);
    }

    return e && e.fileList;
  };

  useEffect(() => {
    if (
      form.getFieldValue('medias') &&
      form.getFieldValue('medias').length > 0
    ) {
      setCountImg(form.getFieldValue('medias').length);
    }
  }, [productList, areaList, processList, form.getFieldValue('medias')]);

  return (
    <Wrapper>
      <Form
        form={form}
        onValuesChange={onSetBodyUpdate}
        style={{ width: '100%' }}
        layout="vertical"
        labelAlign="left"
      >
        <Row style={{ marginTop: '20px' }}>
          <Col xs={24} sm={20} md={16} lg={16} xl={10}>
            <CFormItem label={<NameText>Mã QR quản lý nội bộ</NameText>}>
              <DivRow>
                <CQRCode
                  value={`${env.farmhub.webApp}/portal/${form.getFieldValue(
                    'id',
                  )}`}
                />
                <ActionQR>
                  <CButton
                    type="primary"
                    icon={<PrinterOutlined />}
                    style={{ width: 216 }}
                  >
                    {' '}
                    Tải xuống{' '}
                  </CButton>
                  <Spacing height={18} />
                  <CButton
                    type="primary"
                    icon={<DownloadOutlined />}
                    style={{ width: 216 }}
                  >
                    {' '}
                    In mã{' '}
                  </CButton>
                  <Spacing height={18} />
                  <CButton
                    type="primary"
                    icon={<SearchOutlined />}
                    style={{ width: 216 }}
                  >
                    {' '}
                    Tra cứu{' '}
                  </CButton>
                </ActionQR>
              </DivRow>
            </CFormItem>
            <CFormItem name="barcode" label={<NameText>Mã vạch</NameText>}>
              <DivRow>
                <BarcodeWrapper>
                  <WrapBarCode>
                    <Barcode
                      height={145}
                      value={form.getFieldValue('barcode') || '0000000000000'}
                    />
                  </WrapBarCode>
                </BarcodeWrapper>
                <ActionQR>
                  <CButton
                    type="primary"
                    icon={<PrinterOutlined />}
                    style={{ width: 216 }}
                  >
                    {' '}
                    Tải xuống{' '}
                  </CButton>
                  <Spacing height={18} />
                  <CButton
                    type="primary"
                    icon={<DownloadOutlined />}
                    style={{ width: 216 }}
                  >
                    {' '}
                    In mã{' '}
                  </CButton>
                  <Spacing height={18} />
                  <CButton
                    type="primary"
                    icon={<SearchOutlined />}
                    style={{ width: 216 }}
                  >
                    {' '}
                    Tra cứu{' '}
                  </CButton>
                </ActionQR>
              </DivRow>
            </CFormItem>
          </Col>
          <Col xs={0} sm={4} md={8} lg={0} xl={2} />
          <Col xs={24} sm={20} md={16} lg={16} xl={10}>
            <CFormItem
              label={<NameText>Tên đối tượng</NameText>}
              name="name"
              rules={[
                {
                  required: true,
                  message: `Bạn chưa nhập tên ${productObject.name}`,
                },
              ]}
            >
              <InputText
                style={{ width: '100%' }}
                placeholder={`Nhập tên ${productObject.name}`}
                size="large"
              />
            </CFormItem>

            <CFormItem
              label={<NameText>Loại đối tượng</NameText>}
              name="objectType"
            >
              <CSelect list={baseObjectTypeList} />
            </CFormItem>

            <CFormItem
              label={<NameText>Loại sản phẩm</NameText>}
              name="productID"
            >
              <CSelect list={productList} />
            </CFormItem>

            <CFormItem label={<NameText>Vùng sản xuất</NameText>} name="areaID">
              <CSelect list={areaList} />
            </CFormItem>

            <CFormItem label={<NameText>Quy trình</NameText>} name="processID">
              <CSelect list={processList} />
            </CFormItem>
          </Col>
          <Col xs={0} sm={4} md={8} lg={8} xl={2} />
        </Row>

        <Row style={{ marginTop: '20px' }}>
          <Col xs={24} sm={20} md={16} lg={16} xl={10}>
            <CFormItem
              name="description"
              label={<NameText>Mô tả sản phẩm</NameText>}
            >
              <TextEditor onChange={handleChangeTextEditor} />
            </CFormItem>
          </Col>
          <Col xs={0} sm={4} md={8} lg={0} xl={2} />
          <Col xs={24} sm={20} md={16} lg={16} xl={10}>
            <CFormItem
              label={<NameText>Hình ảnh {productObject.name}</NameText>}
            >
              <CUploadList
                valuePropName="fileList"
                name="medias"
                getValueFromEvent={handleChangeImg}
                count={countImg}
              />
            </CFormItem>
          </Col>
          <Col xs={0} sm={4} md={8} lg={8} xl={2} />
        </Row>
      </Form>
    </Wrapper>
  );
}

InformationStep.propTypes = {
  productObject: PropTypes.object,
  form: PropTypes.object,
  onSetBodyUpdate: PropTypes.func,
};

export default InformationStep;
