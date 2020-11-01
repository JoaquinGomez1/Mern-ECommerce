import { useContext } from "react";
import { myShoppingCartContext } from "../context/ShoppingCartContext";

export default function useShoppingCart(id) {
  const { shoppingCartItems, setShoppingCartItems } = useContext(
    myShoppingCartContext
  );

  // Utility function reused by each function in this file
  const findThisItem = () => {
    return shoppingCartItems.find((item) => {
      if (item._id === id) return item;
    });
  };

  // Add one element
  const addItem = () => {
    const thisItem = findThisItem();
    const itemIndex = shoppingCartItems.indexOf(thisItem);
    let shoppingCartCopy = [...shoppingCartItems];
    const selectedItem = shoppingCartCopy[itemIndex];

    shoppingCartCopy[itemIndex] = {
      ...shoppingCartCopy[itemIndex],
      qty: selectedItem.qty + 1,
    };

    setShoppingCartItems(shoppingCartCopy);
  };

  // Remove one element from any given item
  const removeOneItem = () => {
    const thisItem = findThisItem();
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
    const filteredCart = shoppingCartItems.filter((each) => each._id !== id);
    setShoppingCartItems(filteredCart);
  };

  const addToFav = async () => {
    const thisItem = findThisItem();
    let userId = await JSON.parse(localStorage.getItem("user"));
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

  return { addItem, removeOneItem, removeItem, addToFav, findThisItem };
}
