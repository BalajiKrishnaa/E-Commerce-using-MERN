import axios from '../axios'
import React, { useEffect, useState } from 'react'
import { Container, Row,Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import ProductReview from '../components/ProductReview'
import './CategoryPage.css'
const CategoryPage = () => {
    const {category} = useParams()
    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(false)
    const [searchTerm,setSearchTerm] = useState("")
    useEffect(()=>{
        setLoading(true)
        axios.get(`/products/category/${category.charAt(0).toUpperCase()+category.slice(1)}`).then(({data})=>{
            setProducts(data);
            setLoading(false);
        })
      },[])
      console.log(products);

      if(loading){
        return <Loading />
      }
      const productSearch = products?.filter(product=>product.name.toLowerCase().includes(searchTerm?.toLowerCase()))
  return (
    <div className='category-page-container'>
        <div className={`pt-3 ${category}-banner-container category-banner-container`}>
            <h1 className='text-center'>{category.charAt(0).toUpperCase()+category.slice(1)}</h1>
        </div>
        <div className='filters-container d-flex justify-content-center pt-4 pb-4'>
            <input type="search" placeholder='search' style={{outline:"none"}} onChange={(e)=>setSearchTerm(e.target.value)} />
        </div>
        {productSearch?.length===0?<h1>No products to Show</h1>:
        <Container>
            <Row>
                <Col md={{offset:1,span:10}}>
                    <div className='d-flex justify-content-center align-items-center'>
                {productSearch?.map(product=>(
                    <ProductReview {...product} />
                ))}
                </div>
                </Col>
            </Row>
        </Container>
        }
    </div>
  )
  }

export default CategoryPage