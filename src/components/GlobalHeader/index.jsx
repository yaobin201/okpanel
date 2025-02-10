
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import linkSource from '@/source/link.json'
import { useNavigate, useParams } from 'react-router-dom';

const navigation = linkSource.dev;

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function GlobalHeader() {
  const native = useNavigate();
  const { viewType } = useParams()

  function changeViewType(data) {
    native(`/tools/${data.id}`)
  }

  function goHome() {
    native('/')
  }

  return (<>
    <Disclosure as="nav" className="px-4 py-6 sm:px-6 lg:px-8">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className='text-2xl text-white cursor-pointer' onClick={() => goHome()}>Fast Start</span>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4 cursor-pointer">
                    {navigation.map((item) => (
                      <a
                        key={item.id}
                        onClick={() => changeViewType(item)}
                        className={classNames(
                          item.id === viewType
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.id === viewType ? 'page' : undefined}
                      >
                        {item.cat}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.id}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.id === viewType ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.id === viewType ? 'page' : undefined}
                >
                  {item.cat}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>


  </>)
}