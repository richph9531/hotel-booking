const axios = require('axios');

const url = 'http://hotel-test.equalexperts.io/booking';

const data = require('../utilities/payload.json');

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};
const responseType = 'json';

describe('test suite', () => {
  test('test case 1', async () => {
    const response = await axios.post(url, data, { headers, responseType });
    expect(response.status).toEqual(200);
    // console.log(response.data.bookingid);
  });

  test('test case 2', async () => {
    const response = await axios.post(url, data, { headers, responseType });
    expect(response.status).toEqual(200);
    // console.log(response.data.bookingid);
  });
});
