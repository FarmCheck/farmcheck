import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Form } from 'antd';

import { TitleText, NormalText, Space } from 'components';

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

const OTPStep = () => {
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

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [counter]);

  return (
    <>
      <TitleText>Vui Lòng Nhập Mã Xác Minh</TitleText>
      <Space height={12} />
      <NormalText>
        Mã xác minh của bạn sẽ được gửi bằng tin nhắn đến 0123123123
      </NormalText>
      <Space height={90} />
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
          <span>Bạn không nhận được mã?</span>
          <DivRow>
            <CButtonLink type="link">Gửi lại</CButtonLink>
          </DivRow>
        </>
      )}
      {counter > 0 && (
        <>
          <span>
            Gửi lại sau <PrimaryText>{`${counter}`}</PrimaryText> giây
          </span>
          <span>Mã xác minh chỉ có hiệu lực trong 15 phút</span>
        </>
      )}
      <Space height={95} />
    </>
  );
};

export default OTPStep;
