const employee = {
  page: 1,
  take: 10,
  search: '',
  select: [
    'code',
    'name',
    'createdAt',
    'avatar',
    'id',
    'phoneNumber',
    'status',
    'role',
  ],
  order: { name: 'createdAt', value: -1 },
};

const area = {
  select: ['name', 'id'],
};

export { employee, area };
