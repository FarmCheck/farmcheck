const area = {
  page: 1,
  take: 10,
  search: '',
  relations: ['medias'],
  select: ['code', 'name', 'createdAt', 'id', 'productObjectsTotal'],
  order: { name: 'createdAt', value: -1 },
};

const areaBase = {
  relations: ['medias'],
};

const employee = {
  page: 1,
  take: 20,
  select: ['name', 'id', 'createdAt'],
  order: { createdAt: -1 },
};

export { area, employee, areaBase };
