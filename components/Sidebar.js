import { IoClose, IoTrashBin, IoChatbubbleEllipses, IoStar, IoStarOutline } from 'react-icons/io5';

const Sidebar = ({
  isOpen,
  onClose,
  chatHistory,
  onChatSelect,
  onDeleteChat,
  onToggleFavorite,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-72 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-all duration-300 ease-in-out z-50`}
    >
      <div className='flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700'>
        <h2 className='text-xl font-semibold text-primary dark:text-white flex items-center'>
          <IoChatbubbleEllipses className="mr-2" />
          Chat History
        </h2>
        <button
          onClick={onClose}
          className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200'
        >
          <IoClose size={24} />
        </button>
      </div>
      <div className='overflow-y-auto h-[calc(100%-5rem)] py-4'>
        {chatHistory.map((chat) => (
          <div
            key={chat.id}
            className='mx-4 mb-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200'
            onClick={() => onChatSelect(chat)}
          >
            <div className='flex justify-between items-start'>
              <div className='flex-grow mr-2'>
                <h3 className='text-sm font-medium text-gray-800 dark:text-gray-200 mb-1 break-words'>
                  {chat.title}
                </h3>
                <p className='text-xs text-gray-500 dark:text-gray-400'>
                  {new Date(chat.timestamp).toLocaleString()}
                </p>
              </div>
              <div className='flex items-center'>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(chat.id);
                  }}
                  className='text-gray-400 hover:text-yellow-500 transition-colors duration-200 flex-shrink-0 mr-2'
                >
                  {chat.isFavorite ? (
                    <IoStar size={16} className="text-yellow-500" />
                  ) : (
                    <IoStarOutline size={16} />
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(chat.id);
                  }}
                  className='text-gray-400 hover:text-red-500 transition-colors duration-200 flex-shrink-0'
                >
                  <IoTrashBin size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
