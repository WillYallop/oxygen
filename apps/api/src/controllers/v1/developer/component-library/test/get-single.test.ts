import getSingle from '../data/get-single';
import expressRequestMock from 'express-request-mock';

describe('Test library get single component', function () {
  test('check response code', async () => {
    const options = {
      query: {},
    };
    const { res } = await expressRequestMock(getSingle, options);
    expect(res.statusCode).toEqual(200);
  });
});
