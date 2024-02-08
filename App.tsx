// App.js
import React from 'react';
import { AppProvider } from './AppContext';
import Navigator from './Navigator'; // Örnek Navigator dosyası

const App = () => {
  return (
    <AppProvider>
      <Navigator />
    </AppProvider>
  );
};

export default App;
