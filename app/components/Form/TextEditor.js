import PropTypes from 'prop-types';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

const CReactQuill = styled(ReactQuill)`
  .ql-snow {
    border-radius: 6px !important;
  }
`;

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    // ['link', 'code'],
    // ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  // 'link',
  // 'code',
];

const Index = ({ readOnly = false, value, onChange, placeholder }) => (
  <>
    <CReactQuill
      theme="snow"
      value={value || ''}
      modules={modules}
      formats={formats}
      onChange={onChange}
      style={{ height: 180, marginBottom: 40 }}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  </>
);

Index.propTypes = {
  readOnly: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default Index;
