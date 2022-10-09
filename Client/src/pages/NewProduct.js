import axios from '../axios';
import React, { useState } from 'react'
import { Col, Container,Button , Form, Row, Alert } from 'react-bootstrap';
import { useNavigate , Link } from 'react-router-dom';
import { useCreateProductMutation } from '../services/appApi';
import './NewProduct.css'
const NewProduct = () => {
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("");
    const [imgToRemove,setImgToRemove] = useState([]);
    const [pictures,setPictures] = useState([]);

    const navigate = useNavigate();
    const [createProduct,{isError,error,isLoading,isSuccess}] = useCreateProductMutation()

  const handleRemoveImg = async (imgObj) =>{
    setImgToRemove(imgObj.public_id);
    await axios.delete(`/images/${imgObj.public_id}/`).then((res)=>{
      setImgToRemove(null);
    setPictures((prev)=>prev.filter((img)=>img.public_id!==imgObj.public_id))
     } )}
  

  const handleSubmit = async(e) =>{
    e.preventDefault();
    await createProduct({name,description,price,category,pictures})
    setTimeout(()=>{
      navigate("/")
  },1500)
  }
    const showWidget = () =>{
        const widget = window.cloudinary.createUploadWidget({
          cloudName:"e-commerce-website-with-nextjs",
          uploadPreset:"fjeawzjt"
        },
        (error,result)=>{
          if(!error && result.event==="success"){
            setPictures((prev)=>[...prev,{url:result.info.url,public_id:result.info.public_id}])
          }
        }
        )
        widget.open()
    }
  return (
    <Container>
        <Row>
            <Col md={6} className="newProduct_form--container">
            <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            {isSuccess&&<Alert variant="danger">Product Created Successfully</Alert>}
          {isError&&<Alert variant="danger">{error.data}</Alert>}
            <h1>Create a Product</h1>
            <Form.Group>
              <Form.Control className="mb-3" type="text" placeholder="Product Name" value={name} onChange={(e)=>setName(e.target.value)} required />
            </Form.Group>
            <Form.Group>
              <Form.Control as="textarea" className="mb-3" type="text" style={{height:"100px"}} placeholder="Product Description" value={description} onChange={(e)=>setDescription(e.target.value)} required />
            </Form.Group>
            <Form.Group>
              <Form.Control className="mb-3" type="number" placeholder="Price ($)" value={price} onChange={(e)=>setPrice(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3" onChange={(e)=>setCategory(e.target.value)}>
                <Form.Label>Category</Form.Label>
              <Form.Select>
                <option disabled defaultValue>--Select One--</option>
                <option value="phones">Phones</option>
                <option value="laptops">Laptops</option>
                <option value="technology">Technology</option>
              </Form.Select>
            </Form.Group>
            <Form.Group  className="mb-3">
            <Button variant="outline-primary" type="button" onClick={showWidget}>
             Upload Images
            </Button>
            <div className='image-preview-container'>
              {pictures.map((picture)=>(
                <div className='image-preview'>
                  <img src={picture.url} />
                 {imgToRemove != picture.public_id && <i class="fa-solid fa-circle-xmark" onClick={()=>handleRemoveImg(picture)}></i>}
                </div>
              ))}
            </div>
            </Form.Group>
            <Button variant="outline-primary" type="submit" disabled={isLoading} className="mb-3">
              Create Product
            </Button>
          </Form>
            </Col>
            <Col md={6} className="newProduct_image--container"></Col>
        </Row>
    </Container>
  )
}

export default NewProduct