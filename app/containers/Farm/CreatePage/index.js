import React, { useState } from 'react';
import styled from 'styled-components';
import firebase from 'utils/firebase';
import GlobalStyle from 'global-styles';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Steps, Space, Form, message, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import { HeaderNavbar, Notification, CButton, NameText } from 'components';

import { formatPhoneNumber } from 'commons/functionUtils';

import { create } from 'containers/Farm/farmSlice';
import {
  logoutForUser,
  // logoutForFarm,
  loginForFarm,
} from 'containers/Auth/authSlice';
import { create as createCertificationAble } from 'containers/CertificationAble/certificationAbleSlice';
import { create as createFarmCategory } from 'containers/HomePage/farmCategorySlice';

// import { updateTokenID } from 'api/services/farmService';

import OTPStep from 'containers/Farm/CreatePage/OTPStep';
import InformationStep from 'containers/Farm/CreatePage/InformationStep';
import SelectionStep from 'containers/Farm/CreatePage//SelectionStep';

const { Step } = Steps;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const WrapperContent = styled.div`
  width: 600px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const TextStep = styled.span`
  font-size: ${props => props.theme.fontsizeBase} !important;
  font-weight: 700;
  line-height: 12px !important;
`;

const ContentStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
`;

const CSpace = styled(Space)`
  position: absolute;
  top: 97px;
  left: 124px;
`;

const rules = [
  {
    field: 'name',
    conditions: [
      { name: 'required', value: true },
      { name: 'minLength', value: 5 },
    ],
  },
  {
    field: 'email',
    conditions: [{ name: 'required', value: true }],
  },
  {
    field: 'phoneNumber',
    conditions: [
      { name: 'required', value: true },
      { name: 'minLength', value: 10 },
    ],
  },
];

const FarmCreatePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.auth.user.item);

  const [form] = Form.useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [bodyUpdate, setBodyUpdate] = useState({});
  const [farmID, setFarmID] = useState(undefined);
  const [item, setItem] = useState({});

  const [OTP, setOTP] = useState({
    code: '',
    isCorrect: true,
  });

  const [selectedItem, setSelectedItem] = useState({
    certificationIds: [],
    categoryIds: [],
  });

  const handleSetBodyUpdate = value => {
    setItem({ ...item, ...value });
    if (farmID) {
      setBodyUpdate({ ...bodyUpdate, ...value });
    }
  };

  const handleLogoutUser = async () => {
    await dispatch(logoutForUser());
  };

  const handleSetUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback() {
          handleSignInSubmit();
        },
        defaultCountry: 'IN',
      },
    );
  };

  const handleSignInSubmit = phone => {
    handleSetUpRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phone, appVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult;
      })
      .catch(() => {
        message.warning('Xác minh số điện thoại thất bại');
      });
  };

  const handleSubmitBodyInfo = async () => {
    form.validateFields().then(async values => {
      const location = form.getFieldsValue([
        'address',
        'longitude',
        'latitude',
      ]);
      setIsSubmitting(true);
      const body = {
        ...values,
        ...location,
        userID: user.id,
        phoneNumber: formatPhoneNumber(values.phoneNumber),
      };

      Object.keys(body).forEach(e => {
        if (body[e] === undefined) {
          delete body[e];
        }
      });

      try {
        const actionResult = await dispatch(create(body));
        const { id } = unwrapResult(actionResult);

        setFarmID(id);

        const loginActionResult = await dispatch(loginForFarm(id));
        unwrapResult(loginActionResult);

        setIsSubmitting(false);
        Notification('info', 'Tạo nông trại thành công');
        setCurrentTab(currentTab + 1);
      } catch (error) {
        setIsSubmitting(false);
        Notification('error', 'Tạo nông trại thất bại', error.message);
      }
    });
  };

  const handleSubmitBodyOTP = () => {
    setCurrentTab(currentTab + 1);
    // const otpInput = OTP.code;
    // const optConfirm = window.confirmationResult;
    // optConfirm
    //   .confirm(otpInput)
    //   .then(() => {
    //     firebase.auth().onAuthStateChanged(account => {
    //       if (account) {
    //         account.getIdToken().then(tokenID => {
    //           updateTokenID(tokenID);
    //           setCurrentTab(currentTab + 1);
    //           setOTP({
    //             ...OTP,
    //             isCorrect: true,
    //           });
    //         });
    //       }
    //     });
    //   })
    //   .catch(() => {
    //     setOTP({
    //       ...OTP,
    //       isCorrect: false,
    //     });
    //   });
  };

  const handleFinalStep = () => {
    setIsSubmitting(true);
    selectedItem.certificationIds.forEach(async id => {
      const body = {
        targetType: 'farm',
        targetID: farmID,
        certificationID: id,
      };

      try {
        const actionResult = await dispatch(
          createCertificationAble({
            body,
            option: { targetType: 'farm' },
          }),
        );
        unwrapResult(actionResult);
      } catch (error) {
        Notification('error', 'Chọn chứng chỉ thất bại', error.message);
      }
    });

    selectedItem.categoryIds.forEach(id => {
      const body = {
        farmID,
        categoryID: id,
      };

      try {
        const actionResult = dispatch(createFarmCategory(body));
        unwrapResult(actionResult);
      } catch (error) {
        Notification('error', 'Chọn danh mục thất bại', error.message);
      }
    });
    setIsSubmitting(false);
    history.push('/');
  };

  const handleNextStep = () => {
    switch (currentTab) {
      case 0:
        return handleSubmitBodyInfo();
      case 1:
        return handleSubmitBodyOTP();
      case 2:
        return handleFinalStep();
      default:
        return 0;
    }
  };

  const ListStep = [
    <InformationStep form={form} onSetBodyUpdate={handleSetBodyUpdate} />,
    <OTPStep form={form} OTP={OTP} setOTP={setOTP} />,
    <SelectionStep data={selectedItem} setData={setSelectedItem} />,
  ];

  return (
    <Wrapper>
      <HeaderNavbar user={user} onLogoutUser={handleLogoutUser} />

      <Link to="/account/detail">
        <CSpace>
          <Button
            size="large"
            type="primary"
            shape="circle"
            icon={<LeftOutlined />}
          />
          <NameText> Quay lại</NameText>
        </CSpace>
      </Link>

      <WrapperContent>
        <Steps labelPlacement="vertical" current={currentTab}>
          <Step
            onClick={() => setCurrentTab(0)}
            title={<TextStep>Nhập thông tin</TextStep>}
          />
          <Step
            onClick={() => setCurrentTab(1)}
            title={<TextStep>Xác thực OTP</TextStep>}
          />
          <Step
            onClick={() => setCurrentTab(2)}
            title={<TextStep>Lựa chọn danh mục bán</TextStep>}
          />
        </Steps>
        <ContentStep>
          {ListStep[currentTab]}
          <CButton
            loading={isSubmitting}
            style={{ width: 380 }}
            type="primary"
            htmlType="submit"
            onClick={handleNextStep}
            src={item}
            rules={rules}
          >
            Xác nhận
          </CButton>
          <div id="recaptcha-container" />
        </ContentStep>
      </WrapperContent>
      <GlobalStyle />
    </Wrapper>
  );
};

export default FarmCreatePage;
