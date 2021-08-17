const skeletonList = new Array(10).fill('').map((e, idx) => ({
  key: idx,
}));

const pagination = {
  current: 1,
  next: 2,
  prev: 0,
  take: 10,
  total: 0,
};

const orderList = [
  { key: '0', value: 'createdAt', name: 'Sắp theo ngày tạo' },
  { key: '1', value: 'name', name: 'Sắp theo Alphabet' },
  { key: '1', value: 'name', name: 'Sắp theo Số lượng' },
];

const statusList = [
  { key: 'all', value: 'all', name: 'Tất cả các trạng thái' },
  { key: '0', value: 0, name: 'Đang sản xuất' },
  { key: '1', value: 1, name: 'Dừng sản xuất' },
  { key: '2', value: 2, name: 'Tạm dừng sản xuất' },
];

const stepList = [
  { key: 'all', value: 'all', name: 'Tất cả các bước' },
  { key: '1', value: 1, name: '1 bước' },
  { key: '2', value: 2, name: '2 bước' },
  { key: '3', value: 3, name: '3 bước' },
  { key: '4', value: 4, name: '4 bước' },
  { key: '5', value: 5, name: '5 bước' },
  { key: '6', value: 6, name: '6 bước' },
  { key: '7', value: 7, name: '7 bước' },
  { key: '8', value: 8, name: '8 bước' },
  { key: '9', value: 9, name: '9 bước' },
  { key: '10', value: 10, name: '10 bước' },
];

const inputTypes = [
  { key: '0', value: '0', name: 'Dạng chữ' },
  { key: '1', value: '1', name: 'Dạng số' },
  { key: '2', value: '2', name: 'Liên kết' },
];

const skeletonData = [
  {
    title: 'Mã quy trình',
    type: 'input',
    width: 130,
  },
  {
    title: 'Tên quy trình',
    type: 'input',
    width: 100,
  },
  {
    title: 'Ngày tạo',
    type: 'input',
    width: 70,
  },
  {
    title: 'Số bước',
    type: 'input',
    width: 50,
  },
  {
    title: 'Số lượng',
    type: 'input',
    width: 50,
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
  stepList,
  inputTypes,
};
