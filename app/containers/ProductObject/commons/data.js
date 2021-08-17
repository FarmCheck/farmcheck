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

const objectTypeList = [
  { key: 'all', value: 'all', name: 'Tất cả các loại' },
  { key: '0', value: 0, name: 'Cây' },
  { key: '1', value: 1, name: 'Luống' },
  { key: '2', value: 2, name: 'Toàn bộ vùng' },
  { key: '3', value: 3, name: 'Trang trại' },
  { key: '4', value: 4, name: 'Nhà kính' },
  { key: '5', value: 5, name: 'Khác' },
];

const baseObjectTypeList = [
  { key: '0', value: '0', name: 'Cây' },
  { key: '1', value: '1', name: 'Luống' },
  { key: '2', value: '2', name: 'Toàn bộ vùng' },
  { key: '3', value: '3', name: 'Trang trại' },
  { key: '4', value: '4', name: 'Nhà kính' },
  { key: '5', value: '5', name: 'Khác' },
];

const statusList = [
  { key: 'all', value: 'all', name: 'Tất cả các trạng thái' },
  { key: '0', value: 0, name: 'Đang sản xuất' },
  { key: '1', value: 1, name: 'Dừng sản xuất' },
  { key: '2', value: 2, name: 'Tạm dừng sản xuất' },
];

export {
  skeletonList,
  orderList,
  objectTypeList,
  baseObjectTypeList,
  statusList,
  pagination,
};
