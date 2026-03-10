import { type FC } from "react";
import { Link } from "react-router-dom";

interface NotFoundProps {
  content?: string;
}
const NotFound: FC<NotFoundProps> = ({
  content = "Opps!!!!! Page Not Found...",
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-2xl text-gray-200">{content}</p>

        <Link
          to="/"
          className="mt-6 inline-block bg-slate-700 rounded-lg text-white px-6 py-4 hover:bg-slate-900 transition-colors"
        >
          Go To Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
