import React from 'react'
import { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {newCardActions} from '../_store/newCard.slice'
export default function CreateCard() {
    const navi =useNavigate()
    const [number, setNumber] = useState('')
    const [name, setName] = useState('')
    const [expiry, setExpiry] = useState('')
    const [cvc, setCvc] = useState('')
    const [focus, setFocus] = useState('')
    const dispatch = useDispatch()
    const submit =(event)=>{
        event.preventDefault()
        console.log(name,number,cvc,expiry)
        dispatch(newCardActions.new({name,number,expiry}))
        navi('/cards')
    }
    return (
        <div>
            <Cards
                number={number}
                expiry={expiry}
                cvc={cvc}
                name={name}
                focused={focus}
            />
            <form onSubmit={submit} style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <input style={{marginTop:'2em'}}
                    type="tel"
                    name="number"
                    placeholder="Card Number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    onFocus={e => setFocus(e.target.name)}
                />
                <input style={{marginTop:'2em'}}
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={e => setFocus(e.target.name)}
                />
                <input style={{marginTop:'2em'}}
                    type="text"
                    name="expiry"
                    placeholder="MM / YY Expiry"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    onFocus={e => setFocus(e.target.name)}
                />
                <input style={{marginTop:'2em'}}
                    type="tel"
                    name="cvc"
                    placeholder="CVC"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    onFocus={e => setFocus(e.target.name)}
                />
                <button style={{marginTop:'2em',width:'30%',height:'3em'}}>Submit</button>
            </form>
        </div>
    )
}
