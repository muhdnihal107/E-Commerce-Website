import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import { fetchProductdetail } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';

const ProductDetails = () => {
  const dispatch = useDispatch()
  const {data,loading} = useSelector((state)=> state.products.productdetails)
  const {id} = useParams();

  useEffect(()=>{
    dispatch(fetchProductdetail(id));
  },[dispatch,id]);
  

  const handleAddToCart = (product_id)=>{
    const itemData = {
      product_id,
      quantity:1
    }
    dispatch(addToCart(itemData));
  };

  if (loading){
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-blue-500 rounded-full animate-spin"></div>
        <div className="absolute top-2 left-2 w-12 h-12 border-4 border-t-green-400 border-r-transparent border-b-transparent border-l-green-400 rounded-full animate-spin-slow"></div>
      </div>
    </div>
    )
  }
  // if(!product){
  //   return <div>Product not found.</div>
  // }
  return (
    <>
    <div className="flex flex-col md:flex-row gap-6 p-10 bg-gray-50 opacity-90 rounded-lg shadow-md">
  {/* Product Image */}
  <div className="flex-shrink-0">
    <img
      src={data.image}
      alt={data.name}
      className="w-full md:w-64 h-auto object-cover rounded-lg"
    />
  </div>

  {/* Product Description */}
  <div className="flex flex-col justify-between">
    <div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">{data.name}</h3>
      <p className="text-gray-600 mb-2">
        {data.description}
      </p>
      <p className="text-gray-500 leading-relaxed mb-4">
        Blxyo qweofx ztriocv mvgytur elpsojid. Flonzy praguib kxelwot jembrix oucbwed. Rteplom vygosn
        klptweg frcysob lumexji. Juxlen mirtay zlqocbw freynad vopzitre. Xlomrup zdwkrte qiylop fnojirq vembliw.
        Pleforw xmbyutc vclrpso erqynol mbpwozk. Wyzoetr kplefno ixrmbut
        vlopnis qrtzyon. Ftnzywo pxedurc kmliotp qensyo vrgtiwl. Zrikfon vlxemyu ktprinew fowlbem gryxt. Dfbliyo
        prxenmt olpujic wezoytr kmfcyob.
      </p>
    </div>
    <div>
      <p className="text-lg font-bold text-green-600 mb-4">₹{data.price}</p>
      <button
        onClick={() => handleAddToCart(data.id)}
        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  </div>
</div>

    <Footer />
    </>
  )
}

export default ProductDetails