import { Link } from 'react-router-dom';

const Aside = () => {
    return (
        <aside className='mt-24 md:ml-10 mx-auto md:fixed' aria-label='Sidebar'>
            <div className='overflow-y-auto py-4 px-3 bg-gray-50 rounded'>
                <ul className='space-y-2'>
                    <li className='w-52 md:w-26'>
                        <Link
                            className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-300 '
                            to='/posts/'
                        >
                            All Posts
                        </Link>
                    </li>

                    <li className=''>
                        <Link
                            className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-300 '
                            to='/posts/new/'
                        >
                            New Post
                        </Link>
                    </li>
                    <li className=''>
                        <a
                            href='#'
                            className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-200'
                        >
                            Blog Frontend
                        </a>
                    </li>
                    <li className=''>
                        <Link
                            className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-300 '
                            to='/'
                        >
                            Log In
                        </Link>
                    </li>
                    <li className=''>
                        <Link
                            className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-300 '
                            to='/sign-up/'
                        >
                            Sign Up
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Aside;
