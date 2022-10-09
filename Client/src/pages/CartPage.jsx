import React from "react";
import {loadStripe} from '@stripe/stripe-js'
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDecreaseCartProductMutation, useIncreaseCartProductMutation, useRemoveFromCartMutation } from "../services/appApi";
import "./CartPage.css";

const stripePromise = loadStripe("pk_test_51LLijESDK40ce5vjTdLu233ODHHQf6Ij8RdktRUZIgnLQ0SMaiS6z4PRLCHzplarl9oPr0s5uVsu7S83QhxvJWuW00jNu6LSTs")


const CartPage = () => {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const userCartObj = user.cart;

  let cart = products.filter((product) => userCartObj[product._id] != null);
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();
  const [increaseCartProduct] = useIncreaseCartProductMutation()
  const [decreaseCartProduct] = useDecreaseCartProductMutation()
const handleDecreaseCart = (data) =>{
    const quantity = user.cart.count;
    if(quantity<=1){
        return alert("Cant proceed")
    }
    decreaseCartProduct(data)
}
  return (
    <Container className="cart-container">
      <Row>
        <Col md={7}>
          <h3 className="pt-2">Shopping Cart</h3>
          {cart.length == 0 ? (
            <Alert variant="info">Shopping Cart is empty!</Alert>
          ) : (
            <div>Payment here</div>
          )}
        </Col>
        <Col md={5}>
          {cart.length > 0 && (
            <>
              <Table responsive="sm" className="cart-table">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>quantity</th>
                    <th>SubTotal</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {cart.map((item) => (
                    <tr>
                      <td>&nbsp;</td>
                      <td>
                        {!isLoading && (
                          <i
                            className="fa fa-times"
                            style={{ marginRight: 10, cursor: "pointer" }}
                            onClick={() =>
                              removeFromCart({
                                productId: item._id,
                                price: item.price,
                                userId: user._id,
                              })
                            }
                          ></i>
                        )}
                        <img
                          src={item.pictures[0].url}
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td>${item.price}</td>
                      <td className="quantity-indicator">
                      <i className="fa fa-minus-circle" onClick={()=>handleDecreaseCart({userId:user._id,productId:item._id,price:item.price})}/>
                      <span className="p-1">{user.cart[item._id]}</span>
                      <i className="fa fa-plus-circle" onClick={()=>increaseCartProduct({userId:user._id,productId:item._id,price:item.price})}/>
                      </td>
                      <td>${item.price*user.cart[item._id]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div>
                <h3 className="pt-4">Total:{user.cart.total}</h3>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
