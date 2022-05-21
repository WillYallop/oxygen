import updateSingle from '../data/update-single';
import expressRequestMock from 'express-request-mock';

describe('Test library update single component', function () {
  test('check response code', async () => {
    const options = {
      query: {},
    };
    const { res } = await expressRequestMock(updateSingle, options);
    expect(res.statusCode).toEqual(200);
  });
});
