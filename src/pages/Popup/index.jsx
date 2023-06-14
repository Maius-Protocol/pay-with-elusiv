import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import '@solana/wallet-adapter-react-ui/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/reset.css';
import './index.css';
import ClientWalletProvider from '../../contexts/ClientWalletProvider';
import { router } from '../../constants/routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppProvider from '../../contexts/AppContext';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import ElusivProvider from '../../contexts/ElusivContext';
import KeypairProvider from '../../contexts/KeypairContext';

const container = document.getElementById('app-container');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const asyncStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

const doNotPersistQueries = ['elusiv-instance'];

root.render(
  <QueryClientProvider
    client={queryClient}
    persistOptions={{
      persister: asyncStoragePersister,
      dehydrateOptions: {
        shouldDehydrateQuery: ({ queryKey }) => {
          return !doNotPersistQueries.includes(queryKey);
        },
      },
    }}
  >
    <AppProvider>
      <ClientWalletProvider>
        <ElusivProvider>
          <KeypairProvider>
            <RouterProvider router={router} />
          </KeypairProvider>
        </ElusivProvider>
      </ClientWalletProvider>
    </AppProvider>
  </QueryClientProvider>
);
