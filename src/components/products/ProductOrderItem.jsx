import ReactImg from '../../assets/img/react.jpg';

export default function ProductOrderItem() {
  return (
    <div className='flex flex-row gap-28 items-center py-6 overflow-auto'>
        <div className='flex flex-row gap-2 items-center'>
            <img src={ReactImg} className='w-24 h-24'/>
            <div className='flex flex-col gap-1'>
                <p className='font-semibold'>Tên sản phẩm</p>
                <p className='text-slate-400'><span>Thể loại</span></p>
                <p className='font-semibold'><span>Giá</span></p>
            </div>
        </div>
        <p className='text-slate-500'><span>x Số lượng</span></p>
        <p className='text-red-400'><span> số lượng x price ?</span></p>
    </div>
  )
}
