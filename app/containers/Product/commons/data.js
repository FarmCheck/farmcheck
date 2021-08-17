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

const skeletonData = [
  {
    title: 'Mã loại',
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
    title: 'Trạng thái',
    type: 'input',
    width: 100,
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

const orderList = [
  { key: '0', value: 'createdAt', name: 'Sắp theo ngày tạo' },
  { key: '1', value: 'name', name: 'Sắp theo Alphabet' },
  { key: '2', value: 'productObjectsTotal', name: 'Sắp theo số lượng' },
];

const statusList = [
  { key: '0', value: 'all', name: 'Tất cả các trạng thái' },
  { key: '1', value: 0, name: 'Đang sản xuất' },
  { key: '2', value: 1, name: 'Dừng sản xuất' },
  { key: '3', value: 2, name: 'Tạm dừng sản xuất' },
];

const unitList = [
  { key: '0', value: '0', name: 'Sản phẩm' },
  { key: '1', value: '1', name: 'Kilogram' },
  { key: '2', value: '2', name: 'Đơn vị khác' },
];

const unitTimeList = [
  { key: '0', value: '0', name: 'Ngày' },
  { key: '1', value: '1', name: 'Tuần' },
  { key: '2', value: '2', name: 'Tháng' },
  { key: '3', value: '3', name: 'Năm' },
];

export {
  pagination,
  skeletonList,
  skeletonData,
  orderList,
  statusList,
  unitList,
  unitTimeList,
};
