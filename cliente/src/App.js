import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import UpdateOffer from './Components/UpdateOffer';
import OfferNew from './Components/OfferNew';
import Offers from './Components/Offers';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route exact path='/api/offers' element = {<Offers />}/>
            <Route exact path='/api/offer/new' element = {<OfferNew />}/>
            <Route exact path='/api/offer/:id' element = {<UpdateOffer />}/>
          </Routes>
          
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
