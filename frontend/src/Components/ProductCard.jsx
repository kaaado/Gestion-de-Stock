import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';
import axios from 'axios';

const ProductCard = ({ data }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [qte, setQuantity] = useState(1);
  const tva = 0.19;
  const [errorMessage, setErrorMessage] = useState('');
  const [dat, setDat] = useState(data);
  const nav = useNavigate();

  const handleAddToBasket = async () => {
    try {
      if (qte > data.Stock) {
        setErrorMessage(`Error: Quantity exceeds available stock (${data.Stock}).`);
        return;
      }

      setErrorMessage('');

      const response = await axios.get(`http://127.0.0.1:8000/api/productGet/${dat.Id}`);
      const productData = response.data;

      // Example: Sending data to the server
      await axios.post(`http://127.0.0.1:8000/api/product_fact_Add`, {
          prod: dat.Id,
          price: dat.Selling_Price,
          qte,
          tva,
       
      });

      setIsAdded(true);

   
      nav('/fact');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className={`card ${isAdded ? 'added' : ''}`}>
      <h3>{dat.Name}</h3>
      <h3>Reference: {dat.Reference}</h3>
      <h3>Code Bar: {dat.Bar_Code}</h3>
      <h3>Deposit: {dat.Id_Deposit}</h3>
      <h3>Price: {dat.Selling_Price}</h3>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="quantity">
        <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>-</button>
        <span>{qte}</span>
        <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button className='order-btn' onClick={handleAddToBasket}>
        <i className="fas fa-shopping-cart"></i> Order
      </button>
    </div>
  );
};

export default ProductCard;
