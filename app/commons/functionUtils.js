import moment from 'moment';
import { NormalText } from 'components';
import React from 'react';

export const formatMoney = number => {
  if (!number) return '';
  return (
    number &&
    number
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      .replace(/-/g, '- ')
  );
};

export function removeVietnameseTones(str) {
  let result;
  result = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  result = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  result = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  result = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  result = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  result = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  result = str.replace(/đ/g, 'd');
  result = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  result = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  result = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  result = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  result = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  result = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  result = str.replace(/Đ/g, 'D');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  result = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  result = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  result = str.replace(/ + /g, ' ');
  result = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  // result = str.replace(
  //   /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
  //   ' ',
  // );
  return result;
}

export const detechTime = createdAt => {
  const diffMinute = moment().diff(createdAt, 'm');
  if (diffMinute === 0) {
    return 'mới gần đây';
  }
  if (diffMinute < 60) {
    return `${diffMinute} phút trước`;
  }
  if (diffMinute < 60 * 24) {
    return `${Math.floor(diffMinute / 60) + 1} giờ trước`;
  }
  if (diffMinute < 60 * 24 * 30) {
    return `${Math.floor(diffMinute / (60 * 24)) + 1} ngày trước`;
  }
  if (diffMinute < 60 * 24 * 30 * 12) {
    return `${Math.floor(diffMinute / (60 * 24 * 30)) + 1} tháng trước`;
  }
  return `${Math.floor(diffMinute / (60 * 24 * 30 * 12)) + 1} năm trước`;
};

export const renderObjectType = type => {
  switch (type) {
    case 0:
      return <NormalText>Cây</NormalText>;
    case 1:
      return <NormalText>Luống</NormalText>;
    case 2:
      return <NormalText>Toàn bộ vùng</NormalText>;
    case 3:
      return <NormalText>Trang trại</NormalText>;
    case 4:
      return <NormalText>Nhà kính</NormalText>;
    case 5:
      return <NormalText>Khác</NormalText>;
    default:
      return '';
  }
};

export const isVietnamesePhoneNumber = number =>
   /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test(number) //eslint-disable-line
;

export const formatPhoneNumber = number => {
  switch (number[0]) {
    case '0':
      return number.replace('0', '+84');
    case '8':
      return `+${number}`;
    default:
      return number;
  }
};

export const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line
  return re.test(String(email).toLowerCase());
};

export const getQueryString = ({ search, field, defaultValue, whiteList }) => {
  const value = new URLSearchParams(search).get(field);
  if (whiteList.includes(value)) {
    return value;
  }

  return defaultValue;
};
