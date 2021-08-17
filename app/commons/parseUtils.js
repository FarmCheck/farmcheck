export const parseUtils = (obj, key, type) => {
  if (obj[key]) {
    obj[key] = parseType(type, obj[key]);
  }
};

const parseType = (type, value) => {
  switch (type) {
    case 'string':
      return value.toString();

    case 'images':
      return value.map(file => ({
        type: 0,
        url: file.response && file.response.msg[0].url[0],
        urlThumbnail: file.response && file.response.msg[0].url[0],
      }));

    case 'url':
      return value.map(file => file.response && file.response.msg[0].url[0]);

    case 'image':
      return value.response && value.response.msg[0].url[0];

    default:
      return parseInt(value, 0);
  }
};
