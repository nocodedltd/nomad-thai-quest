// Temporary test file to check if IncomeJourney can render
import React from 'react';
import IncomeJourney from './components/roadmap/IncomeJourney';
import { UserProvider } from './contexts/user-context';
import { BrowserRouter } from 'react-router-dom';

function TestIncomeJourney() {
  return (
    <BrowserRouter>
      <UserProvider>
        <div style={{ padding: '20px' }}>
          <h1>Testing IncomeJourney Component</h1>
          <IncomeJourney />
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default TestIncomeJourney;
