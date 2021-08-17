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

const product = {
  targetType: 'product',
};

export { certification, organization, product };
