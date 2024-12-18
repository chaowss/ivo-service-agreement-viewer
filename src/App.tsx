import { useState } from 'react';
import './App.css';
import ServiceAgreementViewer, { JsonElement } from './ServiceAgreementViewer';
import inputData from './input.json';

function App() {
  const [jsonData] = useState<JsonElement>(inputData as JsonElement);
  console.log(jsonData);

  return (
    <div className="App">
      <ServiceAgreementViewer element={jsonData as JsonElement} />
    </div>
  );
}

export default App;