function getValue(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

const headers = [
    {
        key: 'name',
        text: 'Thông tin sản phẩm'
    },
    {
        key: 'categoryName',
        text: 'Danh mục'
    },
    {
        key: 'price',
        text: 'Giá bán'
    },
    {
        key: 'remaining',
        text: 'Tồn kho'
    }
]

export {headers}