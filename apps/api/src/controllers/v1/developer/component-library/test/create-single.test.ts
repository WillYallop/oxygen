import createSingle from '../data/create-single';
import expressRequestMock from 'express-request-mock';

describe('Test library create single component', function () {
  test('check response code', async () => {
    const options = {
      query: {},
    };
    const { res } = await expressRequestMock(createSingle, options);
    expect(res.statusCode).toEqual(200);
  });
});
