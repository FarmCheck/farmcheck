import location from 'public/static/location.json';

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
  { key: '0', value: 'all', name: 'Tất cả các trạng thái' },
  { key: '1', value: 0, name: 'Đang sản xuất' },
  { key: '2', value: 1, name: 'Dừng sản xuất' },
  { key: '3', value: 2, name: 'Tạm dừng sản xuất' },
];

const locationList = location.map(e => ({
  ...e,
  key: e.province_name,
  value: e.province_code,
  name: e.province_name,
}));

locationList.unshift({
  key: 'all',
  value: 'all',
  name: 'Tất cả các địa phương',
});

const areaTypeList = [
  { key: '0', value: '0', name: 'Vùng sản xuất' },
  { key: '1', value: '1', name: 'Vùng nuôi trồng' },
  { key: '2', value: '2', name: 'Vùng chế biến' },
  { key: '3', value: '3', name: 'Vùng sản xuất và nuôi trồng' },
  { key: '4', value: '4', name: 'Vùng sản xuất và chế biến' },
  { key: '5', value: '5', name: 'Loại khác' },
];

const skeletonData = [
  {
    title: 'Mã SKU',
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
  locationList,
  areaTypeList,
};
