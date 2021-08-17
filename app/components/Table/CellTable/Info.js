import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';
import { FileImageOutlined } from '@ant-design/icons';

import NameText from 'components/Text/NameText';

const Wrapper = styled.div`
  display: flex;
  width: 220px;
  height: 60px;
`;

const Img = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 6px;
`;

const DivInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: auto;
  height: 100%;
  margin-left: 20px;
`;

const FakeImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background: #f6fcf9;
  border-radius: 6px;
`;

function InfoCellTable({ name, img }) {
  return (
    <Wrapper>
      {img ? (
        <Img alt="img" src={img} />
      ) : (
        <FakeImg>
          {' '}
          <FileImageOutlined
            style={{ fontSize: '30px', color: '#8c8c8c' }}
          />{' '}
        </FakeImg>
      )}
      <DivInfo>
        <NameText>{name}</NameText>
      </DivInfo>
    </Wrapper>
  );
}

InfoCellTable.propTypes = {
  name: string,
  img: string,
};

export default InfoCellTable;
