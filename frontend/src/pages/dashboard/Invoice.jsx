import React, { useEffect, useState } from 'react';
import ProductCard from '../../Components/ProductCard';

const MakeOrderPage = () => {
    const [basket, setBasket] = useState([]);
    const [product, setProducts] = useState([]);
    const [runUseEf, setRun] = useState(0);
    const handleAddToBasket = (productInfo) => {
        setBasket([...basket, productInfo]);
    };

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/productGetAll')
        .then((result) => {
            if (!result.ok) {
                throw new Error('Network response was not ok');
            }
            return result.json();
        })
        .then((data) => {
            setProducts(data);
            
        })
        .catch((error) => {
          
        });
}, [runUseEf]);




    return (
        <div>
            <h1 style={{marginLeft:'20px' ,marginTop:'-15px'}}> Order Now!</h1>
            <div style={{ display: "flex", gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                
{product.map((product, index) => (
    <ProductCard key={index} onAddToBasket={handleAddToBasket} data={product} />
))}
</div>
        </div>
    );
};

export default MakeOrderPage;
