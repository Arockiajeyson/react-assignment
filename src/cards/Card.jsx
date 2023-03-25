import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import { cardActions } from '_store';

export default function Card() {
  const dispatch = useDispatch()
  const { type } = useSelector(x => x.cards)
  const [state, setState] = useState([])
  const navi = useNavigate()
  useEffect(() => {
    dispatch(cardActions.cards())
    console.log(type)
    setState(type.results)
  }, [])
  const AddCard = () => {
    navi('/create')
  }
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button onClick={AddCard} className="btn btn-primary float-left">Add Card</button>
      </div>
      <div style={{marginTop:'10em'}}>
        {state?.map((e) => {
          return (
            <div style={{ marginTop: '-4em' }}>
              <Cards
                name={e.cardHolder}
                number={e.cardNumber}
                expiry={e.cardExpiration}
                cvc="..."
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
