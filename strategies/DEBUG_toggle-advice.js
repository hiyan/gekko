var settings = {
  wait: 0,
  each: 2
};

// -------

var _ = require('lodash');
var log = require('../core/log.js');
var moment = require('moment');
var lastAdvice = moment();

var i = 0;

var method = {
  init: _.noop,
  update: _.noop,
  log: _.noop,
  processTrade: function(trade) {
    log.debug('TRADE RECEIVED BY processTrade:', trade);
  },
  check: function(candle) {

    if(settings.wait > i)
      return;

    log.info('iteration:', i, 'candle time:', candle.start.utc().format("YYYY-MM-DD HH:mm:ss"));

    if (moment().subtract(3, 's').isAfter(lastAdvice)) {
      lastAdvice = moment();
      if(i % settings.each === 0) {
        log.debug('trigger SHORT');
        this.advice('short');
      } else if(i % settings.each === settings.each / 2) {
        log.debug('trigger LONG');
        this.advice('long');
      }
    } else {
      log.debug('Skipping trigger');
    }

    // if(i % 2 === 0)
    //   this.advice('long');
    // else if(i % 2 === 1)
    //   this.advice('short');

    i++;

  }
};

module.exports = method;
