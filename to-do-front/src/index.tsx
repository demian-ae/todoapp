import React from 'react';
import ReactDOM from 'react-dom/client';
import ToDoApp from './ToDoApp';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ToDoApp />
  </React.StrictMode>
);

