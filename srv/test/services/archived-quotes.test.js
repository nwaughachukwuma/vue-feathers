const assert = require('assert');
const app = require('../../src/app');

describe('\'archived_quotes\' service', () => {
  it('registered the service', () => {
    const service = app.service('archived-quotes');

    assert.ok(service, 'Registered the service');
  });
});
