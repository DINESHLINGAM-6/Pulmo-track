// utils.js

export const formatDate = (date) => {

  return new Date(date).toLocaleDateString();

};

// Add the cn function

export function cn(...classes) {

  return classes.filter(Boolean).join(' ');

}