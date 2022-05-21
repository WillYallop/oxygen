import deleteSingle from '../data/delete-single';
import expressRequestMock from 'express-request-mock';

describe('Test library delete single component', function () {
  test('check response code', async () => {
    const options = {
      query: {},
    };
    const { res } = await expressRequestMock(deleteSingle, options);
    expect(res.statusCode).toEqual(200);
  });
});
