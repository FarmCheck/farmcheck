const pagination = {
  current: 1,
  next: 2,
  prev: 0,
  take: 10,
  total: 0,
};

const skeletonList = new Array(10).fill('').map((e, idx) => ({
  key: idx,
}));

const orderList = [
  { key: '0', value: 'createdAt', name: 'Sắp theo ngày tạo' },
  { key: '1', value: 'name', name: 'Sắp theo Alphabet' },
];

const statusList = [
  { key: 'all', value: 'all', name: 'Tất cả các trạng thái' },
  { key: '0', value: 0, name: 'Đang sản xuất' },
  { key: '1', value: 1, name: 'Dừng sản xuất' },
  { key: '2', value: 2, name: 'Tạm dừng sản xuất' },
];

const employeeRoleList = [
  { key: '0', value: '0', name: 'Nhân viên' },
  { key: '1', value: '1', name: 'Nông dân' },
  { key: '2', value: '2', name: 'Quản lý' },
];

const skeletonData = [
  {
    title: 'Mã nhân viên',
    type: 'input',
    width: 130,
  },
  {
    title: 'Tên loại sản phẩm',
    type: 'image',
    width: 100,
  },
  {
    title: 'Ngày tạo',
    type: 'input',
    width: 70,
  },
  {
    title: 'Số điện thoại',
    type: 'input',
    width: 70,
  },
  {
    title: 'Chức vụ',
    type: 'input',
    width: 70,
  },
  {
    title: 'Thao tác',
    type: 'input',
    width: 120,
  },
];

export {
  pagination,
  skeletonList,
  skeletonData,
  orderList,
  statusList,
  employeeRoleList,
};
