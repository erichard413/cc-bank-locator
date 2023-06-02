import { useState, useEffect } from 'react'
import clients from '../clients.js'
import LocatorForm from './forms/LocatorForm'
import { getCoordinates } from './helpers/geocode.js'
import { findClients } from './helpers/haversine.js'
import Header from './components/Header.jsx'
import FoundBanks from './components/FoundBanks.jsx'
import MapContainer from './components/MapContainer.jsx'
import Footer from './components/Footer.jsx'
import './App.css'
import 'dotenv';

function App() {
  const [foundClients, setFoundClients] = useState();
  const [loadState, setLoadState] = useState('ready');
  const [currBank, setCurrBank] = useState();

  useEffect(()=>{
    setLoadState('ready')
    if (foundClients) setCurrBank(foundClients[0]);
  },[foundClients])

  return (
    <>
    <Header />
    <LocatorForm setFoundClients={setFoundClients} loadState={loadState} setLoadState={setLoadState} />
    {(loadState === 'loading') && 
        <div class="spinner-container">
          <div class="spinner"></div>
        </div>
    }
    {(loadState ==='ready') && <> 
      <FoundBanks foundClients={foundClients} loadState={loadState} setLoadState={setLoadState} setCurrBank={setCurrBank} currBank={currBank} />
      <MapContainer currBank={currBank} />
    </>
    }
    <Footer />
    </>
  )
}

export default App
