import ReactImg from '../../assets/img/react.jpg';
import NumberFormat from '../../libs/Commons/NumberFormat';

export default function ProductOrderItem({item}) {
  return (
    <div className='flex flex-row gap-2 items-center py-6 overflow-auto'>
        <div className='flex flex-row gap-2 items-center'>
            <img src={item.imageURL} className='w-24 h-24'/>
            <div className='flex flex-col gap-1'>
                <p className='font-semibold'> {item.productName} </p>
                <div className='inline-flex gap-40'>
                  <p className='text-slate-400'><span>Giá:<NumberFormat number= {item.actualPrice}/> VNĐ</span></p>
                  <p className='text-slate-500'><span>x {item.quantity}</span></p>
                  <p className='text-red-400'><span> <NumberFormat number= {item.actualPrice * item.quantity}/> VNĐ</span></p>
                </div>
                <p className='font-semibold'><span>Ghi chú: {item.note}</span></p>
            </div>
        </div>
    </div>
  )
}



// export function OrderItemDetail({item}){  
//   // console.log(item);
//     return(
//       <>
//         <div className="flex flex-row gap-2">
//             <p className="text-sm font-bold	"  >-</p>
//             <p>{item.productName}</p>
//             <p>x{item.quantity}</p>
//             <p><strong className="pl-1"> <NumberFormat number={item.productPrice} /> VNĐ</strong></p>
//         </div>
//       </>
//     )
// }