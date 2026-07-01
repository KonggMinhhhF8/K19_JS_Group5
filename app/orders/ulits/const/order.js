function getValue(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

const headers = [
    {
        key: 'id',
        text: 'Mã đơn'
    },
    {
        key: 'name',
        text: 'Khách hàng'
    },
    {
        key: 'date',
        text: 'Ngày đặt '
    },
    {
        key: 'productName',
        text: 'Sản phẩm'
    },
    {
        key: 'price',
        text: 'Đơn giá'
    },
    {
        key: 'amount',
        text: 'Số lượng'
    },
    {
        key: 'total',
        text: 'Tổng tiền'
    },
    {
        key: 'status',
        text: 'Trạng thái'
    }
]

export {headers}