import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsSoundwave } from 'react-icons/bs';
import { RiHeartsFill } from 'react-icons/ri';

type Props = {
  singers: {
    name: string;
  }[];
};
export const TopArtSideBar = ({ singers }: Props) => {
  return (
    <section className='space-y-5'>
      <h3 className='text-3xl font-medium'>Top Artist</h3>
      <ul className='space-y-3'>
        {singers.map((item, index) => (
          <li key={index}>
            <Link href='ds'>
              <div className='flex items-center justify-start space-x-4 h-18 cursor-pointer py-1 transition-all top-art rounded-3xl'>
                <section className='bg-extra_light_purple flex items-center justify-center top-art-image overflow-hidden'>
                  <Image
                    src='/images/artist.jpg'
                    alt='artist'
                    width={65}
                    height={65}
                  />
                </section>
                <section className='py-2'>
                  <h5 className='capitalize font-semibold text-lg mb-1'>
                    {item.name}
                  </h5>
                  <div className='flex items-center justify-start space-x-2 text-gray-400'>
                    <p className='flex items-center justify-center space-x-2'>
                      <RiHeartsFill />
                      <span>123 Followers</span>
                    </p>
                    <p>-</p>
                    <p className='flex items-center justify-center space-x-2'>
                      <BsSoundwave />
                      <span>123 Plays</span>
                    </p>
                  </div>
                </section>
              </div>
            </Link>
          </li>
        ))}
        <li className='capitalize font-medium cursor-pointer max-w-fit text-gray-400'>
          <Link href='ds'>
            <p>see more</p>
          </Link>
        </li>
      </ul>
    </section>
  );
};
