import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { CheckCircleFilled, CheckCircleOutlined } from '@ant-design/icons';

import { Space as CSpace, NormalText, MiniText } from 'components';

const Title = styled.span`
  font-size: ${props => props.theme.fontsizeBase};
  font-weight: 700;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 460px;
`;

const WrapperImg = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  width: 100px;
  height: 80px;
  border-radius: 6px;
  margin-right: 12px;
`;

function DiaryItem({ item }) {
  return (
    <Wrapper>
      <Title>
        {item.name}{' '}
        {item.isVerified ? (
          <CheckCircleOutlined style={{ color: '#39B54A' }} />
        ) : (
          <CheckCircleFilled style={{ color: '#ccc' }} />
        )}
      </Title>
      <MiniText>
        Thời gian: {moment(item.createdAt).format('DD/MM/YYYY HH:mm:ss')}
      </MiniText>
      <NormalText>{item.description}</NormalText>
      <CSpace height={10} />
      <WrapperImg>
        {item.urls.map((e, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <Avatar key={idx} src={e} />
        ))}
      </WrapperImg>
    </Wrapper>
  );
}

DiaryItem.propTypes = {
  item: PropTypes.object,
};

export default DiaryItem;
