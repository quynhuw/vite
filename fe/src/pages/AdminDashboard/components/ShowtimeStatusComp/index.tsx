import { ShowtimeStatus } from "../../../../enum";

interface ShowtimeStatusCompProps {
  status: ShowtimeStatus;
}

const ShowtimeStatusComp: React.FC<ShowtimeStatusCompProps> = ({ status }) => {
  if (status === ShowtimeStatus.active) {
    return (
      <div className="w-full col-span-1 py-1 text-black bg-green-500 rounded-3xl">
        Active
      </div>
    );
  }

  if (status === ShowtimeStatus.cancel) {
    return (
      <div className="w-full col-span-1 py-1 text-black bg-gray-500 rounded-3xl">
        Canceled
      </div>
    );
  }

  if (status === ShowtimeStatus.delete) {
    return (
      <div className="w-full col-span-1 py-1 text-black bg-blue-400 rounded-3xl">
        Deleted
      </div>
    );
  }

  if (status === ShowtimeStatus.screened) {
    return (
      <div className="w-full col-span-1 py-1 text-black bg-blue-400 rounded-3xl">
        Screened
      </div>
    );
  }

  return null;
};

export default ShowtimeStatusComp;
