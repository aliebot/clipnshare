import { useEffect, useState, Fragment } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Disclosure, Menu, Transition } from '@headlessui/react';
import { PlusSmIcon } from '@heroicons/react/solid';
import {
  BellIcon,
  MenuIcon,
  XIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/outline';
import { signIn, signOut, useSession } from 'next-auth/react';

const navigation = [
  { name: 'Explore', href: '/', current: false },
  { name: 'Your Videos', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  const iconThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;

    if (currentTheme === 'light') {
      return (
        <button
          aria-label='Toggle Dark Mode'
          className='flex items-center justify-center transition-all bg-gray-200 rounded-md h-9 w-9 ring-gray-300 hover:ring-2 '
          onClick={() => setTheme('dark')}
        >
          <MoonIcon
            aria-label='Toggle Dark Mode'
            className='w-5 h-5 dark:text-gray-200'
            width='20'
            height='20'
          />
        </button>
      );
    } else {
      return (
        <button
          className='flex items-center justify-center transition-all rounded-md h-9 w-9 ring-gray-400 hover:ring-2 dark:bg-gray-600'
          onClick={() => setTheme('light')}
        >
          <SunIcon
            className='w-5 h-5 dark:text-gray-200'
            width='20'
            height='20'
          />
        </button>
      );
    }
  };

  return (
    <Disclosure
      as='nav'
      className='bg-gray-800 2xl:rounded-xl 2xl:mx-64 2xl:my-2'
    >
      {({ open }) => (
        <>
          <div className='px-2 mx-auto max-w-7xl sm:px-6 lg:px-8'>
            <div className='relative flex items-center justify-between h-16'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block w-6 h-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block w-6 h-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex items-center justify-center flex-1 sm:items-stretch sm:justify-start'>
                {/* <div className='flex items-center flex-shrink-0'>
                  <img
                    className='block w-auto h-8 lg:hidden'
                    src='https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=500'
                    alt='Workflow'
                  />
                  <img
                    className='hidden w-auto h-8 lg:block'
                    src='https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=500'
                    alt='Workflow'
                  />
                </div> */}
                <div className='hidden sm:block sm:ml-6'>
                  <div className='flex space-x-4'>
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                {session ? (
                  <button
                    type='button'
                    className='p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                  >
                    <span className='sr-only'>View notifications</span>
                    <BellIcon className='w-6 h-6' aria-hidden='true' />
                  </button>
                ) : null}
                {/* Profile dropdown */}
                {!session ? (
                  <button
                    type='button'
                    className='px-6 py-2 text-sm text-white bg-indigo-500 rounded-md focus:ring-4 hover:bg-indigo-600 focus:outline-none focus:ring-indigo-800'
                    onClick={() => signIn()}
                  >
                    Sign in
                  </button>
                ) : (
                  <Menu as='div' className='relative ml-3'>
                    <div>
                      <Menu.Button className='flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                        <span className='sr-only'>Open user menu</span>
                        <Image
                          src={session!.user!.image!}
                          width='36'
                          height='36'
                          alt='/profile.jpg'
                          priority={true}
                          className='w-8 h-8 rounded-full'
                        />
                        {/* <img
                          className='w-8 h-8 rounded-full'
                          src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                          alt=''
                        /> */}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href='#'
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href='#'
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href='#'
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                              onClick={() => signOut()}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
                {session ? (
                  <Link href='/clips/create-clip'>
                    <button className='inline-flex items-center justify-center px-4 py-2 ml-5 text-sm text-center text-white bg-indigo-500 rounded-md shadow-sm cursor-pointer hover:bg-indigo-600 focus:ring-indigo-800 focus:outline-none'>
                      <PlusSmIcon className='w-5 h-5 mr-2' />
                      <span className='relative'>Upload</span>
                    </button>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as='a'
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
