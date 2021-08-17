import React, { useState } from 'react';

import { CreateDiaryModal } from 'containers/ProductObject/components';

const useModal = item => {
  const [isVisible, setIsVisible] = useState(false);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  const RenderModal = () => (
    <React.Fragment>
      {isVisible && <CreateDiaryModal item={item} onHide={hide} />}
    </React.Fragment>
  );

  return {
    show,
    hide,
    RenderModal,
  };
};

export default useModal;
