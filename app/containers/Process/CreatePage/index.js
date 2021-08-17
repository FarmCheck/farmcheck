import React, { useState } from 'react';
import styled from 'styled-components';
import { Steps, Form } from 'antd';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {
  PlusOutlined,
  FileSearchOutlined,
  CheckSquareOutlined,
} from '@ant-design/icons';

import { CButton, PageTitle, Notification, HighlightText } from 'components';
import { create, createStep } from 'containers/Process/processSlice';
import { parseBodySubmit } from 'containers/Process/commons/parseUtils';

import FooterStep from 'containers/Process/components/FooterStep';
import StageStep from 'containers/Process/components/StageStep';
import InformationStep from 'containers/Process/components/InformationStep';
import { useHistory } from 'react-router-dom';

const { Step } = Steps;

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  background: white;
  padding: 24px;
  border-radius: 6px;
`;

const WrapperContent = styled.div`
  width: 100%;
  height: auto;
  background: #ffffff;
`;

const WrapperStepContent = styled.div`
  display: flex;
`;

const WrapperLeft = styled.div`
  display: flex;
  padding-left: 40px;
  padding-top: 20px;
  width: 30%;
  height: ${props => props.height}px;
`;

const WrapperRight = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-top: 20px;
  width: 70%;
  height: auto;
  border-left: 1px solid #e0e0e0;
`;

const WrapperHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  heigh: 64px;
  background: #ffffff;
  border-bottom: 1px solid #f1f1f1;
  padding-bottom: 24px;
`;

const CStep = styled(Step)`
  height: 40px;
`;

const DeleteSpan = styled.span`
  font-size: ${props => props.theme.fontsizeBase};
  line-height: 22px;
  font-weight: 500;
  color: #ff6347;
  cursor: pointer;
  text-decoration-line: underline;
  margin-left: 80px;
`;

export function ProcessCreatePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const farmID = useSelector(state => state.farm.item.id);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();
  const [currentTab, setCurrentTab] = useState(0);

  const initSteps = [
    {
      id: 'start',
      name: 'Thông tin cơ bản',
      component: <InformationStep form={form} stepID="start" />,
    },
    {
      id: 'end',
      name: 'Thu hoạch',
      component: <StageStep form={form} stepID="end" />,
    },
  ];
  const [stepList, setStepList] = useState(initSteps);
  const [bodyCreate, setBodyCreate] = useState({});

  const handleSubmitBodyCreate = () => {
    form.validateFields().then(async values => {
      const newBodyCreate = bodyCreate;
      newBodyCreate[Object.keys(values)[0].replace('name_', '')] = values;

      if (currentTab !== stepList.length - 1) {
        setBodyCreate(newBodyCreate);
        setCurrentTab(currentTab + 1);
        return;
      }

      setIsSubmitting(true);
      Notification('info', 'Đang tạo quy trình');
      const bodyCreateProcess = {
        ...parseBodySubmit(newBodyCreate.start, 'create'),
        farmID,
      };

      try {
        const actionResult = await dispatch(create(bodyCreateProcess));
        const { data } = unwrapResult(actionResult);

        const { start, ...bodyStepList } = newBodyCreate;
        Object.keys(bodyStepList).forEach(async (key, index) => {
          const bodyCreateStep = {
            ...parseBodySubmit(bodyStepList[key], 'create'),
            processID: data.id,
            order: index,
          };
          const actionStepResult = await dispatch(createStep(bodyCreateStep));
          unwrapResult(actionStepResult);
        });

        setIsSubmitting(false);
        Notification('success', 'Thêm mới quy trình thành công');
        history.push('/process/list');
      } catch (error) {
        setIsSubmitting(false);
        Notification('error', 'Tạo quy trình thất bại', error.message);
      }
    });
  };

  const handleDeleteStep = id => {
    if (currentTab === stepList.length - 1) {
      setCurrentTab(currentTab - 1);
    }

    const newStepList = stepList.filter(item => item.id !== id);
    setStepList(newStepList);

    const newBodyCreate = bodyCreate;
    delete newBodyCreate[id];
    setBodyCreate(newBodyCreate);
  };

  const handleAddStep = () => {
    form.validateFields().then(() => {
      const id = Date.now().toString();
      const newStepList = stepList;
      newStepList.splice(stepList.length - 1, 0, {
        id,
        name: 'Công đoạn mới',
        component: <StageStep key={id} stepID={id} form={form} />,
      });

      setStepList([...newStepList]);
    });
  };

  return (
    <Wrapper>
      <WrapperHeader>
        <PageTitle
          title="Thêm mới quy trình"
          description=" Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin
              tưởng về khả năng khống chế dịch của Việt Nam."
        />
        <CButton
          disabled={currentTab < stepList.length - 2}
          onClick={handleAddStep}
          size="large"
          type="primary"
        >
          <PlusOutlined />
          Thêm mới công đoạn
        </CButton>
      </WrapperHeader>
      <WrapperContent>
        <WrapperStepContent>
          <WrapperLeft height={stepList.length * 100}>
            <Steps initial={-1} direction="vertical" current={currentTab - 1}>
              {stepList.map(step => {
                switch (step.id) {
                  case 'start':
                    return (
                      <CStep
                        key={step.id}
                        icon={
                          <FileSearchOutlined style={{ fontSize: '30px' }} />
                        }
                        title={<HighlightText>{step.name}</HighlightText>}
                      />
                    );
                  case 'end':
                    return (
                      <CStep
                        key={step.id}
                        icon={
                          <CheckSquareOutlined style={{ fontSize: '30px' }} />
                        }
                        title={<HighlightText>{step.name}</HighlightText>}
                      />
                    );
                  default:
                    return (
                      <Step
                        key={step.id}
                        title={
                          <>
                            <HighlightText>{step.name}</HighlightText>
                            <DeleteSpan
                              onClick={() => handleDeleteStep(step.id)}
                            >
                              Xóa
                            </DeleteSpan>
                          </>
                        }
                      />
                    );
                }
              })}
            </Steps>
          </WrapperLeft>
          <WrapperRight>
            {stepList[currentTab].component}
            <FooterStep
              isSubmitting={isSubmitting}
              max={stepList.length - 1}
              current={currentTab}
              next={handleSubmitBodyCreate}
              prev={() => setCurrentTab(currentTab - 1)}
            />
          </WrapperRight>
        </WrapperStepContent>
      </WrapperContent>
    </Wrapper>
  );
}

export default ProcessCreatePage;
