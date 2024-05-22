import { FC, ReactElement } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { ISellerGig } from '~features/gigs/interfaces/gig.interface';
import { IOrderDocument } from '~features/order/interfaces/order.interface';
import { ISellerDocument } from '~features/seller/interfaces/seller.interface';
import { useGetSellerByIdQuery } from '~features/seller/services/seller.service';
import DashBoardHeader from '~shared/header/components/DashBoardHeader';

const Seller: FC = (): ReactElement => {
  const { sellerId } = useParams();
  const { data, isSuccess } = useGetSellerByIdQuery(`${sellerId}`);
  const orders: IOrderDocument[] = [];
  const gigs: ISellerGig[] = [];
  const pausedGigs: ISellerGig[] = [];
  let seller: ISellerDocument | undefined = undefined;

  if (isSuccess) {
    seller = data.seller as ISellerDocument;
  }
  return (
    <div className="relative w-screen">
      <DashBoardHeader />
      <div className="m-auto px-6 w-screen xl:container md:px-12 lg:px-6 relative min-h-screen">
        <Outlet context={{ seller, gigs, pausedGigs, orders }} />
      </div>
    </div>
  );
};

export default Seller;
