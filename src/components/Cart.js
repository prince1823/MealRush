import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import emptyCart from "../assets/emptyCart.webp";
import { Link } from "react-router-dom";
import { addItems, removeItems, clearCart } from "../Utils/cartSlice";
import Success from "./Success";
import { RES_CARD_IMG_CDN_URL } from "../helpers/Constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPlay } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const dispatch = useDispatch();
  const cartDetails = useSelector((store) => store.cart.cartItems);
  const locDetails = useSelector((store) => store.location.locationDetails);
  const time = cartDetails[0]?.resDetailsData?.slaString;
  const deliveryFee = (
    cartDetails[0]?.resDetailsData?.deliveryFee / 100
  ).toFixed(0);
  const distance = cartDetails[0]?.resDetailsData?.lastMileTravelString;
  const [area, setArea] = useState("");
  const [cityName, setCityName] = useState("");
  const [state, setState] = useState("");
  const [suggestionText, setSuggestionText] = useState("");
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleClearCart = () => {
    setOrderSuccess(false);
    dispatch(clearCart());
  };

  const handleIncreaseQuantity = (x) => {
    dispatch(addItems(x));
  };

  const handleDecreaseQuantity = (x) => {
    dispatch(removeItems(x));
  };

  useEffect(() => {
    if (locDetails[0]) {
      setArea(locDetails[0].area);
      setCityName(locDetails[0].district);
      setState(locDetails[0].state);
    }
  }, [locDetails]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (orderSuccess) {
      const timeoutId = setTimeout(() => {
        handleClearCart();
      }, 2500);
      return () => clearTimeout(timeoutId);
    }
  }, [orderSuccess]);

  const itemTotal = cartDetails.reduce((accumulator, currentItem) => {
    const itemPrice =
      ((currentItem.price || currentItem.defaultPrice) / 100) *
      currentItem.quantity;
    return accumulator + itemPrice;
  }, 0);

  return cartDetails.length === 0 ? (
    <div className="pt-40 flex flex-col items-center justify-center">
      <img src={emptyCart} className="w-[24rem]" />
      <h1 className="text-2xl text-[#535665] font-bold pt-5 tracking-tighter">
        Your cart is empty
      </h1>
      <p className="text-[#7e808c] py-4">
        You can go to home page to view more restaurants
      </p>
      <Link
        to="/"
        className="bg-[#fc8019] text-white text-lg font-semibold px-4 py-3"
      >
        SEE RESTAURANTS NEAR YOU
      </Link>
    </div>
  ) : orderSuccess ? (
    <div className="pt-40">
      <Success />
    </div>
  ) : (
    <div className="flex flex-col mt-28 bg-[#e9ecee] min-h-screen">
      <div className="flex mx-auto mt-4 xl:w-[80%]">
        <div className="flex-col flex-1 my-4 ml-8 mr-4">
          <div className="p-8 mb-5 bg-white w-full">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-lg text-[#282c3f] font-bold">
                  Delivery Address
                </h2>
                <h3 className="text-sm text-[#7f828f] font-medium">
                  {area}, {cityName}, {state}
                </h3>
              </div>
            </div>
          </div>
          <div className="px-8 py-6 bg-white w-full">
            <div>
              <h2 className="text-base text-[#282c3f] font-bold tracking-tight">
                Place your order
              </h2>
              <div
                className="my-4 bg-[#60b246] py-3 text-white font-bold text-center tracking-tight cursor-pointer hover:shadow-[0px_2PX_8PX_#d4d5d9]"
                onClick={() => {
                  setOrderSuccess(true);
                }}
              >
                PLACE ORDER
              </div>
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex-col ml-5 my-4 max-w-[35%]">
          <div className="flex-col pb-5 bg-white w-full h-fit">
            <Link
              to={`/restaurant/${cartDetails[0]?.resDetailsData?.id}`}
              className="flex mx-6 pt-6 pb-2"
            >
              <img
                className="w-14 h-14 mr-3 object-cover"
                src={
                  RES_CARD_IMG_CDN_URL +
                  cartDetails[0].resDetailsData?.cloudinaryImageId
                }
              />
              <div className="flex flex-col text-start justify-between w-full truncate">
                <div>
                  <h2 className="text-sm font-semibold text-[#282c3f]">
                    {cartDetails[0]?.resDetailsData?.name}
                  </h2>
                  <h3 className="text-xs min-h-fit truncate text-[#686b78]">
                    {cartDetails[0]?.resDetailsData?.areaName}
                  </h3>
                </div>
              </div>
            </Link>
            <div className="max-h-[67vh] overflow-y-auto">
              <div className="flex flex-col mx-6 pt-6">
                {cartDetails?.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="flex w-full justify-between px-2 mb-3 last:mb-0 items-center"
                    >
                      <div className="flex items-center w-[50%]">
                        {item?.isVeg ? (
                          <h5>
                            <FontAwesomeIcon
                              className="border border-solid border-[#e43b4f] text-[#e43b4f] max-h-4 max-w-4 p-[2px] text-[8px] -rotate-90"
                              icon={faPlay}
                            />
                          </h5>
                        ) : (
                          <h5>
                            <FontAwesomeIcon
                              className="border border-solid border-[#0f8a65] text-[#0f8a65] max-h-4 max-w-4 p-[2px] text-[8px]"
                              icon={faCircle}
                            />
                          </h5>
                        )}
                        <h1 className="ml-2 flex-1 text-left text-sm leading-4 overflow-clip">
                          {item.name}
                        </h1>
                      </div>
                      <div className="flex border-[1.11px] border-solid border-gray-300 p-1 text-sm items-center">
                        <div
                          className="px-2 font-bold flex-1 text-[#3e4152] cursor-pointer"
                          onClick={() => {
                            handleDecreaseQuantity(item);
                          }}
                        >
                          -
                        </div>
                        <div className="px-2 font-bold flex-1 text-[#60b246] text-xs">
                          {item.quantity}
                        </div>
                        <div
                          className="px-2 font-bold flex-1 text-[#60b246] cursor-pointer"
                          onClick={() => {
                            handleIncreaseQuantity(item);
                          }}
                        >
                          +
                        </div>
                      </div>
                      <div className="text-[#686b78] text-xs">
                        ₹
                        {(item.quantity * (item.price || item.defaultPrice)) /
                          100}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mx-4 px-2 py-4">
                <div className="text-[#282c3f] text-sm font-bold pt-4 ">
                  Bill Details
                </div>
                <div className="flex justify-between text-xs font-semibold pt-4 text-[#686b78]">
                  <h3>Item Total</h3>
                  <h3 className="text-nowrap">₹{Number(itemTotal)}</h3>
                </div>
                <div className="flex justify-between text-xs font-semibold pb-4">
                  <h3>Delivery Fee</h3>
                  <h3>
                    ₹
                    {Number(deliveryFee) ||
                      (Number(distance.split(" ")[0]) * 6.8).toFixed(2)}
                  </h3>
                </div>
                <div className="flex justify-between text-xs font-semibold pb-4">
                  <h3>GST</h3>
                  <h3>₹{(Number(itemTotal) * 0.18).toFixed(2)}</h3>
                </div>
                <div className="flex justify-between text-[#282c3f] border-t-2 border-solid border-black text-md font-bold mt-4">
                  <h3>TO PAY</h3>
                  <h3>
                    ₹
                    {(
                      Number(itemTotal) +
                      Number(
                        Number(deliveryFee) ||
                          (Number(distance.split(" ")[0]) * 6.8).toFixed(2)
                      ) +
                      Number(0.18 * itemTotal)
                    ).toFixed(2)}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
