const productObject = {
  page: 1,
  take: 10,
  search: '',
  relations: ['area', 'medias'],
  select: ['id', 'name', 'code', 'createdAt', 'objectType', 'processID'],
  order: { name: 'createdAt', value: -1 },
};

const productObjectBase = {
  relations: ['medias', 'product'],
};

const category = {
  select: ['name', 'id', 'createdAt'],
  order: { createdAt: -1 },
  relations: ['subCategories'],
};

const step = {
  select: ['name', 'id', 'order'],
  order: { order: 1 },
};

const product = {
  select: ['name', 'id'],
  order: { createdAt: -1 },
};

const area = {
  select: ['name', 'id'],
  order: { createdAt: -1 },
};

const process = {
  select: ['name', 'id'],
  order: { createdAt: -1 },
};

const section = {
  page: 1,
  take: 10,
  search: '',
  relations: ['area', 'process', 'productObject'],
  order: { name: 'createdAt', value: -1 },
};

export {
  productObject,
  productObjectBase,
  category,
  step,
  area,
  product,
  process,
  section,
};
