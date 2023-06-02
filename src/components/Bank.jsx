import React from 'react';
import '../styles/Bank.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin } from '@fortawesome/free-solid-svg-icons'


function Bank({bank, currBank, setCurrBank}) {
    
    const products = []
    if (bank.ac) products.push('Access');
    if (bank.gc) products.push('Gift');
    if (bank.tm) products.push('TravelMoney');
    if (bank.ci) products.push('Incentive');

    const handleClick = () => {
        setCurrBank(bank);
    }

    const mapQueryString = `https://maps.google.com/maps?q=${bank.fullAddress}&hl=es;`

    return (
        <div className={bank === currBank ? 'Bank active' : 'Bank'} onClick={handleClick}>
            <p>{bank.clientName}</p>
            <p>{Math.round(bank.distance * 10)/ 10} miles away!</p>
            <div className="Bank-left">
                <a href={mapQueryString} target="_blank">
                    <ul>
                        <li>
                            <FontAwesomeIcon icon={faMapPin} /> {bank.address}
                        </li>
                        <li>
                            {bank.city} {bank.state}, {bank.zip}
                        </li>
                    </ul>
                </a>
            </div>
            <div className="Bank-right">
                <ul>
                    <li>{bank.phone}</li>
                    <li><a href={`http://www.${bank.url}`} target="_blank">{bank.url}</a></li>
                </ul>
            </div>
            <div className="Bank-products">
                <p>
                    {products.map(product=>(<div className={product} key={product}>{product}</div>))}
                </p>
            </div>
        </div>
    )
}

export default Bank