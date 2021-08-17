import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { unwrapResult } from '@reduxjs/toolkit';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Form, DatePicker, Space, Skeleton } from 'antd';

import { parseUtils } from 'commons/parseUtils';

import {
  NameText,
  CUploadList,
  CSelect,
  CButton,
  Notification,
} from 'components';

import {
  create,
  update,
  remove,
} from 'containers/CertificationAble/certificationAbleSlice';
import { find as findCertification } from 'containers/HomePage/certificationSlice';
import { find as findOrganization } from 'containers/HomePage/organizationSlice';

import {
  certification as certificationQuery,
  organization as organizationQuery,
} from '../commons/query';

const { RangePicker } = DatePicker;

const Wrapper = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 24px;
  border: 1px solid
    ${props =>
      props.isFocusing
        ? props.theme.primaryColor
        : props.theme.borderColorBase};
  border-radius: 6px;
  margin-bottom: 24px;
  opacity: 1;
`;

const WrapperAction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const WrapperContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const WrapperLeft = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
`;

const WrapperRight = styled.div`
  padding-left: 24px;
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const CFormItemWithoutMargin = styled(Form.Item)`
  margin-bottom: 0px !important;
`;

const CFormItem = styled(Form.Item)`
  width: 49%;
  height: 100%;
  margin-right: 20px;
  display: flex;
  flex-direction: column;

  margin-bottom: 0px !important;

  .columnInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const WrapperImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 6px;
  margin-top: 10px;
  margin-bottom: 22px;
`;

const CDatePicker = styled(RangePicker)`
  min-height: 50px;
`;

const LogoSkeleton = (
  <Skeleton.Image
    style={{ width: 150, height: 150, marginBottom: 22 }}
    size="large"
    active
  />
);

function Item({
  detail,
  focusingItem,
  targetID,
  targetType,
  handleDelete,
  setIsDone,
  onFocus,
}) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const certificationList = useSelector(state => state.certification.list);
  const organizationList = useSelector(state => state.organization.list);

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const [organizationLogo, setOrganizationLogo] = useState('');
  const [certificationLogo, setCertificationLogo] = useState('');

  const [bodyUpdate, setBodyUpdate] = useState({});
  const [certificationAbleID, setCertificationAbleID] = useState('');

  const [countImg, setCountImg] = useState(
    (form.getFieldValue('medias') && form.getFieldValue('medias').length) || 0,
  );

  const handleSetBodyUpdate = value => {
    if (certificationAbleID !== '') {
      setBodyUpdate({ ...bodyUpdate, ...value });
    }
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

  const handleChangeOrganization = id => {
    organizationList.forEach(item => {
      if (item.id === id) {
        setOrganizationLogo(item.logo);
      }
    });
  };

  const handleChangeCertification = id => {
    certificationList.forEach(item => {
      if (item.id === id) {
        setCertificationLogo(item.logo);
      }
    });
  };

  const handleSubmitCertificationAbleForm = async () => {
    if (certificationAbleID !== '') {
      if (Object.keys(bodyUpdate).length === 0) {
        Notification('warning', 'Chưa có thay đổi nào');
        return;
      }

      const body = {
        targetType,
        targetID,
        ...bodyUpdate,
      };

      if (body.effectiveAt) {
        body.effectiveAt = moment(body.effectiveAt[1]).format();
      }

      parseUtils(body, 'urls', 'url');

      try {
        setIsSubmitting(true);
        const actionResult = await dispatch(
          update({
            id: certificationAbleID,
            body,
            option: { targetType },
          }),
        );

        unwrapResult(actionResult);

        setIsSubmitting(false);
        setBodyUpdate({});
        Notification('success', 'Cập nhật chứng chỉ thành công');
      } catch (error) {
        setIsSubmitting(false);
        Notification('error', 'Cập nhật chứng chỉ thất bại');
      }
      return;
    }

    form.validateFields().then(async values => {
      parseUtils(values, 'urls', 'url');
      if (values.effectiveAt) {
        values.effectiveAt = moment(values.effectiveAt[1]).format();
      } else {
        delete values.effectiveAt;
      }

      const body = {
        targetType,
        targetID,
        ...values,
      };

      try {
        setIsSubmitting(true);
        const actionResult = await dispatch(
          create({ body, option: { targetType } }),
        );

        const { data } = unwrapResult(actionResult);
        setCertificationAbleID(data.id);

        setIsDone(true);
        setIsSubmitting(false);
        Notification('success', 'Đăng ký chứng nhận thành công');
      } catch (error) {
        setIsSubmitting(false);
        Notification('error', 'Đăng ký chứng nhận thất bại');
      }
    });
  };

  const handleDeleteCertificationAble = async id => {
    if (certificationAbleID === '') {
      handleDelete(id, detail.index);
    } else {
      try {
        setIsLoadingDelete(true);
        const actionResult = await dispatch(remove(certificationAbleID));

        unwrapResult(actionResult);

        setIsLoadingDelete(false);

        handleDelete(id, detail.index);

        Notification('success', 'Xóa chứng nhận thành công');
      } catch (error) {
        setIsLoadingDelete(false);
        Notification('error', 'Xóa chứng nhận chứng chỉ thất bại');
      }
    }
  };

  const initDataCertification = () => {
    if (certificationList.length === 0) {
      setIsLoadingData(true);
      dispatch(findCertification(certificationQuery));
    } else if (!detail.certification) {
      setIsLoadingData(false);
      form.setFieldsValue({ certificationID: certificationList[0].id });
      setCertificationLogo(certificationList[0].logo);
    } else {
      setIsLoadingData(false);
    }
  };

  const initDataOrganization = () => {
    if (organizationList.length === 0) {
      setIsLoadingData(true);
      dispatch(findOrganization(organizationQuery));
    } else if (!detail.organization) {
      setIsLoadingData(false);
      form.setFieldsValue({ organizationID: organizationList[0].id });
      setOrganizationLogo(organizationList[0].logo);
    } else {
      setIsLoadingData(false);
    }
  };

  const initDataDetail = () => {
    if (Object.keys(detail).length > 2) {
      const urls = detail.urls.map((url, index) => ({
        uid: index,
        url,
      }));

      if (detail.certification) {
        setCertificationLogo(detail.certification.logo);
        form.setFieldsValue({ certificationID: detail.certification.id });
      }

      if (detail.organization) {
        setOrganizationLogo(detail.organization.logo);
        form.setFieldsValue({ organizationID: detail.organization.id });
      }

      form.setFieldsValue({
        effectiveAt: [moment(), moment(detail.createdAt)],
        urls,
      });
      setCertificationAbleID(detail.id);
    }
  };

  useEffect(() => {
    initDataCertification();
  }, [certificationList]);

  useEffect(() => {
    initDataOrganization();
  }, [organizationList]);

  useEffect(() => {
    initDataDetail();
  }, []);

  return (
    <Wrapper
      isFocusing={detail.index === focusingItem}
      onClick={() => onFocus(detail.index)}
    >
      <WrapperAction>
        <NameText>Thông tin chứng nhận</NameText>
        <Space>
          <CButton
            height={40}
            type="text"
            danger
            loading={isLoadingDelete}
            onClick={() => handleDeleteCertificationAble(detail.id)}
          >
            Xóa
          </CButton>
          <CButton
            type={
              Object.keys(bodyUpdate).length > 0 || certificationAbleID === ''
                ? 'primary'
                : undefined
            }
            height={40}
            loading={isSubmitting}
            onClick={handleSubmitCertificationAbleForm}
          >
            Lưu lại
          </CButton>
        </Space>
      </WrapperAction>
      <Form form={form} onValuesChange={handleSetBodyUpdate} layout="vertical">
        <WrapperContent>
          <WrapperLeft>
            <CFormItem label={<NameText>Loại chứng nhận</NameText>}>
              <div className="columnInfo">
                {isLoadingData ? (
                  LogoSkeleton
                ) : (
                  <WrapperImg src={certificationLogo} />
                )}
                <Form.Item
                  style={{ width: '100%' }}
                  name="certificationID"
                  marginouter="0px !important"
                  margininer="0px !important"
                >
                  <CSelect
                    onChange={handleChangeCertification}
                    list={certificationList}
                    placeHolder="Chọn loại chứng nhận"
                  />
                </Form.Item>
              </div>
            </CFormItem>
            <CFormItem label={<NameText>Cơ quan tổ chức</NameText>}>
              <div className="columnInfo">
                {isLoadingData ? (
                  LogoSkeleton
                ) : (
                  <WrapperImg src={organizationLogo} />
                )}
                <Form.Item
                  style={{ width: '100%' }}
                  name="organizationID"
                  marginouter="0px !important"
                  margininer="0px !important"
                >
                  <CSelect
                    onChange={handleChangeOrganization}
                    list={organizationList}
                    placeHolder="Chọn loại cơ quan tổ chức"
                  />
                </Form.Item>
              </div>
            </CFormItem>
          </WrapperLeft>

          <WrapperRight>
            <Form.Item
              center="center"
              name="effectiveAt"
              label={<NameText>Thời gian</NameText>}
              initialValue={[moment(), moment().add(30, 'days')]}
            >
              <CDatePicker
                size="large"
                style={{ width: '100%' }}
                defaultValue={[moment(), moment().add(30, 'days')]}
                format="DD/MM/YYYY"
              />
            </Form.Item>
            <CFormItemWithoutMargin
              name="urls"
              label={<NameText>Hình ảnh chứng nhận</NameText>}
            >
              <CUploadList
                valuePropName="fileList"
                name="urls"
                getValueFromEvent={handleChangeImg}
                count={countImg}
              />
            </CFormItemWithoutMargin>
          </WrapperRight>
        </WrapperContent>
      </Form>
    </Wrapper>
  );
}

Item.propTypes = {
  detail: PropTypes.object,
  focusingItem: PropTypes.number,
  targetID: PropTypes.string,
  targetType: PropTypes.string,
  handleDelete: PropTypes.func,
  setIsDone: PropTypes.func,
  onFocus: PropTypes.func,
};

export default Item;
