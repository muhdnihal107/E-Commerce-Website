import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import { fetchProductdetail } from '../redux/slices/productSlice';

const ProductDetails = () => {
  const dispatch = useDispatch()
  const {data,loading} = useSelector((state)=> state.products.productdetails)
  // const {products,isLoading} = useContext(ProductContext);
  const {id} = useParams();

  useEffect(()=>{
    dispatch(fetchProductdetail(id));
  },[dispatch,id]);
  
  // const product = products.find(prod => prod.id == parseInt(id));
   console.log(id);
  if (loading){
    return <div>Loading...</div>
  }
  // if(!product){
  //   return <div>Product not found.</div>
  // }
  return (
    <>
    <div className='product-details'>
      <div className='prod-detail-main'>
         <img src={data.image} alt={data.name} />
        <div className='prod-description'>
          <h3>{data.name}</h3>
          <p className='prod-descip-1'>{data.description}</p>
          <p className='prod-descip-2'>Blxyo qweofx ztriocv mvgytur elpsojid. Flonzy praguib kxelwot jembrix oucbwed. Rteplom vygosn
             klptweg frcysob lumexji. Juxlen mirtay zlqocbw freynad vopzitre. Xlomrup zdwkrte qiylop fnojirq vembliw.
              Pleforw xmbyutc vclrpso erqynol mbpwozk. Wyzoetr kplefno ixrmbut 
            vlopnis qrtzyon. Ftnzywo pxedurc kmliotp qensyo vrgtiwl. Zrikfon vlxemyu ktprinew fowlbem gryxt. Dfbliyo 
            prxenmt olpujic wezoytr kmfcyob.</p>
            <p className='prod-price'><strong>₹{data.price}</strong></p>
            <button onClick={()=>addToCart(product)} className='prod-detail-add-to-cart-btn'>Add to cart</button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default ProductDetails