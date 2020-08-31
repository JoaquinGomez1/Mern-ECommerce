import { useContext } from "react";
import { myShoppingCartContext } from "../context/ShoppingCartContext";

export default function useShoppingCart(id) {
  const { shoppingCartItems, setShoppingCartItems } = useContext(
    myShoppingCartContext
  );
  const thisItem = shoppingCartItems.find((item) => {
    if (item.id === id) return item;
  });

  // Add one element
  const addItem = () => {
    const itemIndex = shoppingCartItems.indexOf(thisItem);
    let shoppingCartCopy = [...shoppingCartItems];

    shoppingCartCopy[itemIndex] = {
      ...shoppingCartCopy[itemIndex],
      qty: shoppingCartCopy[itemIndex].qty + 1,
    };

    setShoppingCartItems(shoppingCartCopy);
  };

  // Remove one element from any given item
  const removeOneItem = () => {
    const itemIndex = shoppingCartItems.indexOf(thisItem);
    let shoppingCartCopy = [...shoppingCartItems];

    if (thisItem.qty - 1 < 1) {
      removeItem();
    } else {
      shoppingCartCopy[itemIndex] = {
        ...shoppingCartCopy[itemIndex],
        qty: shoppingCartCopy[itemIndex].qty - 1,
      };
      setShoppingCartItems(shoppingCartCopy);
    }
  };

  const removeItem = () => {
    const filteredCart = shoppingCartItems.filter((each) => each.id !== id);
    setShoppingCartItems(filteredCart);
  };

  const addToFav = () => {
    let userId = JSON.parse(localStorage.getItem("user"));
    if (!userId) return "Login first";

    userId = userId._id;

    const body = { userId, item: thisItem };
    fetch("http://192.168.0.8:3100/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  return { addItem, removeOneItem, removeItem, addToFav };
}
