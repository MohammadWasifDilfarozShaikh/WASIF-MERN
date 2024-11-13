import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    const fetchMyOrder = async () => {
        const res = await fetch("http://localhost:5000/api/myOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail'),
            }),
        });
        const response = await res.json();
        setOrderData(response);
    };

    useEffect(() => {
        fetchMyOrder();
        // Update the current time
        setCurrentTime(new Date());
    }, []);

    return (
        <div>
            <Navbar />

            <div className="container my-5">
                <div className="row gy-4">
                    {orderData && orderData.orderData ? (
                        orderData.orderData.order_data.slice(0).reverse().map((order, index) => (
                            <div key={index} className="w-100">
                                {/* Display order date and current time */}
                                <div className="text-center my-3">
                                    <h5>
                                        Order Date: {new Date(order[0].Order_date).toLocaleDateString()} <br />
                                        Current Time: {currentTime.toLocaleTimeString()}
                                    </h5>
                                    <hr />
                                </div>

                                {/* Display order items */}
                                <div className="row">
                                    {order.map((item, i) => (
                                        item.name ? (  // Check if the item has data
                                            <div key={i} className="col-12 col-md-6 col-lg-3">
                                                <div className="card shadow-sm">
                                                    <img
                                                        src={item.img}
                                                        className="card-img-top"
                                                        alt={item.name}
                                                        style={{ height: "120px", objectFit: "cover" }}
                                                    />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{item.name}</h5>
                                                        <div className="d-flex justify-content-between">
                                                            <span>Qty: {item.qty}</span>
                                                            <span>Size: {item.size}</span>
                                                        </div>
                                                        <div className="mt-2 text-end fs-5 fw-bold">
                                                            ₹{item.price}/-
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null // Avoid rendering blank items
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">Loading orders...</p>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
