import React from 'react';
import {useState} from 'react';
import { findClients } from '../helpers/haversine';
import { getCoordinates } from '../helpers/geocode';
import '../styles/Form.css';

import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
  } from 'reactstrap';

function LocatorForm({setFoundClients, setLoadState}) {
    const initialFormState = {
        city: "",
        state: "",
        zip: "",
        miles: 10,
        ac: true,
        gc: true,
        ci: true,
        tm: true
    }
    const [formData, setFormData] = useState(initialFormState);
    const [flashMsg, setFlashMsg] = useState();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(data => ({
            ...data,
            [name] : value
        }))
    }

    const handleBoolToggle = (e) => {
        const {name} = e.target;
        let tf = formData[name]
        setFormData(data => ({
            ...data,
            [name] : !tf
        }))
    }

    const doSearch = async (data) => {
        try {
            const result = await getCoordinates(data);
            const foundClients = findClients(result, formData, +data.miles);
            setLoadState('ready');
            setFoundClients(foundClients);
        } catch (err) {
            setLoadState('ready');
            setFoundClients([]);
        }
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.city) {
            setFlashMsg('You must enter in your city!')
            setTimeout(()=>{
                setFlashMsg('');
            }, 2000)
            return;
        }
        if (!formData.ac && !formData.gc && !formData.tm && !formData.ci) {
            setFlashMsg('Please select products!');
            setTimeout(()=>{
                setFlashMsg('');
            }, 5000);
            return;
        }
        setLoadState('loading')
        doSearch(formData);
    }

    const states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

    return (
        <div className="LocatorForm">
            <div className="content">
                <p>Find a participating bank by filling out the form below.</p>
            </div>
            <div className="flash-div">
                {flashMsg && <p>{flashMsg}</p>}
            </div>
            <Form className="form">
                <FormGroup>
                    <Label for="city">City:</Label>
                    <Input
                        name="city"
                        type="text"
                        placeholder="Your city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </FormGroup>  
                <FormGroup>
                    <Label for="state">State:</Label>
                    <Input
                        name="state"
                        type="select"
                        placeholder="Your state"
                        value={formData.state}
                        onChange={handleChange}
                    >
                        {states.map(state=> (<option key={state}>{state}</option>))}
                    </Input>
                </FormGroup>  
                <FormGroup>
                    <Label for="type">Zip:</Label>
                    <Input
                        name="zip"
                        type="text"
                        placeholder="Your zip code"
                        value={formData.zip}
                        onChange={handleChange}
                    />
                </FormGroup>  
                <FormGroup>
                    <Label for="type">Miles:</Label>
                    <Input
                        name="miles"
                        type="select"
                        defaultValue={formData.miles}
                        onChange={handleChange}
                    >
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </Input>
                </FormGroup>
                <FormGroup check>
                    <Input
                        id="ac"
                        name="ac"
                        type="checkbox"
                        onChange={handleBoolToggle}
                        checked={formData.ac}
                    />
                    {formData.ac}
                    <Label for="ac" check>
                        Access Cards
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Input
                        id="gc"
                        name="gc"
                        type="checkbox"
                        onChange={handleBoolToggle}
                        checked={formData.gc}
                    />
                    {formData.gc}
                    <Label for="gc" check>
                        Gift Cards
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Input
                        id="tm"
                        name="tm"
                        type="checkbox"
                        onChange={handleBoolToggle}
                        checked={formData.tm}
                    />
                    {formData.tm}
                    <Label for="tm" check>
                        TravelMoney Cards
                    </Label>
                </FormGroup> 
                <FormGroup check>
                    <Input
                        id="ci"
                        name="ci"
                        type="checkbox"
                        onChange={handleBoolToggle}
                        checked={formData.ci}
                    />
                    {formData.ci}
                    <Label for="ci" check>
                        Corporate Incentive
                    </Label>
                </FormGroup> 
                <Button type="submit" onClick={handleSubmit}>Search</Button>
            </Form>

        </div>
    )
}

export default LocatorForm;
