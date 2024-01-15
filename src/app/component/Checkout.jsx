import React, { useState, useEffect } from "react";
import { product } from "../libs/product";
import Link from "next/link";

const Checkout = () => {
  const [quantity, setQuantity] = useState(1);
  // const [paymentUrl, setPaymentUrl] = useState();
  
  const decreaseQuantity = () => {
    setQuantity((prevState) => (quantity > 1 ? prevState - 1 : null));
  };
  
  const increaseQuantity = () => {
    setQuantity((prevState) => prevState + 1);
  };
  
  const checkout = async () => {
    const data = {
      id: product.id,
      productName: product.name,
      price: product.price,
      quantity: quantity,
    }
    
    const response = await fetch("/api/token", {
      method: "POST",
      body: JSON.stringify(data)
    })
    
    const requestData = await response.json();
    // console.log({requestData})
    window.snap.pay(requestData.token)
    };
    
    // GENERATE DI BAWAH INI BUAT PAYMENT LINK
  
  // const generatePaymentLink = async () => {
  //   const secret = process.env.NEXT_PUBLIC_SECRET
  //   const encodeSecret = Buffer.from(secret).toString('base64')
  //   const basicAuth = `Basic ${encodeSecret}`
    
  //   let data = {
  //     item_details: [
  //       {
  //         id: product.id,
  //         name: product.name,
  //         price: product.price,
  //         quantity: quantity
  //       }
  //     ],
  //     transaction_details:
  //     {
  //       order_id: product.id,
  //       gross_amount: product.price * quantity
  //     }
  //   }
    
  //   const response = await fetch(`${process.env.NEXT_PUBLIC_API}/v1/payment-links`, {
  //     method: "POST",
  //     headers: {
  //       "Accept": "application/json",
  //       "Content-Type": "application/json",
  //       "Authorization": basicAuth
  //     },
  //     body: JSON.stringify(data)
  //   })
    
  //   const paymentLink = await response.json()
  //   // console.log(paymentLink.payment_url)
  //   console.log(paymentLink.payment_url)
  //   setPaymentUrl(paymentLink.payment_url)
  // };
  
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex sm:gap-4">
          <button
            className="transition-all hover:opacity-75"
            onClick={decreaseQuantity}
          >
            ➖
          </button>

          <input
            type="number"
            id="quantity"
            value={quantity}
            className="h-10 w-16 text-black border-transparent text-center"
            onChange={quantity}
          />

          <button
            className="transition-all hover:opacity-75"
            onClick={increaseQuantity}
          >
            ➕
          </button>
        </div>
        <button
          className="rounded bg-indigo-500 p-4 text-sm font-medium transition hover:scale-105"
          onClick={checkout}
        >
          Checkout
        </button>
      </div>
       {/* <button
        className="text-indigo-500 py-4 text-sm font-medium transition hover:scale-105"
        onClick={generatePaymentLink}
      >
        Create Payment Link
      </button>  */}
      {/* <div>
        <button onClick={paymentUrl} className="text-black underline italic">Klik di sini untuk melakukan pembayaran</button>
      </div> */}
      {/* <div className="text-indigo-800 underline italic">
        {paymentUrl && <Link href={paymentUrl}>Klik di sini untuk melakukan pembayaran</Link>}
      </div> */}
    </>
  );
};

export default Checkout;
