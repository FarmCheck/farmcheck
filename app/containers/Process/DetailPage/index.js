import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Steps, Form } from 'antd';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {
  PlusOutlined,
  FileSearchOutlined,
  CheckSquareOutlined,
} from '@ant-design/icons';

import { CButton, PageTitle, Notification, HighlightText } from 'components';
import {
  findOne,
  update,
  updateStep,
  createStep,
} from 'containers/Process/processSlice';

import {
  parseBodySubmit,
  parseDataInit,
} from 'containers/Process/commons/parseUtils';

import FooterStep from 'containers/Process/components/FooterStep';
import StageStep from 'containers/Process/DetailPage/StageStep';
import NewStageStep from 'containers/Process/components/StageStep';
import InformationStep from 'containers/Process/components/InformationStep';
import { processBase } from 'containers/Process/commons/query';
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

export function ProcessDetailPage({ match }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const farmID = useSelector(state => state.farm.item.id);

  const [form] = Form.useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChangeBodyUpdate, setIsChangeBodyUpdate] = useState(false);

  const [initCountStep, setInitCountStep] = useState(0);
  const [currentTab, setCurrentTab] = useState(0);

  const [bodyUpdate, setBodyUpdate] = useState({});
  const [bodyCreate, setBodyCreate] = useState({});

  const [stepList, setStepList] = useState([]);

  const handleAddStep = () => {
    form.validateFields().then(() => {
      const id = Date.now().toString();
      const newStepList = stepList;
      newStepList.splice(stepList.length - 1, 0, {
        id,
        name: 'Công đoạn mới',
        component: <NewStageStep key={id} stepID={id} form={form} />,
      });

      setStepList([...newStepList]);
    });
  };

  const handleSetBodyUpdate = (value, stepID) => {
    if (Object.keys(value)[0].slice(0, 14) === 'stepProperties') {
      return;
    }

    const newBody = Object.assign(bodyUpdate, value);
    newBody.stepID = stepID;
    setBodyUpdate(newBody);
    setIsChangeBodyUpdate(true);
  };

  const handleUpdateProcess = async () => {
    const { stepID, ...body } = bodyUpdate;
    const bodyResult = {
      ...parseBodySubmit(body),
      farmID,
    };
    setIsSubmitting(true);

    try {
      const actionResult = await dispatch(
        update({ id: match.params.id, body: bodyResult }),
      );
      unwrapResult(actionResult);

      setIsSubmitting(false);
      Notification('info', 'Cập nhật quy trình thành công');

      setBodyUpdate({});
      setIsChangeBodyUpdate(false);
      setCurrentTab(currentTab + 1);
    } catch (error) {
      setIsSubmitting(false);
      Notification('error', 'Cập nhật quy trình thất bại', error.message);
    }
  };

  const handleUpdateProcessStep = async () => {
    const { stepID, ...body } = bodyUpdate;
    const bodyResult = {
      ...parseBodySubmit(body),
      processID: match.params.id,
    };
    setIsSubmitting(true);

    try {
      const actionResult = await dispatch(
        updateStep({ id: bodyUpdate.stepID, body: bodyResult }),
      );
      unwrapResult(actionResult);

      setIsSubmitting(false);
      Notification('info', 'Cập nhật bước quy trình thành công');

      setBodyUpdate({});
      setIsChangeBodyUpdate(false);
      setCurrentTab(currentTab + 1);
    } catch (error) {
      setIsSubmitting(false);
      Notification('error', 'Cập nhật bước quy trình thất bại', error.message);
    }
  };

  const handleSubmitBodyUpdate = () => {
    form.validateFields().then(async () => {
      if (Object.keys(bodyUpdate).length === 0) {
        setCurrentTab(currentTab + 1);
        return;
      }

      if (bodyUpdate.stepID === 'start') {
        handleUpdateProcess();
        return;
      }

      handleUpdateProcessStep();
    });
  };

  const handleCreateSteps = async () => {
    if (Object.keys(bodyCreate).length === 0) {
      return;
    }
    setIsSubmitting(false);

    try {
      Object.keys(bodyCreate).forEach(async (key, index) => {
        const bodyCreateStep = {
          ...parseBodySubmit(bodyCreate[key], 'create'),
          processID: match.params.id,
          order: initCountStep + index - 1,
        };

        const actionResultCreate = await dispatch(createStep(bodyCreateStep));
        unwrapResult(actionResultCreate);
      });

      setIsSubmitting(false);
      Notification('info', 'Thêm bước quy trình thành công');
    } catch (error) {
      Notification('error', 'Thêm bước quy trình thất bại', error.message);
    }
  };

  const handleSubmitBodyCreate = () => {
    form.validateFields().then(async values => {
      const newBodyCreate = bodyCreate;
      newBodyCreate[Object.keys(values)[0].replace('name_', '')] = values;

      setBodyCreate(newBodyCreate);
      setCurrentTab(currentTab + 1);
    });
  };

  const handleUpdateProcessComplete = () => {
    form.validateFields().then(async () => {
      if (Object.keys(bodyUpdate).length === 0) {
        handleCreateSteps();
        history.push('/process/list');
        return;
      }

      setIsSubmitting(true);
      handleCreateSteps();

      const { stepID, ...body } = bodyUpdate;
      const bodyResult = {
        ...parseBodySubmit(body),
        processID: match.params.id,
      };

      try {
        const actionResultUpdate = await dispatch(
          updateStep({ id: bodyUpdate.stepID, body: bodyResult }),
        );
        unwrapResult(actionResultUpdate);

        setIsSubmitting(false);
        Notification('info', 'Cập nhật quy trình thành công');
        history.push('/process/list');
      } catch (error) {
        setIsSubmitting(false);
        Notification('error', 'Cập nhật quy trình thất bại', error.message);
      }
    });
  };

  const handleNext = () => {
    switch (true) {
      case currentTab < initCountStep:
        return handleSubmitBodyUpdate();
      case currentTab === stepList.length - 1:
        return handleUpdateProcessComplete();
      default:
        return handleSubmitBodyCreate();
    }
  };

  const handlePrev = () => {
    setCurrentTab(currentTab - 1);
  };

  const initData = async () => {
    const initSteps = [
      {
        id: 'start',
        name: 'Thông tin cơ bản',
        component: (
          <InformationStep
            form={form}
            stepID="start"
            onSetBodyUpdate={handleSetBodyUpdate}
          />
        ),
      },
    ];

    try {
      const actionResult = await dispatch(
        findOne({ id: match.params.id, option: processBase }),
      );
      const { data } = unwrapResult(actionResult);
      setInitCountStep(data.steps.length);
      form.setFieldsValue({ name_start: data.name });

      const steps = data.steps.map((item, index) => {
        form.setFieldsValue({
          ...parseDataInit(item),
        });
        return {
          id: item.id,
          name: index === data.steps.length - 1 ? 'Thu hoạch' : item.name,
          component: (
            <StageStep
              key={item.id}
              isLastStep={index === data.steps.length - 1}
              form={form}
              stepID={item.id}
              onSetBodyUpdate={handleSetBodyUpdate}
            />
          ),
        };
      });

      const newStepList = initSteps.concat(steps);
      setStepList(newStepList);
    } catch (err) {
      Notification('error', 'Tải dữ liệu thất bại', err.message);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <Wrapper>
      <WrapperHeader>
        <PageTitle
          title="Chỉnh sửa quy trình"
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
                        title={<HighlightText>{step.name}</HighlightText>}
                      />
                    );
                }
              })}
            </Steps>
          </WrapperLeft>
          <WrapperRight>
            {stepList.length > 0 && stepList[currentTab].component}
            <FooterStep
              isSubmitting={isSubmitting}
              isChangeBody={isChangeBodyUpdate}
              max={stepList.length - 1}
              current={currentTab}
              next={handleNext}
              prev={handlePrev}
            />
          </WrapperRight>
        </WrapperStepContent>
      </WrapperContent>
    </Wrapper>
  );
}

ProcessDetailPage.propTypes = {
  match: PropTypes.object,
};

export default ProcessDetailPage;
