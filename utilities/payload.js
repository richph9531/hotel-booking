const moment = require('moment');

const checkin = moment().add(1, 'days').format('YYYY-MM-DD');
const checkout = moment().add(3, 'days').format('YYYY-MM-DD');

const payload = {
  firstname: 'Richard',
  lastname: 'Branson',
  totalprice: 1000,
  depositpaid: true,
  bookingdates: {
    checkin,
    checkout,
  },
};

module.exports = {
  payload,
};
