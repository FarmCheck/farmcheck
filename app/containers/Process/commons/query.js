const process = {
  page: 1,
  take: 10,
  search: '',
  select: [
    'code',
    'name',
    'id',
    'quantity',
    'createdAt',
    'productObjectsTotal',
  ],
  order: { name: 'createdAt', value: -1 },
};

const processBase = {
  relations: ['steps', 'steps.stepProperties'],
};

export { process, processBase };
