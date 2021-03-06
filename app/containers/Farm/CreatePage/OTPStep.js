import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import firebase from 'utils/firebase';
import PropTypes from 'prop-types';
import { Button, Form } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

import { TitleText, Space, NormalText } from 'components';

const WrapperCode = styled.div`
  display: flex;
  justify-content: space-between;
  width: 360px;
  height: 60px;

  > div {
    width: 16%;
    height: 100%;
    > div {
      dis > input {
        width: 16%;
        hight: 60px;
      }
    }
  }
`;

const DivRow = styled.div`
  display: flex;
  height: auto;
  align-items: center;
`;

const CButtonLink = styled(Button)`
  font-size: ${props => props.theme.fontsizeBase};
  font-weight: 700 !important;
  color: #39b54a !important;
  padding: 4px 4px;
`;

const PrimaryText = styled.span`
  font-size: ${props => props.theme.fontsizeBase};
  font-weight: 700;
  color: #39b54a;
`;

const CInputNumber = styled.input`
  width: 40px;
  height: 40px;
  border: none;
  border-bottom: 1px solid #595959;
  text-align: center;
  color: #595959;
  font-size: 18px;
  font-weight: 700;
  &:focus {
    outline: none;
  }
`;

const WrapperError = styled.div`
  display: flex;
  width: auto;
  height: auto;
  background-color: #fff9fa;
  border: 1px solid rgba(255, 66, 79, 0.2);
  border-radius: 6px;
  padding: 12px 15px;
  margin-bottom: 20px;
`;

const OTPStep = ({ OTP, phoneNumber }) => {
  const [counter, setCounter] = useState(60);
  const [OTPValue, setOTPValue] = useState({});

  const inputfocus = e => {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      const next = e.target.tabIndex - 2;
      if (next > -1) {
        e.target.form.elements[next].focus();
      }
    } else {
      const next = e.target.tabIndex;
      if (next < 6) {
        e.target.form.elements[next].focus();
      }
    }
  };

  const setUpRecaptcha = () => {
    setCounter(60);
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback() {
          onSignInSubmit();
        },
        defaultCountry: 'IN',
      },
    );
  };

  const onSignInSubmit = phone => {
    setUpRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phone, appVerifier)
      .then(confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // console.log(confirmationResult);
        // console.log('OTP is sent');
      });
    // .catch(function(error) {
    //   console.log(error);
    // });
  };

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [counter]);

  return (
    <>
      <TitleText>Vui L??ng Nh???p M?? X??c Minh</TitleText>
      <Space height={12} />
      <NormalText>
        {`M?? x??c minh c???a b???n s??? ???????c g???i b???ng tin nh???n ?????n ${phoneNumber}`}
      </NormalText>
      <Space height={90} />

      {!OTP.isCorrect && (
        <WrapperError>
          <CloseCircleOutlined
            style={{
              fontSize: '16px',
              color: '#FF6347',
              marginTop: 2,
              marginRight: 12,
            }}
          />
          <span>OTP kh??ng ????ng vui l??ng nh???p l???i</span>
        </WrapperError>
      )}

      <Form>
        <WrapperCode>
          <CInputNumber
            maxLength={1}
            tabIndex={1}//eslint-disable-line
            onChange={e => setOTPValue({ ...OTPValue, input1: e.target.value })}
            onKeyUp={inputfocus}
          />
          <CInputNumber
            name="otp"
            maxLength={1}
            tabIndex={2}//eslint-disable-line
            onChange={e => setOTPValue({ ...OTPValue, input2: e.target.value })}
            onKeyUp={inputfocus}
          />
          <CInputNumber
            name="otp"
            maxLength={1}
            tabIndex={3}//eslint-disable-line
            onChange={e => setOTPValue({ ...OTPValue, input3: e.target.value })}
            onKeyUp={inputfocus}
          />
          <CInputNumber
            name="otp"
            maxLength={1}
            tabIndex={4}//eslint-disable-line
            onChange={e => setOTPValue({ ...OTPValue, input4: e.target.value })}
            onKeyUp={inputfocus}
          />
          <CInputNumber
            name="otp"
            maxLength={1}
            tabIndex={5}//eslint-disable-line
            onChange={e => setOTPValue({ ...OTPValue, input5: e.target.value })}
            onKeyUp={inputfocus}
          />
          <CInputNumber
            name="otp"
            maxLength={1}
            tabIndex={6}//eslint-disable-line
            onChange={e => setOTPValue({ ...OTPValue, input6: e.target.value })}
            onKeyUp={inputfocus}
          />
        </WrapperCode>
      </Form>

      <Space height={36} />
      {counter === 0 && (
        <>
          <span>B???n kh??ng nh???n ???????c m???</span>
          <DivRow>
            <CButtonLink
              onClick={() => onSignInSubmit(phoneNumber)}
              type="link"
            >
              G???i l???i
            </CButtonLink>
          </DivRow>
        </>
      )}
      {counter > 0 && (
        <>
          <span>
            G???i l???i sau <PrimaryText>{`${counter}`}</PrimaryText> gi??y
          </span>
          <span>M?? x??c minh ch??? c?? hi???u l???c trong 15 ph??t</span>
        </>
      )}
      <Space height={95} />
    </>
  );
};

OTPStep.propTypes = {
  phoneNumber: PropTypes.string,
  OTP: PropTypes.object,
};

export default OTPStep;
