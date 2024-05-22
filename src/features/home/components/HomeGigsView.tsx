import { FC } from 'react';
import { IHomeProps } from '../interfaces/home.interface';
import { Link } from 'react-router-dom';
import { replaceSpacesWithDash } from '~shared/utils/utils.service';
import { v4 as uuidv4 } from 'uuid';

const HomeGigsView: FC<IHomeProps> = ({ gigs, title, subTitle, category }) => {
  return (
    <div className="border-grey mx-auto my-8 flex flex-col overflow-hidden rounded-lg border">
      <div className="flex items-center px-6 py-6 sm:items-start">
        <div className="flex w-full flex-col justify-between">
          <div className="flex flex-col gap-2 md:flex-row">
            <h2 className="flex self-center text-base font-bold md:text-lg lg:text-2xl">{title}</h2>
            {category && (
              <span className="flex self-center text-base font-bold cursor-pointer text-sky-500 md:text-lg lg:text-2xl hover:text-sky-400 hover:underline">
                <Link to={`/categories/${replaceSpacesWithDash(category)}`}>{category}</Link>
              </span>
            )}
          </div>
          <h4 className="pt-1 text-center text-sm sm:text-left">{subTitle}</h4>
        </div>
      </div>
      <div className="flex w-full flex-nowrap items-center justify-center overflow-x-hidden px-6 md:overflow-x-auto lg:overflow-x-hidden">
        <div className="grid justify-center gap-x-8 pt-3 sm:h-full sm:w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {[...gigs, 1, 2, 3, 4, 5].map((_, index: number) => (
            // <!-- placeholder -->
            <div key={index} className="rounded">
              <div className="mb-8 flex cursor-pointer flex-col gap-2">
                <img src="https://placehold.co/330x220?text=Profile+Image" className="w-full rounded-lg" alt="Gig cover image" />
                <div className="flex items-center gap-2 relative">
                  <img
                    src="https://placehold.co/330x220?text=Profile+Image"
                    alt="Profile image"
                    className="h-7 w-8 rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeGigsView;
