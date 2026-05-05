export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080',
  appUrl: 'https://your-thothapp-deployment.com',
  firebase: {
    apiKey: 'AIzaSyCJDA5Qg1dwdBtwq5EoVf5E_XI4xd3U0ak',
    authDomain: 'thoth-landing.firebaseapp.com',
    projectId: 'thoth-landing',
    storageBucket: 'thoth-landing.firebasestorage.app',
    messagingSenderId: '179223669572',
    appId: '1:179223669572:web:0dbd89c7d531f6cd014511',
  },
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
