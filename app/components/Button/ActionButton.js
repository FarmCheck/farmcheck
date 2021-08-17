import styled from 'styled-components';

const ActionButton = styled.button`
  width: 120px;
  height: 42px;
  background: ${props => props.theme.dropdownColor};

  border-radius: 6px;
  border: none;

  font-weight: 500;
  cursor: pointer;
  span {
    color: ${props => props.theme.textColor};
  }
`;

export default ActionButton;
