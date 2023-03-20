import { useContext } from 'react';

import { CartContext } from '../../context/cartContext';

//TODO 測試用
const productIds = [
  201807242228, 201807242230, 201807242232, 201807242234, 201807242211,
  201807242216, 201807242222, 201902191258, 201902191259, 201902191262,
  201902191263, 201902191265, 201902191266, 201807201824, 201807202140,
  201807202150, 201807202157, 201902191210, 201902191242, 201902191245,
  201902191247, 201902191260, 201902191261, 201902191264, 201807242228,
  201807242230, 201807242232, 201807242234, 201807242211, 201807242216,
  201807242222, 201902191258,
];

function AddRandomCart() {
  const { cartItems, setCartItems } = useContext(CartContext);
  console.log(cartItems);

  async function getRandom() {
    const fakeIds = new Array(1)
      .fill('')
      .map(() => productIds[Math.floor(Math.random() * productIds.length)]);
    console.log(fakeIds);

    const item = await fetch(
      `https://side-project2023.online/api/1.0/products/details?id=${fakeIds[0]}`
    );
    const data = await item.json();
    const detail = data.data;

    console.log(detail);
    const randomQty = Math.floor(Math.random() * 6);

    const newCartItems = [
      ...cartItems,
      {
        color: detail.colors[0],
        id: detail.id,
        image: detail.main_image,
        name: detail.title,
        price: detail.price,
        qty: randomQty,
        size: detail.sizes[0],
        stock: detail.variants[0].stock - randomQty,
      },
    ];
    setCartItems(newCartItems);
  }

  return (
    <button
      onClick={() => getRandom()}
      style={{
        height: '100px',
        width: '200px',
        fontSize: '30px',
        cursor: 'pointer',
      }}
    >
      衝動購物
    </button>
  );
}

export default AddRandomCart;
