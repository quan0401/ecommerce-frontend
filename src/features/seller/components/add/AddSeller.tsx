import { FC, ReactElement } from 'react';
import { useAppSelector } from '~/store/store';
import { IReduxState } from '~/store/store.interface';
import Breadcrumb from '~shared/breadcrumb/Breadcrumb';

const AddSeller: FC = (): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);

  return (
    <div className="relative w-full">
      {/* <!-- add breadcrumb component here --> */}
      <Breadcrumb breadCrumbItems={['Seller', 'Create Profile']} />

      <div className="container relative mx-auto my-5 px-2 pb-12 md:px-0">
        {/* <!-- add circular loader here --> */}
        {/* <div className="absolute left-0 top-0 z-50 flex h-full w-full justify-center bg-white/[0.8] text-sm font-bold md:text-base lg:text-xl"> */}
        {authUser && !authUser.emailVerified && (
          <div className="absolute left-0 top-0 z-50 flex h-full w-full justify-center  text-sm font-bold md:text-base lg:text-xl">
            <span className="mt-20">Please verify your email.</span>
          </div>
        )}

        <div className="left-0 top-0 z-10 mt-4 block h-full bg-white"></div>
      </div>
    </div>
  );
};

export default AddSeller;