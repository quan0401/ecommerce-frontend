import { FC, ReactElement, useMemo, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { SellerContextType } from '~features/seller/interfaces/seller.interface';
import { orderTypes, sellerOrderList, shortenLargeNumbers } from '~shared/utils/utils.service';
import ManagesOrdersTable from './components/ManagesOrdersTable';
const SELLER_GIG_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  IN_PROGRESS: 'in_progress',
  DELIVERED: 'delivered'
};

const ManageOrders: FC = (): ReactElement => {
  const [type, setType] = useState<string>(SELLER_GIG_STATUS.ACTIVE);
  const { orders } = useOutletContext<SellerContextType>();
  const ordersRef = useMemo(() => [...orders], [orders]);

  return (
    <div className="container mx-auto mt-8 px-6 md:px-12 lg:px-6">
      <div className="flex flex-col flex-wrap">
        <div className="mb-8 px-4 text-xl font-semibold text-black md:px-0 md:text-2xl lg:text-4xl">Manage Orders</div>
        <div className="p-0">
          <ul className="flex w-full cursor-pointer list-none flex-col flex-wrap rounded-[2px] sm:flex-none sm:flex-row">
            <li className="inline-block py-3 uppercase" onClick={() => setType(SELLER_GIG_STATUS.ACTIVE)}>
              <a
                href="#activeorders"
                className={`px-4 py-3 text-xs text-[#555555] no-underline sm:text-sm md:text-base ${
                  type === SELLER_GIG_STATUS.ACTIVE ? 'pb-[15px] outline outline-1 outline-[#e8e8e8] sm:rounded-t-lg' : ''
                }`}
              >
                Active{' '}
                {orderTypes(SELLER_GIG_STATUS.IN_PROGRESS, ordersRef) > 0 && (
                  <span className="ml-1 rounded-[5px] bg-sky-500 px-[5px] py-[1px] text-xs font-medium text-white">
                    {shortenLargeNumbers(orderTypes(SELLER_GIG_STATUS.IN_PROGRESS, ordersRef))}
                  </span>
                )}
              </a>
            </li>
            <li className="inline-block py-3 uppercase" onClick={() => setType(SELLER_GIG_STATUS.COMPLETED)}>
              <a
                href="#activeorders"
                className={`px-4 py-3 text-xs text-[#555555] no-underline sm:text-sm md:text-base ${
                  type === SELLER_GIG_STATUS.COMPLETED ? 'pb-[15px] outline outline-1 outline-[#e8e8e8] sm:rounded-t-lg' : ''
                }`}
              >
                Completed{' '}
                {orderTypes(SELLER_GIG_STATUS.COMPLETED, ordersRef) > 0 && (
                  <span className="ml-1 rounded-[5px] bg-sky-500 px-[5px] py-[1px] text-xs font-medium text-white">
                    {' '}
                    {shortenLargeNumbers(orderTypes(SELLER_GIG_STATUS.COMPLETED, ordersRef))}
                  </span>
                )}
              </a>
            </li>
            <li className="inline-block py-3 uppercase" onClick={() => setType(SELLER_GIG_STATUS.CANCELLED)}>
              <a
                href="#activeorders"
                className={`px-4 py-3 text-xs text-[#555555] no-underline sm:text-sm md:text-base ${
                  type === SELLER_GIG_STATUS.CANCELLED ? 'pb-[15px] outline outline-1 outline-[#e8e8e8] sm:rounded-t-lg' : ''
                }`}
              >
                Cancelled
                {orderTypes(SELLER_GIG_STATUS.CANCELLED, ordersRef) > 0 && (
                  <span className="ml-1 rounded-[5px] bg-sky-500 px-[5px] py-[1px] text-xs font-medium text-white">
                    {' '}
                    {shortenLargeNumbers(orderTypes(SELLER_GIG_STATUS.CANCELLED, ordersRef))}
                  </span>
                )}
              </a>
            </li>
          </ul>
        </div>

        {type === SELLER_GIG_STATUS.ACTIVE && (
          <ManagesOrdersTable
            type="active"
            orders={sellerOrderList(SELLER_GIG_STATUS.IN_PROGRESS, ordersRef)}
            orderTypes={orderTypes(SELLER_GIG_STATUS.IN_PROGRESS, ordersRef)}
          />
        )}
        {type === SELLER_GIG_STATUS.COMPLETED && (
          <ManagesOrdersTable
            type="completed"
            orders={sellerOrderList(SELLER_GIG_STATUS.COMPLETED, ordersRef)}
            orderTypes={orderTypes(SELLER_GIG_STATUS.COMPLETED, ordersRef)}
          />
        )}
        {type === SELLER_GIG_STATUS.CANCELLED && (
          <ManagesOrdersTable
            type="cancelled"
            orders={sellerOrderList(SELLER_GIG_STATUS.CANCELLED, ordersRef)}
            orderTypes={orderTypes(SELLER_GIG_STATUS.CANCELLED, ordersRef)}
          />
        )}
      </div>
    </div>
  );
};

export default ManageOrders;
