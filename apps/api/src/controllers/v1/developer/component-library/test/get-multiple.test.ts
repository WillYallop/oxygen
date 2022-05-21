import getMultiple from '../data/get-multiple';
import expressRequestMock from 'express-request-mock';

describe('Test library get multiple components', function () {
  test('check response code', async () => {
    const options = {
      query: {},
    };
    const { res } = await expressRequestMock(getMultiple, options);
    expect(res.statusCode).toEqual(200);
  });
});
