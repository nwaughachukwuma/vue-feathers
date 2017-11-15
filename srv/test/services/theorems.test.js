const assert = require('assert');
const app = require('../../src/app');

describe('\'theorems\' service', () => {
  it('registered the service', () => {
    const service = app.service('theorems');

    assert.ok(service, 'Registered the service');
  });
});
