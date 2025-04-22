import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { NewTicketForm } from './NewTicketForm';
// import './index.css'; // deletelater after confirming overflow

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <NewTicketForm />
    </MantineProvider>
  </React.StrictMode>
);
