import React, { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import {
  Space as Spacing,
  PageTitle,
  NameText,
  InputText,
  CSelect,
  CFormItem,
  TextEditor,
  CUploadList,
} from 'components';

import { find as findCategory } from 'containers/HomePage/categorySlice';

import { category as categoryQuery } from '../commons/query';

export function InformationStep({ form, onSetBodyUpdate, initSubCategoryID }) {
  const dispatch = useDispatch();

  const categoryList = useSelector(state => state.category.list);
  const subCategoryListHash = useSelector(
    state => state.category.subCategoriesHash,
  );

  const [subCategoryList, setSubCategoryList] = useState([]);
  const [countImg, setCountImg] = useState(
    (form.getFieldValue('medias') && form.getFieldValue('medias').length) || 0,
  );

  const handleChooseCategory = categoryID => {
    const len = subCategoryListHash[categoryID].length || 0;

    const subCategories = len > 0 ? subCategoryListHash[categoryID] : [];
    const subCategoryID = len > 0 ? subCategories[0].id : undefined;

    form.setFieldsValue({ categoryID });
    form.setFieldsValue({ subCategoryID });

    setSubCategoryList(subCategories);
  };

  const handleChangeTextEditor = value => {
    form.setFieldsValue({ description: value });
    onSetBodyUpdate({ description: value });
  };

  const handleChangeImg = e => {
    if (Array.isArray(e)) {
      return e;
    }

    const { fileList } = e;
    if (Array.isArray(fileList)) {
      setCountImg(fileList.length);
    }

    return e && e.fileList;
  };

  const initData = () => {
    if (categoryList.length === 0) {
      dispatch(findCategory(categoryQuery));
    } else {
      categoryList.forEach(category => {
        if (category.subCategories.length > 0) {
          category.subCategories.forEach(subCategory => {
            if (subCategory.id === initSubCategoryID) {
              const newSubCategories = category.subCategories.map(element => ({
                ...element,
                key: element.id,
                value: element.id,
              }));

              form.setFieldsValue({ categoryID: category.id });

              setSubCategoryList(newSubCategories);
            }
          });
        }
      });
    }
  };

  useEffect(() => {
    initData();
  }, [categoryList, initSubCategoryID]);

  return (
    <>
      <PageTitle
        subTitle="Thông tin loại sản phẩm"
        description=" Vốn FDI đổ vào bất động sản quý I tăng mạnh nhờ DN nước ngoài tin
              tưởng về khả năng khống chế dịch của Việt Nam."
      />
      <Form
        onValuesChange={onSetBodyUpdate}
        form={form}
        style={{ marginTop: '20px' }}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 11 }}
        layout="horizontal"
        labelAlign="left"
      >
        <CFormItem
          name="name"
          label={<NameText>Tên sản phẩm</NameText>}
          rules={[
            {
              required: true,
              message: 'Bạn chưa nhập tên loại sản phẩm!',
            },
          ]}
        >
          <InputText size="large" />
        </CFormItem>
        <CFormItem
          name="categoryID"
          label={<NameText>Loại sản phẩm chính</NameText>}
        >
          <CSelect
            onChange={handleChooseCategory}
            list={categoryList}
            placeHolder="Chọn loại sản phẩm chính"
          />
        </CFormItem>
        <CFormItem
          name="subCategoryID"
          label={<NameText>Loại sản phẩm phụ</NameText>}
        >
          <CSelect
            list={subCategoryList}
            placeHolder="Chọn loại sản phẩm phụ"
          />
        </CFormItem>
        <CFormItem
          name="description"
          label={<NameText>Mô tả sản phẩm</NameText>}
        >
          <TextEditor
            value={form.getFieldValue('description') || ''}
            onChange={handleChangeTextEditor}
          />
        </CFormItem>
        <Spacing height={82} />
        <CFormItem name="medias" label={<NameText>Hình ảnh sản phẩm</NameText>}>
          <CUploadList
            valuePropName="fileList"
            name="medias"
            getValueFromEvent={handleChangeImg}
            count={countImg}
          />
        </CFormItem>
      </Form>
    </>
  );
}

InformationStep.propTypes = {
  form: PropTypes.any,
  onSetBodyUpdate: PropTypes.func,
  initSubCategoryID: PropTypes.string,
};

export default InformationStep;