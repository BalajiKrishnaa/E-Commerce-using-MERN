import React, { useEffect, useState } from "react";
import { Badge, Button, ButtonGroup, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import axios from "../axios";
import Loading from "../components/Loading";
import SimilarProduct from "../components/SimilarProduct";
import './ProductPage.css'
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useAddToCartMutation } from "../services/appApi";
import ToastMessage from "../components/ToastMessage";
const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState(null);
  const user = useSelector(state=>state.user)
  const handleDragStart = (e) => e.preventDefault();
  const [addToCart,{isSuccess}] = useAddToCartMutation();
  useEffect(()=>{
    axios.get(`/products/${id}`).then(({data})=>{
        setProduct(data.product);
        setSimilar(data.similar);
    })
  },[id])
  if(!product){
    return <Loading />
  }
  const images = product.pictures.map((picture) => (
    <img className="product_carousel--image" src={picture.url} onDragStart={handleDragStart} />
  ));

  let similarProducts = [];
  if(similar){
    similarProducts= similar.map((product) => (
        <div>
            <SimilarProduct {...product}/>
        </div>
    ))
  }
  const responsive = {
    0:{items:1},
    568:{items:2},
    1024:{items:3}
  }
  return (
    <Container>
      <Row>
        <Col lg={6}>
          <AliceCarousel
          autoPlay={true}
          autoPlayInterval="4000"
            mouseTracking
            items={images}
        
          />
        </Col>
        <Col lg={6}>
          <h1>{product.name}</h1>
          <p>
            <Badge bg="primary">{product.category}</Badge>
          </p>
          <p>${product.price}</p>
         <p><strong>Description:</strong>{product.description}</p> 
         {user&&!user.isAdmin&&(
            <ButtonGroup style={{width:"90%"}}>
                <Form.Select size="lg" style={{width:"40%",borderRadius:0}} className="shadow-none">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </Form.Select>
                <Button size="lg" onClick={()=>addToCart({userId:user?._id,productId:id,price:product.price,pictures:product.pictures[0].url})}>
                  Add to cart</Button>
            </ButtonGroup>
         )}
         {user&&user.isAdmin&&(
                <LinkContainer to={`/product/${product._id}/edit`}>
                <Button size="lg">Edit Product</Button>
                </LinkContainer>
         )}
         {isSuccess&&<ToastMessage bg="info" title="Added to cart" msg={`${product.name} is added in your cart`}/>}
        </Col>
      </Row>
      <div className="my-4">
        <h2>Similar Products</h2>
        <div className="d-flex justify-content-center align-items-center flex-wrap">
        <AliceCarousel
            mouseTracking
            items={similarProducts}
        responsive={responsive}
        controlsStrategy="alternate"
          />
        </div>
      </div>
    </Container>
  );
};

export default ProductPage;
