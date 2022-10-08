import React from 'react'
import { Badge, Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
const SimilarProduct = ({_id,name,pictures,price,category}) => {
  return (
    <LinkContainer to={`/product/${_id}`} style={{width:"13rem",cursor:"pointer",margin:"10px"}}>
        <Card style={{margin:"10px",width:"20rem"}}>
            <Card.Img variant='top' src={pictures[0].url} style={{height:"150px",borderRadius:"10px",objectFit:"contain"}} />
        <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Badge bg="warning" text="dark">{category}</Badge>
        </Card.Body>
        </Card>
       </LinkContainer>
  )
}

export default SimilarProduct