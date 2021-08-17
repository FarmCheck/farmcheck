const parseBodySubmit = (body, type = 'update') => {
  const bodyResult = {};

  Object.keys(body).forEach(key => {
    if (body[key] !== undefined) {
      const field = key.slice(0, key.indexOf('_'));
      bodyResult[field] = body[key];
    }
  });

  if (type === 'create') {
    if (bodyResult.stepProperties) {
      const propertiesResult = [];

      bodyResult.stepProperties.forEach(item => {
        if (item.name && item.value) {
          propertiesResult.push({
            ...item,
            type: Number(item.type),
          });
        }
      });

      bodyResult.stepProperties = propertiesResult;
    } else {
      bodyResult.stepProperties = [];
    }
  }

  return bodyResult;
};

const parseDataInit = data => {
  const dataResult = {};
  Object.keys(data).forEach(key => {
    const newKey = `${key}_${data.id}`;
    dataResult[newKey] = data[key];
  });

  if (data.stepProperties.length > 0) {
    const newProperties = [];
    data.stepProperties.forEach(item => {
      newProperties.push({
        ...item,
        type: item.type.toString(),
      });
    });

    dataResult[`stepProperties_${data.id}`] = newProperties;
  }

  return dataResult;
};

const checkIsFullFill = propsStep => {
  if (
    propsStep.name &&
    propsStep.name !== '' &&
    propsStep.value &&
    propsStep.value !== ''
  ) {
    return true;
  }
  return false;
};

export { parseBodySubmit, parseDataInit, checkIsFullFill };
