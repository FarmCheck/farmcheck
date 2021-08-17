/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import {
  LeftCircleFilled,
  CodepenSquareFilled,
  AppstoreFilled,
  ShopFilled,
  SnippetsFilled,
  UnorderedListOutlined,
  ApartmentOutlined,
  QuestionCircleFilled,
  SettingFilled,
} from '@ant-design/icons';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GlobalStyle from 'global-styles';
import styled from 'styled-components';

import {
  PlantIcon,
  LandIcon,
  BoxIcon,
  AreaIcon,
  ShopIcon,
  CloudIcon,
  CustomerIcon,
} from 'public/icons';

import {
  Space as Spacing,
  NameText,
  HeaderMainNavbar,
  Row,
  Text,
  TitleText,
  LogoText,
} from 'components';
import logo from 'images/logo.png';
import { logoutForUser } from 'containers/Auth/authSlice';

import ProcessListPage from 'containers/Process/ListPage/Loadable';
import ProcessCreatePage from 'containers/Process/CreatePage/Loadable';
import ProcessDetailPage from 'containers/Process/DetailPage/Loadable';

import AreaListPage from 'containers/Area/ListPage/Loadable';
import AreaCreatePage from 'containers/Area/CreatePage/Loadable';
import AreaDetailPage from 'containers/Area/DetailPage/Loadable';

import EmployeeListPage from 'containers/Employee/ListPage/Loadable';
import EmployeeCreatePage from 'containers/Employee/CreatePage/Loadable';
import EmployeeDetailPage from 'containers/Employee/DetailPage/Loadable';

import ProductListPage from 'containers/Product/ListPage/Loadable';
import ProductDetailPage from 'containers/Product/DetailPage/Loadable';
import ProductCreatePage from 'containers/Product/CreatePage/Loadable';

import StoreLinkListPage from 'containers/StoreLink/ListPage/Loadable';
import LinkRequestListPage from 'containers/StoreLink/RequestListPage/Loadable';

import ProductObjectListPage from 'containers/ProductObject/ListPage/Loadable';
import ProductObjectCreatePage from 'containers/ProductObject/CreatePage/Loadable';
import ProductObjectDetailPage from 'containers/ProductObject/DetailPage/Loadable';

import SectionCreatePage from 'containers/ProductObject/Section/CreatePage/Loadable';
import SectionListPage from 'containers/ProductObject/Section/ListPage/Loadable';

import NoticeSaleListPage from 'containers/NoticeSaleListPage/Loadable';
import FarmDetailPage from 'containers/Farm/DetailPage/Loadable';

import AccountModal from 'containers/Account/AccountModal';

import { WithType as WithProductObjectType } from 'containers/ProductObject/components';

const { Content } = Layout;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #ffffff;

  display: flex;
`;

const WrapperText = styled.div`
  display: flex;
  align-items: center;
  height: 98px;
`;

const LogoBar = styled.div`
  display: flex;
  margin-left: 24px;

  align-items: center;
  height: 50%;
  width: 100%;
`;

const Logo = styled.img`
  width: 52px;
  height: 52px;
`;

const WrapperMenu = styled.div`
  width: 320px;
  height: 100vh;
  flex-shrink: 0;
  background: rgba(57, 181, 74, 0);
  position: sticky;
  top: 0;
  left: 0;

  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  .ant-layout-sider-trigger {
    background: #39b54a;
  }
`;

const ContentMenu = styled.div`
  width: 100%;
  height: calc(100% - 98px);
  padding: 0px 18px;
  overflow: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #fafafa;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background: #ccc;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #8c8c8c;
  }
`;

const MenuTitle = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  padding-left: 18px;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  height: 60px;
  padding-left: 18px;
  color: ${props => (props.active ? props.theme.primaryColor : null)};
  background: ${props => (props.active ? props.theme.navbarColor : null)};
  border-radius: 6px;
  transition: color 0.5s;
  cursor: pointer;
  .textMenu {
    transition: color 0.5s font-weight 0.5s;
    color: ${props => (props.active ? props.theme.primaryColor : '#595959')};
    font-weight: ${props =>
      props.active ? '700 !important' : '500px !important'};
    overflow: hidden;
    white-space: nowrap;
  }

  .icon {
    transition: color 0.5s;
    color: ${props => (props.active ? props.theme.primaryColor : '#595959')};
  }

  &:hover {
    background: ${props => props.theme.navbarColor};
  }
`;

const CMenu = styled(Menu)`
  border-right: none;
`;

const WrapperBack = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
  .text {
    color: #595959;
  }
  &:hover {
    background: #fafafa;
  }
`;

const CContent = styled(Content)`
  margin: 24px;
  border-radius: 6px !important;
`;

const ProductObjectListPageWithType = WithProductObjectType(
  ProductObjectListPage,
);
const ProductObjectCreatePageWithType = WithProductObjectType(
  ProductObjectCreatePage,
);
const ProductObjectDetailPageWithType = WithProductObjectType(
  ProductObjectDetailPage,
);
const SectionCreatePageWithType = WithProductObjectType(SectionCreatePage);
const SectionListPageWithType = WithProductObjectType(SectionListPage);

export default function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const entity = useSelector(state => state.farm.item);
  const user = useSelector(state => state.auth.user.item);
  const farmID = useSelector(state => state.farm.item.id);

  const dataMenu = [
    {
      title: 'Nông trại',
      name: 'Loại sản phẩm',
      link: '/product/list',
      layer: 1,
      icon: (
        <CodepenSquareFilled className="icon" style={{ fontSize: '22px' }} />
      ),
      subMenu: [],
    },
    {
      title: 'Nông trại',
      name: 'Vùng sản xuất',
      link: '/area/list',
      layer: 1,
      icon: <LandIcon className="icon" width={22} height={22} />,
      subMenu: [
        {
          title: 'Vùng sản xuất',
          name: 'Danh sách vùng',
          link: '/area/list',
          layer: 2,
          icon: <LandIcon className="icon" width={22} height={22} />,
          subMenu: [],
        },
        {
          title: 'Vùng sản xuất',
          name: 'Đối tượng vùng',
          link: '/field-plant/list',
          layer: 2,
          icon: <AreaIcon className="icon" width={22} height={22} />,
          subMenu: [],
        },
        {
          title: 'Vùng sản xuất',
          name: 'Đối tượng nuôi trồng',
          link: '/farming-plant/list',
          layer: 2,
          icon: <PlantIcon className="icon" width={22} height={22} />,
          subMenu: [],
        },
        {
          title: 'Vùng sản xuất',
          name: 'Đối tượng sản xuất',
          link: '/production-plant/list',
          layer: 2,
          icon: <BoxIcon className="icon" width={22} height={22} />,
          subMenu: [],
        },
      ],
    },
    {
      title: 'Nông trại',
      name: 'Quy trình',
      link: '/process/list',
      layer: 1,
      icon: <CloudIcon className="icon" width={22} height={22} />,
      subMenu: [],
    },
    {
      title: 'Nông trại',
      name: 'Nhân viên',
      link: '/employee/list',
      layer: 1,
      icon: <CustomerIcon className="icon" width={22} height={22} />,
      subMenu: [],
    },
    {
      title: 'Nông trại',
      name: 'Thiết kế gian hàng',
      link: `/farm/${farmID}/detail`,
      layer: 1,
      icon: <ShopIcon className="icon" width={22} height={22} />,
      subMenu: [],
    },
    {
      title: 'Bán hàng',
      name: 'Liên kết cửa hàng',
      link: '/store-link/list',
      layer: 1,
      icon: <ShopFilled className="icon" style={{ fontSize: '22px' }} />,
      subMenu: [
        {
          title: 'Liên kết cửa hàng',
          name: 'Danh sách',
          link: '/store-link/list',
          layer: 2,
          icon: (
            <UnorderedListOutlined
              className="icon"
              style={{ fontSize: '22px' }}
            />
          ),
          subMenu: [],
        },
        {
          title: 'Liên kết cửa hàng',
          name: 'Yêu cầu liên kết',
          link: '/store-link/request',
          layer: 2,
          icon: (
            <ApartmentOutlined className="icon" style={{ fontSize: '22px' }} />
          ),
          subMenu: [],
        },
      ],
    },
    {
      title: 'Doanh thu',
      name: 'Tổng quan',
      link: '/',
      layer: 1,
      icon: <SnippetsFilled className="icon" style={{ fontSize: '22px' }} />,
      subMenu: [],
    },
    {
      title: 'Doanh thu',
      name: 'Báo giá sản phẩm',
      link: '/overview',
      layer: 1,
      icon: <AppstoreFilled className="icon" style={{ fontSize: '22px' }} />,
      subMenu: [],
    },
    {
      title: 'Chức năng khác',
      name: 'Thiết lập',
      link: '/setting',
      layer: 1,
      icon: <SettingFilled className="icon" style={{ fontSize: '22px' }} />,
      subMenu: [],
    },
    {
      title: 'Chức năng khác',
      name: 'Hỗ trợ',
      link: '/help',
      layer: 1,
      icon: (
        <QuestionCircleFilled className="icon" style={{ fontSize: '22px' }} />
      ),
      subMenu: [],
    },
  ];

  const [menuActive, setMenuActive] = useState('');
  const [currentDataMenu, setCurrentDataMenu] = useState(dataMenu);

  const handleLogoutUser = async () => {
    await dispatch(logoutForUser());
  };

  const handleSetMenuActive = item => {
    history.push(item.link);
    if (item.subMenu.length === 0) {
      setMenuActive(item.link);
      return;
    }

    setMenuActive(item.link);
    setCurrentDataMenu(item.subMenu);
  };

  const handleBackMenu = () => {
    history.push('/');
  };

  const renderMenu = () => {
    const result = [];
    if (currentDataMenu[0].layer !== 1) {
      result.push(
        <WrapperBack onClick={handleBackMenu}>
          <LeftCircleFilled
            style={{
              position: 'absolute',
              left: 20,
              fontSize: '24px',
              color: '#595959',
            }}
          />
          <NameText className="text">Quay lại danh mục</NameText>
        </WrapperBack>,
      );
    }

    let currentTitle = '';
    for (let i = 0; i < currentDataMenu.length; i += 1) {
      if (currentTitle !== currentDataMenu[i].title) {
        currentTitle = currentDataMenu[i].title;
        result.push(
          <>
            {i !== 0 && <Spacing height={12} />}
            <MenuTitle key={currentTitle}>
              <TitleText>{currentTitle}</TitleText>
            </MenuTitle>
          </>,
        );
      }
      result.push(
        <MenuItem
          key={currentDataMenu[i].name}
          onClick={() => handleSetMenuActive(currentDataMenu[i])}
          active={menuActive === currentDataMenu[i].link}
        >
          {currentDataMenu[i].icon}
          <NameText
            weight="500"
            className="textMenu"
            style={{ marginLeft: 10 }}
          >
            {currentDataMenu[i].name}
          </NameText>
        </MenuItem>,
      );
    }

    return result;
  };

  const initMenuData = () => {
    const currentPath = location.pathname;
    setMenuActive(currentPath);

    for (let i = 0; i < dataMenu.length; i += 1) {
      if (dataMenu[i].link === currentPath) {
        if (dataMenu[i].subMenu.length === 0) {
          setCurrentDataMenu(dataMenu);
          return;
        }
        setCurrentDataMenu(dataMenu[i].subMenu);
        return;
      }

      if (dataMenu[i].subMenu.length !== 0) {
        dataMenu[i].subMenu.forEach(item => {
          if (item.link === currentPath) {
            setCurrentDataMenu(dataMenu[i].subMenu);
          }
        });
      }
    }
  };

  useEffect(() => {
    initMenuData();
  }, [entity, user, location]);

  return (
    <Wrapper>
      <WrapperMenu>
        <WrapperText>
          <LogoBar>
            <Logo src={logo} />
            <Spacing width={12} />
            <Row direction="column">
              <LogoText fontSize="16px">FarmCheck</LogoText>
              <Text color="#595959" weight="600" size="14px">
                Nông trại
              </Text>
            </Row>
          </LogoBar>
        </WrapperText>
        <ContentMenu>
          <CMenu>{renderMenu()}</CMenu>
        </ContentMenu>
      </WrapperMenu>
      <Layout>
        <HeaderMainNavbar
          user={user}
          onLogoutUser={handleLogoutUser}
          AccountModal={AccountModal}
        />
        <CContent>
          <Switch>
            <Route path="/farm/:id/detail" component={FarmDetailPage} />

            <Route path="/process/list" component={ProcessListPage} />
            <Route path="/process/create" component={ProcessCreatePage} />
            <Route path="/process/:id/detail" component={ProcessDetailPage} />

            <Route path="/area/list" component={AreaListPage} />
            <Route path="/area/create" component={AreaCreatePage} />
            <Route path="/area/:id/detail" component={AreaDetailPage} />

            <Route
              path="/field-plant/list"
              render={props => (
                <ProductObjectListPageWithType {...props} type={0} />
              )}
            />
            <Route
              path="/field-plant/:id/detail"
              render={props => (
                <ProductObjectDetailPageWithType {...props} type={0} />
              )}
            />
            <Route
              path="/field-plant/create"
              render={props => (
                <ProductObjectCreatePageWithType {...props} type={0} />
              )}
            />
            <Route
              path="/field-plant/:id/section/list"
              render={props => <SectionListPageWithType {...props} type={0} />}
            />
            <Route
              path="/field-plant/:id/section/create"
              render={props => (
                <SectionCreatePageWithType {...props} type={0} />
              )}
            />

            <Route
              path="/farming-plant/list"
              render={props => (
                <ProductObjectListPageWithType {...props} type={1} />
              )}
            />
            <Route
              path="/farming-plant/:id/detail"
              render={props => (
                <ProductObjectDetailPageWithType {...props} type={1} />
              )}
            />
            <Route
              path="/farming-plant/create"
              render={props => (
                <ProductObjectCreatePageWithType {...props} type={1} />
              )}
            />
            <Route
              path="/farming-plant/:id/section/list"
              render={props => <SectionListPageWithType {...props} type={1} />}
            />
            <Route
              path="/farming-plant/:id/section/create"
              render={props => (
                <SectionCreatePageWithType {...props} type={1} />
              )}
            />

            <Route
              path="/production-plant/list"
              render={props => (
                <ProductObjectListPageWithType {...props} type={2} />
              )}
            />
            <Route
              path="/production-plant/:id/detail"
              render={props => (
                <ProductObjectDetailPageWithType {...props} type={2} />
              )}
            />
            <Route
              path="/production-plant/create"
              render={props => (
                <ProductObjectCreatePageWithType {...props} type={2} />
              )}
            />
            <Route
              path="/production-plant/:id/section/list"
              render={props => <SectionListPageWithType {...props} type={2} />}
            />
            <Route
              path="/production-plant/:id/section/create"
              render={props => (
                <SectionCreatePageWithType {...props} type={2} />
              )}
            />

            <Route path="/employee/list" component={EmployeeListPage} />
            <Route path="/employee/create" component={EmployeeCreatePage} />
            <Route path="/employee/:id/detail" component={EmployeeDetailPage} />

            <Route path="/product/list" component={ProductListPage} />
            <Route path="/product/create" component={ProductCreatePage} />
            <Route path="/product/:id/detail" component={ProductDetailPage} />

            <Route path="/store-link/list" component={StoreLinkListPage} />
            <Route path="/store-link/request" component={LinkRequestListPage} />
            <Route exact path="/" component={NoticeSaleListPage} />
          </Switch>
        </CContent>
      </Layout>
      <GlobalStyle />
    </Wrapper>
  );
}
