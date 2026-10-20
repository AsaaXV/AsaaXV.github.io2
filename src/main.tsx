import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global error filter for third-party browser extensions (e.g. Sender Wallet, MetaMask, etc.)
if (typeof window !== 'undefined') {
  const ignoredKeywords = [
    'sender-wallet',
    'sender_getproviderstate',
    'sender-wallet-providerresult',
    'failed to get initial state',
    'no account exist',
    'chrome-extension://',
    'moz-extension://',
  ];

  const isExtensionError = (err: unknown): boolean => {
    if (!err) return false;
    let str = '';
    try {
      if (typeof err === 'string') {
        str = err;
      } else if (err instanceof Error) {
        str = err.message + ' ' + (err.stack || '');
      } else if (typeof err === 'object') {
        str = JSON.stringify(err);
      } else {
        str = String(err);
      }
    } catch {
      str = String(err);
    }
    const lower = str.toLowerCase();
    return ignoredKeywords.some((kw) => lower.includes(kw));
  };

  // Prevent console.error reporting for third-party extension failures
  const origConsoleError = console.error;
  console.error = (...args: unknown[]) => {
    if (args.some((arg) => isExtensionError(arg))) {
      return;
    }
    origConsoleError.apply(console, args);
  };

  window.addEventListener(
    'error',
    (event) => {
      if (isExtensionError(event.message) || isExtensionError(event.error)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );

  window.addEventListener(
    'unhandledrejection',
    (event) => {
      if (isExtensionError(event.reason)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );

  window.addEventListener(
    'message',
    (event) => {
      if (event && event.data && isExtensionError(event.data)) {
        event.stopImmediatePropagation();
      }
    },
    true
  );
}

createRoot(document.getElementById('root')!).render(<App />);
