import { Link } from 'react-router-dom';

const CustomLink = ({ to, label }) => {
  return (
    <Link
      to={to}
      className='bg-yellow-500 p-1 text-white capitalize rounded-sm hover:bg-yellow-600 px-2'
    >
      {label}
    </Link>
  );
};

export default CustomLink;
