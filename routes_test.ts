import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import { findNumbers } from './routes';


describe('routes', function() {

  it('findNumbers', function() {
    const req = httpMocks.createRequest({method: 'GET', url: '/find',
        query: {min: "1", max: "100", text: "not even and not prime and not fibonacci"}});
    const res = httpMocks.createResponse();
    findNumbers(req, res);

    assert.strictEqual(res._getStatusCode(), 200);
    assert.deepStrictEqual(res._getJSONData(),
        {results: [9, 15, 25, 27, 33, 35, 39, 45, 49, 51, 57, 63, 65, 69, 75, 77,
                   81, 85, 87, 91, 93, 95, 99]});
  });

});