import request from 'supertest';
import App from '../routes';

App.build();

describe('Controllers', () => {
  it('Should return 2', () => {
    expect(1 + 1).toBe(2);
  });
  it('Should return 3', () => {
    expect(1 + 2).toBe(3);
  });
  it('Should return 4', () => {
    expect(1 + 3).toBe(4);
  });
  it('Should return a value', async () => {
    const res = await request(App.app).get('/git/limit');
    expect(res.status).toBe(200);
    expect(res.body.data.rate.limit).toBeDefined();
  });
});