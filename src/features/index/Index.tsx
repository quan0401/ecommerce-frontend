import { FC, lazy, LazyExoticComponent, ReactElement, Suspense } from 'react';

import { IHeader } from '~shared/header/interfaces/header.interface';

import Categories from './Categories';
import HowItWorks from './HowItWorks';

const IndexHeader: LazyExoticComponent<FC<IHeader>> = lazy(() => import('~shared/header/components/Header'));
const IndexHero: LazyExoticComponent<FC> = lazy(() => import('./Hero'));
const IndexGigTabs: LazyExoticComponent<FC> = lazy(() => import('./gig-tabs/GigTabs'));

export const Index: FC = (): ReactElement => {
  return (
    <div>
      <Suspense>
        <IndexHeader navClass="navbar peer-checked:navbar-active fixed z-20 w-full border-b border-gray-100 bg-white/90 shadow-2xl shadow-gray-600/5 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-none" />
        <IndexHero />
        <IndexGigTabs />
        <HowItWorks />
        <Categories />
      </Suspense>
    </div>
  );
};
