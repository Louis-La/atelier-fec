import React from 'react';

const getCurrentTime = () => {
  var today = new Date();
  return (today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()).toString();
};

const interact = (element, widget) => {
  const info = {
    element: element,
    widget: widget,
    time: getCurrentTime()
  };
  $.ajax({
    method: 'POST',
    url: '/interaction',
    contentType: 'application/json',
    data: JSON.stringify(info),
    success: () => {
      console.log('click logged success');
    },
    error: () => {
      console.log('error in interactions');
    },
  });
};

export default interact;




