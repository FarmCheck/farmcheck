const product = {
  page: 1,
  take: 10,
  search: '',
  relations: ['medias'],
  select: ['code', 'name', 'createdAt', 'id', 'status', 'productObjectsTotal'],
  order: { name: 'createdAt', value: -1 },
};

const category = {
  page: 1,
  take: 20,
  select: ['name', 'id', 'createdAt'],
  order: { createdAt: -1 },
  relations: ['subCategories'],
};

const certification = {
  page: 1,
  take: 20,
  select: ['name', 'logo', 'id'],
  order: { createdAt: -1 },
};

const organization = {
  page: 1,
  take: 20,
};

const productBase = {
  relations: [
    'medias',
    'certificationAbles',
    'certificationAbles.organization',
    'certificationAbles.certification',
  ],
};

export { category, product, certification, organization, productBase };
