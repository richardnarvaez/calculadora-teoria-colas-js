import { Link } from "react-router-dom";

interface ToolbarProps {
    title: string;
    description: string;
  }
const Toolbar = ({title, description}: ToolbarProps) => {
    return (<div className="relative flex my-3  items-center">
    <Link
      to="/"
      className=" hover:bg-gray-200 rounded-full p-2"
      title="back"
    >
      <svg className="w-6 h-6" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
        />
      </svg>
    </Link>
    <div className='ml-3'> 
      <h1 className="font-bold">{title}</h1>
      <small>{description}</small>
    </div>
  </div>)
}

export default Toolbar;