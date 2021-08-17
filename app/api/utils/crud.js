export const parserQuery = (query = {}) => {
  const parsedQuery = Object.merge({}, query);

  if (query.filter) {
    parsedQuery.filter = JSON.stringify(query.filter);
  }

  if (query.order) {
    parsedQuery.order = JSON.stringify(query.order);
  }

  if (query.scopes) {
    parsedQuery.scopes = JSON.stringify(query.scopes);
  }

  if (query.fields) {
    parsedQuery.fields = JSON.stringify(query.fields);
  }

  if (query.items) {
    parsedQuery.items = JSON.stringify(query.items);
  }

  if (query.populates) {
    parsedQuery.populates = JSON.stringify(query.populates);
  }

  if (query.limit) {
    parsedQuery.limit = JSON.stringify(query.limit);
  }

  if (query.offset) {
    parsedQuery.offset = JSON.stringify(query.offset);
  }

  return parsedQuery;
};

export const serialize = obj => {
  const keys = Object.keys(obj);
  let query = '?';
  keys.forEach(key => {
    if (obj[key] !== undefined && obj[key] !== '') {
      query +=
        typeof obj[key] === 'string'
          ? `${key}=${obj[key]}&`
          : `${key}=${JSON.stringify(obj[key])}&`;
    }
  });
  return query;
};
