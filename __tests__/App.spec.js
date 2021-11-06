import App from '../src/js/App';

describe('App', () => {
  it('should start redux without throwing', () => {
    let thrownErr;
    try {
      new App().startRedux();
    } catch (err) {
      thrownErr = err;
    }
    expect(thrownErr).toMatchSnapshot();
  });
});
