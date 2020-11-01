import request from 'supertest';
import App from '../routes';

App.build();

const TestRoutes = async (path: string, data: boolean) => {
  const { status, body } = await request(App.app).get(path);
  expect(status).toBe(200);
  if (data) expect(body.data).toBeDefined();
};

describe('Controllers', () => {
  it('Status code of /git/limit is 200', () => TestRoutes('/git/limit', true));
  it('Status code of /git/repos is 200', () => TestRoutes('/git/repos', true));
  it('Status code of /git/lang is 200', () => TestRoutes('/git/lang', true));
  it('Status code of /git/skills is 200', () => TestRoutes('/git/skills', false));
});