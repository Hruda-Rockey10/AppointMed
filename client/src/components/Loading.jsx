import React from 'react';

const Loading = () => {
  const [showMessage, setShowMessage] = React.useState(false);

  React.useEffect(() => {
    // Only show the "waking up" message if loading takes longer than 3 seconds
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50 gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
      {showMessage && (
        <p className="text-gray-400 text-sm font-medium animate-pulse animate-fadeIn">
          Server is waking up... This may take 30-60 seconds.
        </p>
      )}
    </div>
  );
};

export default Loading;
