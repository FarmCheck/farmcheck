import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { NameText } from 'components';

const PopoverItem = styled.div`
  display: flex;
  width: auto;
  height: 48px;
  padding: 0px 36px;
  align-items: center;
  background: ${props => (props.active ? props.theme.navbarColor : null)};
  cursor: pointer;
`;

const PopoverContent = ({ menuItem, menuActive, setMenuActive }) => {
  if (menuItem.length) {
    return (
      <div>
        {menuItem.map(item => (
          <Link key={item.link} to={item.link}>
            <PopoverItem
              onClick={() => setMenuActive(item.link)}
              key={item.link}
              active={item.link === menuActive}
            >
              <NameText>{item.title}</NameText>
            </PopoverItem>
          </Link>
        ))}
      </div>
    );
  }
  return (
    <Link to={menuItem.link}>
      <PopoverItem onClick={() => setMenuActive(menuItem.link)}>
        <NameText>{menuItem.title}</NameText>
      </PopoverItem>
    </Link>
  );
};

PopoverContent.propTypes = {
  menuItem: PropTypes.any,
  menuActive: PropTypes.string,
  setMenuActive: PropTypes.func,
};

export default PopoverContent;
