import { FC, ReactElement } from 'react';
import HomeSlider from './components/HomeSlider';
import HomeGigsView from './components/HomeGigsView';
import FeatureExperts from './components/FeatureExperts';

const Home: FC = (): ReactElement => {
  return (
    <div className="m-auto px-6 w-screen relative min-h-screen xl:container md:px-12 lg:px-6">
      <HomeSlider />
      <HomeGigsView gigs={[]} title="Because you viewed a gig on" subTitle="Tech subtitle" category="Programming & Tech" />
      <FeatureExperts sellers={[]} />
    </div>
  );
};

export default Home;
