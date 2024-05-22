import { FC, ReactElement } from 'react';
import HomeSlider from './components/HomeSlider';
import HomeGigsView from './components/HomeGigsView';
import FeatureExperts from './components/FeatureExperts';
import { useGetRandomSellersQuery } from '~features/seller/services/seller.service';
import { ISellerDocument } from '~features/seller/interfaces/seller.interface';

const Home: FC = (): ReactElement => {
  const { data, isSuccess } = useGetRandomSellersQuery('10');
  let sellers: ISellerDocument[] = [];

  if (isSuccess) {
    // the reason we dont use useEffect here is that,
    // useGetRandomSellersQuery already uses hook in the background
    sellers = data.sellers as ISellerDocument[];
  }

  return (
    <div className="m-auto px-6 w-screen relative min-h-screen xl:container md:px-12 lg:px-6">
      <HomeSlider />
      <HomeGigsView gigs={[]} title="Because you viewed a gig on" subTitle="Tech subtitle" category="Programming & Tech" />
      <FeatureExperts sellers={sellers} />
    </div>
  );
};

export default Home;
