import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateProductFact() {
  const [prod, setProd] = useState('');
  const [price, setPrice] = useState('');
  const [qte, setQte] = useState('');
  const [tva, setTva] = useState('0.19');
  const nav = useNavigate();


  async function Submit(e) {
    e.preventDefault();

    try {
      // Send data with Axios
      await axios.post(`http://127.0.0.1:8000/api/product_fact_Add`, {
        prod,
        price,
        qte,
        tva,
      });

      nav('/fact');
    } catch (err) {
      // Handle errors if needed
    }
  }

  return (
    <div className="create-product-container" style={{ marginTop: '150px' }}>
      <form className="create-product-form" onSubmit={Submit}>
        <div className="form-div">
          <label htmlFor="n">Product id:</label>
          <input
            id="n"
            type="number"
            min={0}
            placeholder="Enter the id of product"
            onChange={(e) => setProd(e.target.value)}
            value={prod}
            required
          />
        </div>
        <div className="form-div">
          <label htmlFor="nam">Product Price:</label>
          <input
            id="nam"
            type="number"
            min={0}
            placeholder="Enter the price of product"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required
          />
        </div>
        <div className="form-div">
          <label htmlFor="na">Product Qte:</label>
          <input
            id="na"
            type="number"
            min={0}
            placeholder="Enter Product Qte"
            onChange={(e) => setQte(e.target.value)}
            value={qte}
            required
          />
        </div>
        <div className="form-div">
          <button className="create-button" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
