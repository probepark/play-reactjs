import React from 'react';
import ReactDOM from 'react-dom';
import HelloMessage from './components/hello';

const container = document != null ? document.getElementById('hello-container') : null

if (container) {
  ReactDOM.render(
    <HelloMessage name="John (from browser)" />,
    container
  )
}
