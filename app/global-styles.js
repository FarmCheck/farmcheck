import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
    font-weight: 500;
  }

  svg { vertical-align: baseline; }

  body {
    font-family: 'Quicksand', sans-serif !important;
  }

  body.fontLoaded {
    font-family: 'Quicksand', sans-serif !important;
  }

  #app {
    background-color: #FFFFFF;
    min-height: 100%;
    min-width: 100%;
  }

  .ant-table {
    .ant-table-thead {
      .ant-table-cell {
        background: #FFF;
        color: #262626;
        font-weight: 600;

        &:before {
          display: none;
        }
      }
    }
  }

  /* Let's get this party started */
::-webkit-scrollbar {
    width: 6px;
}
 
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #FAFAFA; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: #CCCCCC; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #8C8C8C; 
}

  .ant-tabs {
    .ant-tabs-tab {
      margin: 0px;
      padding: 12px 36px;
    }
    .ant-tabs-tab-btn {
      font-weight: 500;
      color: #595959;
    }

    .ant-tabs-tab.ant-tabs-tab-active {
      .ant-tabs-tab-btn {
        font-weight: 700;
      }
    }
  }

  .ant-modal-mask {
    background-color: rgba(0, 0, 0, 0.25) !important;
  }

  .ant-select-item.ant-select-item-option{
    padding: 12px;
    color: ${props => props.theme.textColorSecondary};
    font-weight: 500;
  }

  .ant-select-item.ant-select-item-option.ant-select-item-option-active {
    color: ${props => props.theme.primaryColor};
  }

`;

export default GlobalStyle;
