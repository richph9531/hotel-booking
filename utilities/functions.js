const axios = require('axios');

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const responseType = 'json';

async function postData(data) {
  const url = 'http://hotel-test.equalexperts.io/booking';
  const response = await axios.post(url, data, { headers, responseType });
  return response;
};

async function deleteData(bookingid) {
  const auth = {
    username: 'admin',
    password: 'password123',
  }
  const url = `http://hotel-test.equalexperts.io/booking/${bookingid}`;
  const response = await axios.delete(url, { headers, responseType, auth });
  expect(response.status).toEqual(201);
  return response.status;
};

module.exports = {
  postData,
  deleteData,
};
