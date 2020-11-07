import { useContext } from "react";
import { myShoppingCartContext } from "../context/ShoppingCartContext";
import { myUserContext } from "../context/UserContext";

export default function useShoppingCart(id, itemObject) {
  const { shoppingCartItems, setShoppingCartItems } = useContext(
    myShoppingCartContext
  );
  const { currentUser, setCurrentUser } = useContext(myUserContext);

  // Utility function reused by each function in this file
  const findThisItem = () => {
    return shoppingCartItems.find((item) => {
      if (item._id === id) return item;
      else return null;
    });
  };

  // This function will add 1 to the qty of an existing item
  // or it will create a new item object in the shopping Cart array
  const addToShoppingCart = () => {
    const itemExists = findThisItem();
    if (itemExists) {
      addItem();
    } else {
      // If the item does not exists then just add it to the shopping cart
      setShoppingCartItems([
        ...shoppingCartItems,
        {
          _id: itemObject._id,
          name: itemObject.name,
          qty: 1,
          price: itemObject.price,
          image: itemObject.image,
        },
      ]);
    }
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

    if (!currentUser) return "Login first";

    const body = { item: thisItem };
    const newArray = [...currentUser.favoriteProducts, thisItem];
    setCurrentUser({
      ...currentUser,
      favoriteProducts: newArray,
    });
    fetch("/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  const isInFavorites = () => {
    if (!currentUser) return false;
    // Initialize favorite products as an emptyArray
    if (!currentUser.favoriteProducts)
      setCurrentUser({ ...currentUser, favoriteProducts: [] });

    const isInFavs = currentUser.favoriteProducts.find((item) => {
      if (item._id === id) return item;
      else return null;
    });

    return isInFavs;
  };

  return {
    addItem,
    addToShoppingCart,
    removeOneItem,
    removeItem,
    addToFav,
    isInFavorites,
    findThisItem,
  };
}
