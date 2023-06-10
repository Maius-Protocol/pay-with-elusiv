import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import '@solana/wallet-adapter-react-ui/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/reset.css';
import './index.css';
import ClientWalletProvider from '../../contexts/ClientWalletProvider';
import { router } from '../../constants/routes';

const container = document.getElementById('app-container');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <ClientWalletProvider>
    <RouterProvider router={router} />
  </ClientWalletProvider>
);
