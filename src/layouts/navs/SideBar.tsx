import { IconContext } from 'react-icons';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { SIDEBAR_MENU } from 'constants/index';
import { trpc } from 'utils/trpc';
import NavItem from './NavItem';
import Profile from './Profile';

export const SideBar = () => {
  const router = useRouter();
  const { data } = trpc.useQuery(['user.me'], {
    onError: ({ message }) => {
      toast.error(message);
      router.push({
        pathname: '/',
      });
    },
  });

  return (
    <IconContext.Provider
      value={{ className: 'menu-icons' }}
    >
      {data && (
        <nav className='bg-extra_dark_purple py-10 px-8  min-w-[310px] text-white font-light'>
          <Profile
            username={data.userName}
            profile={data.profile}
            fullname={data.fullName}
          />

          <section className='overflow-x-hidden'>
            {SIDEBAR_MENU.map(
              (item) =>
                item.roles.includes(data.role) && (
                  <NavItem
                    item={item}
                    pathname={router.pathname}
                    key={`side_sec_${item.name}`}
                  />
                )
            )}
          </section>
        </nav>
      )}
    </IconContext.Provider>
  );
};
