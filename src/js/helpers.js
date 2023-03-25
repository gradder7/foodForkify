// conatians function that we we will use again and again

import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// it will retun a promise
//error will occur here
export const getJSON = async url => {
  try {
    const fetchPromise = fetch(url);
    //which ever first runs the race either resolve or reject
    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (error) {
    // re-throwing the error
    //it will through the error where it is called
    // reject the promise where we calling that function
    throw error;
  }
};
