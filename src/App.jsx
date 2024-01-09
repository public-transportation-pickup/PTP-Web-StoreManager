
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Billing from './pages/Billing';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Billing/>}></Route>
        
      </Routes>
    </BrowserRouter>
  )
}
