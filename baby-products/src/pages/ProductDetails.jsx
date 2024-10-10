import React, { useContext } from 'react'
import { ProductContext } from '../context/ProductContext'
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Footer from '../components/Footer';

const ProductDetails = () => {
  const {products,isLoading} = useContext(ProductContext);
  const {id} = useParams();
  const { addToCart } = useContext(CartContext);
   
  const product = products.find(prod => prod.id == parseInt(id));
   
  if (isLoading){
    return <div>Loading...</div>
  }
  if(!product){
    return <div>Product not found.</div>
  }
  return (
    <>
    <div className='product-details'>
      <div className='prod-detail-main'>
        <img src={product.image} alt={product.name} />
        <div className='prod-description'>
          <h3>{product.name}</h3>
          <p className='prod-descip-1'>{product.description}</p>
          <p className='prod-descip-2'>Blxyo qweofx ztriocv mvgytur elpsojid. Flonzy praguib kxelwot jembrix oucbwed. Rteplom vygosn
             klptweg frcysob lumexji. Juxlen mirtay zlqocbw freynad vopzitre. Xlomrup zdwkrte qiylop fnojirq vembliw.
              Pleforw xmbyutc vclrpso erqynol mbpwozk. Wyzoetr kplefno ixrmbut 
            vlopnis qrtzyon. Ftnzywo pxedurc kmliotp qensyo vrgtiwl. Zrikfon vlxemyu ktprinew fowlbem gryxt. Dfbliyo 
            prxenmt olpujic wezoytr kmfcyob.</p>
            <p className='prod-price'><strong>₹{product.price}</strong></p>
            <button onClick={()=>addToCart(product)} className='prod-detail-add-to-cart-btn'>Add to cart</button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default ProductDetails