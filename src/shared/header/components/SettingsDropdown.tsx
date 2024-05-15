import { FC } from 'react';
import { IHomeHeaderProps } from '../interfaces/header.interface';

import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/store/store';
import { applicationLogout, lowerCase } from '~shared/utils/utils.service';

const SettingsDropdown: FC<IHomeHeaderProps> = ({ seller, authUser, buyer, type, setIsDropdownOpen }) => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();

  const onLogout = (): void => {
    if (setIsDropdownOpen) {
      setIsDropdownOpen(false);
    }
    applicationLogout(dispatch, navigate);
  };

  return (
    <div className="border-grey w-44 divide-y divide-gray-100 rounded border bg-white shadow-md">
      <ul className="text-gray-700s py-2 text-sm" aria-labelledby="avatarButton">
        <li className="mx-3 mb-1">
          <Link
            to={`${type !== 'buyer' ? `/${lowerCase(`${authUser?.username}`)}/${seller?._id}/seller_dashboard` : '/'}`}
            className="block w-full cursor-pointer rounded  px-4s py-2 text-center font-bold  hover:bg-sky-400 focus:outline-none"
            onClick={() => {
              if (setIsDropdownOpen) {
                setIsDropdownOpen(false);
              }
            }}
          >
            {type !== 'buyer' ? 'Switch to Selling' : 'Switch to Buying'}
          </Link>
        </li>

        {/* have to be a seller  */}
        {buyer && buyer.isSeller && type !== 'buyer' && (
          <li>
            <Link
              to={`/manage_gigs/new/${seller?._id}`}
              className="block px-4 py-2 hover:text-sky-400"
              onClick={() => {
                if (setIsDropdownOpen) {
                  setIsDropdownOpen(false);
                }
              }}
            >
              Add a new gig
            </Link>
          </li>
        )}
        {type === 'buyer' && (
          <li>
            <Link to={`/users/${buyer?.username}/${buyer?._id}/orders`} className="block px-4 py-2 hover:text-sky-400">
              Dashboard
            </Link>
          </li>
        )}
        {/* take to seller profile */}
        {buyer && buyer.isSeller && type !== 'buyer' && (
          <li>
            <Link
              to={`/seller_profile/${lowerCase(`${seller?.username}`)}/${seller?._id}/edit`}
              className="block px-4 py-2 hover:text-sky-400"
              onClick={() => {
                if (setIsDropdownOpen) {
                  setIsDropdownOpen(false);
                }
              }}
            >
              Profile
            </Link>
          </li>
        )}
        <li>
          <Link
            to={`${lowerCase(`${buyer?.username}/edit`)}`}
            className="block px-4 py-2 hover:text-sky-400"
            onClick={() => {
              if (setIsDropdownOpen) {
                setIsDropdownOpen(false);
              }
            }}
          >
            Settings
          </Link>
        </li>
      </ul>
      <div className="py-1">
        <div onClick={() => onLogout()} className="block px-4 py-2 text-sm hover:text-sky-400">
          Sign out
        </div>
      </div>
    </div>
  );
};

export default SettingsDropdown;
