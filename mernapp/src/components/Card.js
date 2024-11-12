import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

function Card(props) {

  let options = props.options
  const priceRef = useRef()
  let priceOptions= Object.keys(options)
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  let dispatch = useDispatchCart()
  let data = useCart()

  const handleAddToCard=async()=>{
    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food != []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Added successfully in the cart")
        return
      }
      return
    }

    await dispatch({type:"ADD",id:props.foodItem._id, name:props.foodItem.name, price:finalPrice, qty:qty, size: size, img: props.ImgSrc})
    console.log(data);
  }

  let finalPrice = qty * parseInt(options[size])
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])

  return (
    <div>
      <div
        className="card mt-3 "
        style={{ width: "18rem", maxHeight: "360px" }}
      >
        <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:"120px",objectFit:"fill"}} />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container w-100">
            <select className="m-2 h-100 bg-success text-light rounded"
            onChange={(e)=> setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option className="text-danger" value={i + 1} key={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
              
            </select>

            <select className="m-2 h-100 bg-success text-light rounded" ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
              {priceOptions.map((data)=>{
                return <option value={data} key={data}>{data}</option>
              })}
            </select>

            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
          </div>
          <hr />
          <button className="btn btn-success justify-center ms-2" onClick={handleAddToCard}>Add To Card</button>
          
        </div>
      </div>
    </div>
  );
}

export default Card;
