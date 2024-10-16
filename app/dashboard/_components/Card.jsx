import React from 'react'; // Import React

function Card({ icon, title, value }) { // Define the Card component and destructure props
  return (
    <div className='flex items-center p-7 gap-5 bg-sky-100 rounded-lg shadow'> {/* Main container for the card with styling */}
        <div className='p-2 h[10 w-10 rounded-full bg-white text-primary]'> {/* Icon container with padding and background color */}
            {icon} {/* Render the icon passed as a prop */}
        </div>
        <div>
            <h2 className='font-bold'>{title}</h2> {/* Title of the card, bold text */}
            <h2 className='text-lg'>{value}</h2> {/* Value of the card, larger text */}
        </div>
    </div>
  );
}

export default Card; // Export the Card component for use in other parts of the application
