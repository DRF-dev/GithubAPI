import Routes from './routes';

(async () => {
  Routes.build();
  Routes.createServer();
})();