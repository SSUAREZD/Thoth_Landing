export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080',
  appUrl: 'http://localhost:4201',
  getApiUrl: () => {
    if (typeof window !== 'undefined') {
      return `http://${window.location.hostname}:8080`;
    }
    return 'http://localhost:8080';
  },
  getAppUrl: () => {
    if (typeof window !== 'undefined') {
      return `http://${window.location.hostname}:4201`;
    }
    return 'http://localhost:4201';
  }
};
