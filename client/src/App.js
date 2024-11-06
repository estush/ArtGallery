
import './App.css';
import ChatBot from './components/ChatBot';
import Try1 from './components/Try1.jsx';
import AppRoutes from './routers/App.router';

function App() {
  return (
    <div className="App">
      <AppRoutes/>
      <ChatBot/>
      <Try1/>
    </div>
     
  );
}

export default App;
