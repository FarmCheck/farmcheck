import styled from 'styled-components';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const Wrapper = styled(Button)`
  border-radius: 6px !important;
  height: ${props => (props.height ? `${props.height}px` : `50px`)} !important;

  font-size: 16px !important;
  font-weight: 600 !important;
`;

export function CButton({ src, rules = [], loading, ...props }) {
  const [disabled, setDisabled] = useState(true);

  const handleValidate = () => {
    if (!src || rules.length === 0) {
      return false;
    }
    let isDisable = false;
    rules.forEach(e => { //eslint-disable-line
      if (e.field === 'any' && Object.keys(src).length !== 0) {
        return false;
      }

      e.conditions.forEach(condition => {
        switch (condition.name) {
          case 'minLength':
            if (!src[e.field] || src[e.field].length < condition.value) {
              isDisable = true;
            }
            break;

          case 'any':
            if (!src[e.field] || src[e.field].length < condition.value) {
              isDisable = true;
            }
            break;

          default:
            if (!src[e.field]) {
              isDisable = true;
            }
            break;
        }
      });
    });

    return isDisable;
  };

  useEffect(() => {
    const isDisable = handleValidate();
    setDisabled(isDisable);
  }, [src]);

  return <Wrapper disabled={disabled} loading={loading} {...props} />;
}

CButton.propTypes = {
  src: PropTypes.object,
  rules: PropTypes.array,
  loading: PropTypes.bool,
};

export default CButton;
