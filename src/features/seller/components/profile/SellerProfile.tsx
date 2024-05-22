import { FC, ReactElement, useState } from 'react';
import Breadcrumb from '~shared/breadcrumb/Breadcrumb';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';
import SellerOverview from './components/SellerOverview';
import { useParams } from 'react-router-dom';
import { useGetSellerByIdQuery } from '~features/seller/services/seller.service';
import CircularPageLoader from '~shared/page-loader/CircularPageLoader';

const SellerProfile: FC = (): ReactElement => {
  const [showEditIcons, setShowEditIcons] = useState<boolean>(false);
  const [type, setType] = useState<string>('Overview');
  const { sellerId } = useParams();
  const { data, isLoading } = useGetSellerByIdQuery(`${sellerId}`);
  if (data) {
    console.log('first', data.seller?.experience[0]);
  }

  return (
    <div className="relative w-full pb-6">
      <Breadcrumb breadCrumbItems={['Seller', `${data && data.seller ? data.seller.username : ''}`]} />

      {isLoading ? (
        <CircularPageLoader />
      ) : (
        <div className="container mx-auto px-2 md:px-1">
          {/* <div className="my-2 flex h-8 justify-end md:h-10"></div> */}
          <ProfileHeader showEditIcons={showEditIcons} showHeaderInfo sellerProfile={data?.seller} />
          <div className="my-4 cursor-pointer">
            <ProfileTabs type={type} setType={setType} />
          </div>

          <div className=" flex flex-wrap bg-white p-5">
            {type === 'Overview' && <SellerOverview sellerProfile={data?.seller} showEditIcons={showEditIcons} />}
            {type === 'Active' && <div>Active</div>}
            {type === 'Ratings & Reviews' && <div>Ratings & Reviews</div>}
          </div>

          <div className="flex flex-wrap bg-white"></div>
        </div>
      )}
    </div>
  );
};

export default SellerProfile;
