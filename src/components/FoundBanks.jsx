import React from 'react';
import Bank from './Bank';
import '../styles/FoundBanks.css';

function FoundBanks({foundClients, loadState, setLoadState, currBank, setCurrBank}) {

    return (
        <div className="FoundBanks">
            {(foundClients && foundClients.length===0) && <div className="no-banks">
                <p className="no-banks-title">No banks found in your area!</p>
                <p>Try expanding your search using miles & products parameters.</p>
                </div>}
            {foundClients && foundClients.map(client => <Bank bank={client} currBank={currBank} setCurrBank={setCurrBank}></Bank>)}
        </div>
    )
}

export default FoundBanks;