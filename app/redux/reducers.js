/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from 'utils/history';
import areaReducer from 'containers/Area/areaSlice';
import categoryReducer from 'containers/HomePage/categorySlice';
import diaryReducer from 'containers/ProductObject/diarySlice';
import stepReducer from 'containers/ProductObject/stepSlice';
import sectionReducer from 'containers/ProductObject/sectionSlice';
import productObjectReducer from 'containers/ProductObject/productObjectSlice';
import processReducer from 'containers/Process/processSlice';
import productReducer from 'containers/Product/productSlice';
import employeeReducer from 'containers/Employee/employeeSlice';
import certificationReducer from 'containers/HomePage/certificationSlice';
import certificationAbleReducer from 'containers/CertificationAble/certificationAbleSlice';
import organizationReducer from 'containers/HomePage/organizationSlice';
import authReducer from 'containers/Auth/authSlice';
import farmReducer from 'containers/Farm/farmSlice';
import farmCategoryReducer from 'containers/HomePage/farmCategorySlice';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
const rootReducer = combineReducers({
  farm: farmReducer,
  farmCategory: farmCategoryReducer,
  auth: authReducer,
  area: areaReducer,
  category: categoryReducer,
  diary: diaryReducer,
  process: processReducer,
  product: productReducer,
  productObject: productObjectReducer,
  section: sectionReducer,
  step: stepReducer,
  certification: certificationReducer,
  certificationAble: certificationAbleReducer,
  organization: organizationReducer,
  employee: employeeReducer,

  router: connectRouter(history),
});

export default rootReducer;
