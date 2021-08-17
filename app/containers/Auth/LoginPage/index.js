import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Form, Button, Carousel, Input } from 'antd';
import {
  PhoneOutlined,
  LockOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

import { Space, NormalText, TitleText, LogoText } from 'components';

import GlobalStyle from 'global-styles';

import logo from 'images/logo.png';
import intro from 'images/intro.png';

import {
  isVietnamesePhoneNumber,
  formatPhoneNumber,
} from 'commons/functionUtils';

import { loginForUser } from 'containers/Auth/authSlice';

const WrapperLogin = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WrapperLeft = styled.div`
  width: 40%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
`;

const WrapperRight = styled.div`
  width: 60%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WrapLogin = styled.div`
  width: 100%;
  height: auto;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CForm = styled(Form)`
  width: 360px;
`;

const CFormItem = styled(Form.Item)`
  min-height: 50px;

  .ant-form-item-control-input {
    height: 50px;

    .ant-form-item-control-input-content {
      height: 50px;

      .ant-input-affix-wrapper {
        height: 50px;
        border-radius: 6px;
        border-color: #595959;

        .ant-input {
          &::placeholder {
            color: #595959 !important;
          }
        }
      }
    }
  }
`;

const CButton = styled(Button)`
  width: 100%;
  height: 50px !important;
  border: 0 !important;
  margin-bottom: 10px;

  font-weight: 700 !important;

  background-color: ${props => props.theme.primaryColor} !important;
`;

const CDirect = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 24px;
  a {
    margin-left: 6px;
  }
`;

const LogoBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  width: auto;
  margin-bottom: 62px;
`;

const Logo = styled.img`
  width: 52px;
  height: 52px;
`;

const WrapperText = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  flex-direction: column;
  justify-content: center;
`;

const CCarousel = styled(Carousel)`
  .slick-dots {
    margin-left: 0px !important;
  }
`;

const CarouselWrapper = styled.div`
  width: 500px;
  height: 500px;
`;

const CarouselImg = styled.img`
  width: 240px;
  height: 240px;
  border-radius: 6px;
`;

const CarouselContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 500px;
`;

const Phone = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperError = styled.div`
  display: flex;
  width: 360px;
  height: auto;
  background-color: #fff9fa;
  border: 1px solid rgba(255, 66, 79, 0.2);
  border-radius: 6px;
  padding: 12px 15px;
  margin-bottom: 20px;
`;

const InputLogin = styled(Input)`
  min-height: 50px;
  font-size: ${props => props.theme.fontsizeBase} !important;
  font-weight: 500 !important;
  .ant-input-lg {
    font-size: ${props => props.theme.fontsizeBase} !important;
    font-weight: 600 !important;
    color: #17431d;
  }
`;

const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth.user);

  const [isLoginError, setIsLoginError] = useState(false);
  const [isPhoneNumber, setIsPhoneNumber] = useState(true);

  const handleVerifyPhone = e => {
    setIsPhoneNumber(isVietnamesePhoneNumber(e.target.value));
  };

  const handleSummit = async values => {
    const accountBody = {
      phoneNumber: formatPhoneNumber(values.phoneNumber),
      password: values.password,
    };

    try {
      const actionResult = await dispatch(loginForUser(accountBody));
      unwrapResult(actionResult);

      setIsLoginError(false);
    } catch (error) {
      setIsLoginError(true);
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/account/list');
    }
  }, [auth.isAuthenticated]);

  return (
    <WrapperLogin>
      <WrapperLeft>
        <WrapLogin>
          <LogoBar>
            <Logo src={logo} />
            <Space width={10} />
            <WrapperText>
              <LogoText>FarmCheck</LogoText>
            </WrapperText>
          </LogoBar>
          {isLoginError && (
            <WrapperError>
              <CloseCircleOutlined
                style={{
                  fontSize: '16px',
                  color: '#FF6347',
                  marginTop: 2,
                  marginRight: 12,
                }}
              />
              <span>Đăng nhập KHÔNG thành công bạn vui lòng thử lại</span>
            </WrapperError>
          )}
          <CForm
            name="normal_login"
            className="login-form"
            onFinish={handleSummit}
          >
            <CFormItem
              help={
                isPhoneNumber ? null : (
                  <span style={{ color: 'red' }}>
                    Số điện thoại không hợp lệ !
                  </span>
                )
              }
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: 'Bạn chưa nhập số điện thoại!',
                },
              ]}
            >
              <InputLogin
                onChange={handleVerifyPhone}
                style={{ border: '1px solid #d9d9d9' }}
                size="large"
                prefix={
                  <Phone>
                    <PhoneOutlined style={{ marginRight: 12 }} />{' '}
                  </Phone>
                }
                placeholder="Số điện thoại"
              />
            </CFormItem>
            <CFormItem
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Bạn chưa nhập mật khẩu!',
                },
              ]}
            >
              <InputLogin
                style={{ border: '1px solid #d9d9d9' }}
                size="large"
                prefix={<LockOutlined style={{ marginRight: 12 }} />}
                type="password"
                placeholder="Mật khẩu"
              />
            </CFormItem>
            <Form.Item>
              <CDirect>
                <span> Quên mật khẩu? </span>
                {/* <a href="registration">Đăng ký</a> */}
              </CDirect>
              <CButton type="primary" htmlType="submit">
                Đăng nhập
              </CButton>
            </Form.Item>
          </CForm>
        </WrapLogin>
      </WrapperLeft>
      <WrapperRight>
        <CarouselWrapper>
          <CCarousel>
            <div>
              <CarouselContent>
                <CarouselImg src={intro} />
                <Space height={100} />
                <TitleText>Minh bạch thông tin</TitleText>
                <NormalText
                  style={{
                    width: '375px',
                    textAlign: 'center',
                    marginTop: '12px',
                  }}
                >
                  Truy xuất rõ ràng nguồn gốc của sản phẩm cũng như các thông
                  tin doanh nghiệp cuất sứ và chứng nhận
                </NormalText>
              </CarouselContent>
            </div>
            <div>
              <CarouselContent>
                <CarouselImg src={intro} />
                <Space height={100} />
                <TitleText>Minh bạch thông tin</TitleText>
                <NormalText
                  style={{
                    width: '375px',
                    textAlign: 'center',
                    marginTop: '12px',
                  }}
                >
                  Truy xuất rõ ràng nguồn gốc của sản phẩm cũng như các thông
                  tin doanh nghiệp cuất sứ và chứng nhận
                </NormalText>
              </CarouselContent>
            </div>
            <div>
              <CarouselContent>
                <CarouselImg src={intro} />
                <Space height={100} />
                <TitleText>Minh bạch thông tin</TitleText>
                <NormalText
                  style={{
                    width: '375px',
                    textAlign: 'center',
                    marginTop: '12px',
                  }}
                >
                  Truy xuất rõ ràng nguồn gốc của sản phẩm cũng như các thông
                  tin doanh nghiệp cuất sứ và chứng nhận
                </NormalText>
              </CarouselContent>
            </div>
            <div>
              <CarouselContent>
                <CarouselImg src={intro} />
                <Space height={100} />
                <TitleText>Minh bạch thông tin</TitleText>
                <NormalText
                  style={{
                    width: '375px',
                    textAlign: 'center',
                    marginTop: '12px',
                  }}
                >
                  Truy xuất rõ ràng nguồn gốc của sản phẩm cũng như các thông
                  tin doanh nghiệp cuất sứ và chứng nhận
                </NormalText>
              </CarouselContent>
            </div>
          </CCarousel>
        </CarouselWrapper>
      </WrapperRight>
      <GlobalStyle />
    </WrapperLogin>
  );
};

export default LoginPage;
