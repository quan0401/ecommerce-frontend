import { FC, Fragment, ReactElement, useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { IStarRatingProps } from '~shared/shared.interface';
import { v4 as uuidv4 } from 'uuid';

const StarRating: FC<IStarRatingProps> = ({ value, size, setReviewRating }): ReactElement => {
  const [numberOfStars] = useState<number[]>([...Array(5).keys()]);
  const [rating, setRating] = useState<number>(0);

  const handleClick = (index: number) => {
    // set if not readonly
    if (!value && setReviewRating) {
      setRating(index);
      setReviewRating(index);
    }
  };

  return (
    <div className="flex cursor-pointer">
      <div className="flex relative text-orange-400">
        {/* Selected star */}
        {numberOfStars.map((index: number) => (
          <Fragment key={index}>{index <= rating && <FaStar size={size} className="mr-1" />}</Fragment>
        ))}
        {/* unselected stars */}
        <div className="absolute flex text-orange-400">
          {numberOfStars.map((index: number) => (
            <FaRegStar className="mr-1" key={uuidv4()} size={size} onClick={() => handleClick(index)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StarRating;
