import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders, deleteOrder, clearOrders } from '../redux/orderSlice';
import type { RootState, AppDispatch } from '../redux/store';
import { FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';


export const OrdersHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector((state: RootState) => state.order);
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);
 
  const handleDeleteOrder = (orderId: string) => {
    dispatch(deleteOrder(orderId));
    setTimeout(() => {
      navigate(`/profile`)
    }, 1000);
  }

  if (loading) return <p className='w-[500px] h-[500px] mx-auto'>Loading orders...</p>;
  if (error) return <p className='w-[500px] h-[500px] mx-auto'>Error: {error}</p>;

  return (
    <div className='md:w-[60%] w-full mx-auto '>
        {orders.length > 0 ? 
        (
          <div className="py-2">
            {orders.map(order => (
              <div key={order._id} className="mb-4 p-4 rounded shadow-md bg-white">
                <p className='text-black py-2'><strong className=' font-bold'>Total amount:</strong> <span className="font-bold text-pink-600">${(order.totalAmount)}</span> </p>
                <p className='text-black'><strong className='font-bold'>Total items:</strong> <span className="font-bold text-pink-600">{(order.totalQuantity)} items</span> </p>
                <p className='py-2'><strong>Payment ID:</strong> {order.paymentIntentId}</p>
                <p><strong>Date:</strong> {new Date(order.paidAt).toLocaleString()}</p>
                <ul className="mt-2">
                  {order.orderItems.map((item, idx) => (
                    <li key={idx} className="text-sm py-2 flex gap-3">
                      <img src={item.image} alt={item.name} className='h-12 w-12 rounded-[50%]' />
                      <span className="font-bold">{item.name}</span>
                      <span className="font-bold">{item.quantity} * ${item.price}</span> 
                    </li>
                  ))}
                </ul>

                <FaTrash className='text-red-600 mt-5' onClick={() => handleDeleteOrder(order._id)} />
                  
            </div>
          ))}
            <button onClick={() => dispatch(clearOrders())} className="bg-pink rounded-md px-3 py-2">Clear all</button>
          </div>
        )
        :
        (
          <div className="w-full md:w-[500px] h-[500px] flex items-center justify-center flex-col gap-4 mx-auto">
            <h1 className='font-bold md:text-2xl text-md'>No orders yet</h1>
            <Link to={`/products`} className='py-2 text-white text-md px-4 bg-pink-600 rounded-md'> 
              Shop
            </Link>
          </div>
        )
    }
    </div>
    
  );
};

