import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Inovacom',
          type: 'deposit',
          category: 'Marketing',
          amount: 597,
          createdAt: new Date(),
        },
        {
          id: 2,
          title: 'DMW',
          type: 'deposit',
          category: 'Marketing',
          amount: 897,
          createdAt: new Date(),
        },
        {
          id: 3,
          title: 'Compras Franco',
          type: 'withdraw',
          category: 'Compras',
          amount: 93.58,
          createdAt: new Date(),
        },
      ],
    });
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      data.createdAt = new Date();

      return schema.create('transaction', data);
    });
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
