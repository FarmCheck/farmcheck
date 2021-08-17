const farm = {
  page: 1,
  take: 10,
  relations: ['medias'],
  select: [
    'code',
    'name',
    'createdAt',
    'id',
    'status',
    'productsTotal',
    'email',
  ],
  order: { createdAt: -1 },
};

const category = {
  page: 1,
  take: 20,
  select: ['name', 'id', 'createdAt', 'urlThumbnail'],
  order: { createdAt: -1 },
  relations: ['subCategories'],
};

const certification = {
  page: 1,
  take: 20,
  select: ['name', 'logo', 'id'],
  order: { createdAt: -1 },
};

const farmBase = {
  relations: [
    'certificationAbles',
    'certificationAbles.organization',
    'certificationAbles.certification',
    'medias',
    'location',
  ],
};

const organization = {
  page: 1,
  take: 20,
};

export { farm, farmBase, category, certification, organization };
