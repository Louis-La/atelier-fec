import React from 'react';
import $ from 'jquery';

const timeConverter = () => {
  let current = new Date(Date.now());
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let year = current.getFullYear();
  let month = months[current.getMonth()];
  let date = current.getDate();
  let hour = current.getHours();
  let min = current.getMinutes();
  let sec = current.getSeconds();
  let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec + ' PDT';
  return time;
};
let currentTime = timeConverter();

const saveClickedInteraction = (element, widget) => {

  $.ajax({
    method: 'POST',
    url: '/userclick',
    data: { element: element, widget: widget, time: currentTime },
    success: (data) => {
      // console.log('Successfully logged user interaction click', data);
    },
    error: (error) => {
      console.log('Failed to log interaction click', error);
    },
  });

};

export default saveClickedInteraction;