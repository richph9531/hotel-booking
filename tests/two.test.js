const _ = require('lodash');

const { postData, deleteData } = require('../utilities/functions');
const payload = require('../utilities/payload.json');

describe('Happy day scenarios', () => {
  test('can post a booking with depositPaid = true', async () => {
    const data = _.cloneDeep(payload)
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
    const data = _.cloneDeep(payload)
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
    const data = _.cloneDeep(payload)
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
    const data = _.cloneDeep(payload)
    data.lastname = 'È¥Ý';
    const response = await postData(data);

    expect(response.status).toEqual(200);
    const expectedResponse = {
      bookingid: response.data.bookingid,
      booking: data,
    };
    // console.log(response.data);
    // console.log(expectedResponse);
    expect(response.data).toEqual(expectedResponse);

    await deleteData(response.data.bookingid);
  });

  test('can post a booking with firstName that contains spaces', async () => {
    const data = _.cloneDeep(payload)
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
    const data = _.cloneDeep(payload)
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

  test('cannot post with a blank firstName', async () => {});
  test('cannot post with firstName of spaces only', async () => {});
  test('cannot post without a lastName', async () => {});
  test('cannot post with a blank lastName', async () => {});
  test('cannot post with lastName of spaces only', async () => {});
  test('cannot post without a totalPrice', async () => {});
  test('cannot post with an invalid totalPrice', async () => {});
  test('cannot post with a negative totalPrice', async () => {});
  test('cannot post without a depositPaid boolean', async () => {});
  test('cannot post with an invalid depositPaid boolean', async () => {});
  test('cannot post without a booking dates object', async () => {});
  test('cannot post without a checkIn date', async () => {});
  test('cannot post with an invalid checkIn date', async () => {});
  test('cannot post with a historic checkIn date', async () => {});
  test('cannot post without a checkOut date', async () => {});
  test('cannot post with an invalid checkOut date', async () => {});
  test('cannot post with a historic checkOut date', async () => {});
  test('cannot post with a checkOut date before the checkInDate', async () => {});
})
