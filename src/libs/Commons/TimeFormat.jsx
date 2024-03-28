import React from 'react';

export const FormatTime = ({time}) => {
  const [hour, minute, second] = time.split(':');
  const dateObj = new Date(0, 0, 0, hour, minute, second);
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return (
    <p>{formatter.format(dateObj)}</p>
  );
};
