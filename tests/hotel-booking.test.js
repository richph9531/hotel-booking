const _ = require('lodash');
const moment = require('moment');

const { postData, deleteData } = require('../utilities/functions');
const { payload } = require('../utilities/payload');

describe('Positive test scenarios', () => {
  test('can post a booking with depositPaid = true', async () => {
    const data = _.cloneDeep(payload);
    const response = await postData(data);

    expect(response.status).toEqual(200);
    const expectedResponse = {
      bookingid: response.data.bookingid,
      booking: data,
    };
    expect(response.data).toEqual(expectedResponse);

    await deleteData(response.data.bookingid);
  });

  test('can post a booking with depositPaid = false', async () => {
    const data = _.cloneDeep(payload);
    data.depositpaid = false;
    const response = await postData(data);

    expect(response.status).toEqual(200);
    const expectedResponse = {
      bookingid: response.data.bookingid,
      booking: data,
    };
    expect(response.data).toEqual(expectedResponse);

    await deleteData(response.data.bookingid);
  });

  test('can post a booking with firstName that contains special characters', async () => {
    const data = _.cloneDeep(payload);
    data.firstname = 'È¥Ý';
    const response = await postData(data);

    expect(response.status).toEqual(200);
    const expectedResponse = {
      bookingid: response.data.bookingid,
      booking: data,
    };
    expect(response.data).toEqual(expectedResponse);

    await deleteData(response.data.bookingid);
  });

  test('can post a booking with lastName that contains special characters', async () => {
    const data = _.cloneDeep(payload);
    data.lastname = 'È¥Ý';
    const response = await postData(data);

    expect(response.status).toEqual(200);
    const expectedResponse = {
      bookingid: response.data.bookingid,
      booking: data,
    };
    expect(response.data).toEqual(expectedResponse);

    await deleteData(response.data.bookingid);
  });

  test('can post a booking with firstName that contains spaces', async () => {
    const data = _.cloneDeep(payload);
    data.firstname = 'Garth Keith';
    const response = await postData(data);

    expect(response.status).toEqual(200);
    const expectedResponse = {
      bookingid: response.data.bookingid,
      booking: data,
    };
    expect(response.data).toEqual(expectedResponse);

    await deleteData(response.data.bookingid);
  });

  test('can post a booking with lastName that contains spaces', async () => {
    const data = _.cloneDeep(payload);
    data.lastname = 'Garth Keith';
    const response = await postData(data);

    expect(response.status).toEqual(200);
    const expectedResponse = {
      bookingid: response.data.bookingid,
      booking: data,
    };
    expect(response.data).toEqual(expectedResponse);

    await deleteData(response.data.bookingid);
  });

  test('can post a booking with a totalPrice of zero', async () => {
    const data = _.cloneDeep(payload);
    data.totalprice = 0;
    const response = await postData(data);

    expect(response.status).toEqual(200);
    const expectedResponse = {
      bookingid: response.data.bookingid,
      booking: data,
    };
    expect(response.data).toEqual(expectedResponse);

    await deleteData(response.data.bookingid);
  });

  test('can post a booking with a totalPrice of 1000,000,000', async () => {
    const data = _.cloneDeep(payload);
    data.totalprice = 1000000000;
    const response = await postData(data);

    expect(response.status).toEqual(200);
    const expectedResponse = {
      bookingid: response.data.bookingid,
      booking: data,
    };
    expect(response.data).toEqual(expectedResponse);

    await deleteData(response.data.bookingid);
  });
});

describe('Negative test scenarios', () => {
  test('cannot post without a firstName', async () => {
    const data = _.cloneDeep(payload);
    delete data.firstname;
    const response = await postData(data);
    expect(response.status).toEqual(500);
  });

  test('cannot post with a blank firstName', async () => {
    const data = _.cloneDeep(payload);
    data.firstname = '';
    const response = await postData(data);
    expect(response.status).toEqual(500);
  });

  // THIS CALL RETURNS A 200 - LOG BUG
  test.skip('cannot post with firstName of spaces only', async () => {
    const data = _.cloneDeep(payload);
    data.firstname = ' ';
    const response = await postData(data);
    expect(response.status).toEqual(500);
  });

  test('cannot post without a lastName', async () => {
    const data = _.cloneDeep(payload);
    delete data.lastname;
    const response = await postData(data);
    expect(response.status).toEqual(500);
  });

  test('cannot post with a blank lastName', async () => {
    const data = _.cloneDeep(payload);
    data.lastname = '';
    const response = await postData(data);
    expect(response.status).toEqual(500);
  });

  // THIS CALL RETURNS A 200 - LOG BUG
  test.skip('cannot post with lastName of spaces only', async () => {
    const data = _.cloneDeep(payload);
    data.lastname = ' ';
    const response = await postData(data);
    expect(response.status).toEqual(500);
  });

  test('cannot post without a totalPrice', async () => {
    const data = _.cloneDeep(payload);
    delete data.totalprice;
    const response = await postData(data);
    expect(response.status).toEqual(500);
  });

  test('cannot post with an invalid totalPrice', async () => {
    const data = _.cloneDeep(payload);
    data.totalprice = 'INVALID';
    const response = await postData(data);
    expect(response.status).toEqual(500);
  });

  // THIS CALL RETURNS A 200 - LOG BUG
  test.skip('cannot post with a negative totalPrice', async () => {
    const data = _.cloneDeep(payload);
    data.totalprice = -0.01;
    const response = await postData(data);
    expect(response.status).toEqual(500);
  });

  test('cannot post without a depositPaid boolean', async () => {
    const data = _.cloneDeep(payload);
    delete data.depositpaid;
    const response = await postData(data);
    expect(response.status).toEqual(500);
  });

  // THIS CALL RETURNS A 200 - LOG BUG
  test.skip('cannot post with an invalid depositPaid boolean', async () => {
    const data = _.cloneDeep(payload);
    data.depositpaid = 'INVALID';
    const response = await postData(data);
    expect(response.status).toEqual(500);
  });

  test('cannot post without a booking dates object', async () => {
    const data = _.cloneDeep(payload);
    delete data.bookingdates;
    const response = await postData(data);
    expect(response.status).toEqual(500);
  });

  test('cannot post without a checkIn date', async () => {
    const data = _.cloneDeep(payload);
    delete data.bookingdates.checkin;
    const response = await postData(data);
    expect(response.status).toEqual(500);
  });

  test('cannot post with an invalid checkIn date', async () => {
    const data = _.cloneDeep(payload);
    data.bookingdates.checkin = '2025-01-32';
    data.bookingdates.checkout = '2025-02-04';
    const response = await postData(data);
    expect(response.status).toEqual(500);
  });

  // THIS CALL RETURNS A 200 - LOG BUG
  test.skip('cannot post with a historic checkIn date', async () => {
    const data = _.cloneDeep(payload);
    data.bookingdates.checkin = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const response = await postData(data);
    expect(response.status).toEqual(500);
  });

  test('cannot post without a checkOut date', async () => {
    const data = _.cloneDeep(payload);
    delete data.bookingdates.checkout;
    const response = await postData(data);
    expect(response.status).toEqual(500);
  });

  test('cannot post with an invalid checkOut date', async () => {
    const data = _.cloneDeep(payload);
    data.bookingdates.checkin = '2025-01-15';
    data.bookingdates.checkout = '2025-01-32';
    const response = await postData(data);
    expect(response.status).toEqual(500);
  });

  // THIS CALL RETURNS A 200 - LOG BUG
  test.skip('cannot post with a historic checkOut date', async () => {
    const data = _.cloneDeep(payload);
    data.bookingdates.checkin = moment().subtract(4, 'days').format('YYYY-MM-DD');
    data.bookingdates.checkout = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const response = await postData(data);
    expect(response.status).toEqual(500);
  });

  // THIS CALL RETURNS A 200 - LOG BUG
  test.skip('cannot post with a checkOut date before the checkInDate', async () => {
    const data = _.cloneDeep(payload);
    data.bookingdates.checkin = moment().add(10, 'days').format('YYYY-MM-DD');
    data.bookingdates.checkout = moment().add(3, 'days').format('YYYY-MM-DD');
    const response = await postData(data);
    expect(response.status).toEqual(200);
  });
});
