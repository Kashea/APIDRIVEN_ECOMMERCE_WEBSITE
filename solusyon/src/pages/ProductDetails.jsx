import React from 'react';

import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import products from '../assets/data/products';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import '../styles/product-details.css';
import { motion } from 'framer-motion';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);

  const {
    imgUrl,
    productName,
    price,
    avgRating,
    review,
    description,
    shortDesc,
  } = product;

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />

      <section className='pt-0'>
        <Container>
          <Row>
            <Col lg='6'>
              <img src={imgUrl} alt='product' />
            </Col>

            <Col lg='6'>
              <div className='product_details'>
                <h2>{productName}</h2>
                <div className='product_rating d-flex align-items-center gap-5 mb-3'>
                  <div>
                    <span>
                      <i class='ri-star-s-fill'></i>
                      <i class='ri-star-s-fill'></i>
                      <i class='ri-star-s-fill'></i>
                      <i class='ri-star-s-fill'></i>
                      <i class='ri-star-half-s-line'></i>
                    </span>
                  </div>

                  <p>
                    (<span>{avgRating}</span> ratings)
                  </p>
                </div>

                <span className='product_price'>{price}</span>
                <p className='mt-3'>{shortDesc}</p>

                <motion.button whileTap={{ scale: 1.2 }} className='shop_btn'>
                  Add to Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>

        <section>
          <Container>
            <Row>
              <Col lg=></Col>
            </Row>
          </Container>
        </section>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
