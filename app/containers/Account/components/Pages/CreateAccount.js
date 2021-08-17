import React, { useState } from 'react';
import styled from 'styled-components';
import { Steps } from 'antd';
import { CButton } from 'components';

import PhoneStep from 'containers/Account/components/Steps/PhoneStep';
import OTPStep from 'containers/Account/components/Steps/OTPStep';
import InformationStep from 'containers/Account/components/Steps/InformationStep';
import CategoryStep from 'containers/Account/components/Steps/CategoryStep';

const { Step } = Steps;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WrapperStep = styled.div`
  width: 600px;
`;

const TextStep = styled.span`
  font-size: ${props => props.theme.fontsizeBase} !important;
  font-weight: 700;
  line-height: 12px !important;
`;

const CreateAccount = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const listStep = [
    <PhoneStep />,
    <OTPStep />,
    <InformationStep />,
    <CategoryStep />,
  ];

  return (
    <Wrapper>
      {currentStep !== 0 && (
        <WrapperStep>
          <Steps labelPlacement="vertical" current={currentStep - 1}>
            <Step
              onClick={() => setCurrentStep(1)}
              title={<TextStep>Xác thực OTP</TextStep>}
            />
            <Step
              onClick={() => setCurrentStep(2)}
              title={<TextStep>Nhập thông tin</TextStep>}
            />
            <Step
              onClick={() => setCurrentStep(3)}
              title={<TextStep>Lựa chọn danh mục bán</TextStep>}
            />
          </Steps>
        </WrapperStep>
      )}

      {listStep[currentStep]}

      <CButton
        type="primary"
        style={{ width: 380 }}
        onClick={() => setCurrentStep(currentStep + 1)}
      >
        Xác nhận
      </CButton>
    </Wrapper>
  );
};

export default CreateAccount;
