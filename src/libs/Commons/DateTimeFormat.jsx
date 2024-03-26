
import React from 'react';


const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}h${minutes}m`;
  
    return {
      formattedDate,
      formattedTime,
    };
  };

  const DateTimeFormat = ({ date }) => {
    const { formattedDate, formattedTime } = formatDate(new Date(date));
  
    return (
      <div>
         <span>{formattedTime}</span>
        <br></br>
        <span>{formattedDate}</span>

      </div>
    );
  };
  
  export default DateTimeFormat;

  export const DateFormat = ({ date }) => {
    const { formattedDate, formattedTime } = formatDate(new Date(date));
  
    return (
      <div>
        <span>{formattedDate}</span>    <span>{formattedTime}</span>
      </div>
    );
  };