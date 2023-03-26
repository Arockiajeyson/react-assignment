import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import { cardActions } from '_store';
import ReactSimplyCarousel from 'react-simply-carousel';
export default function Card() {
  const dispatch = useDispatch()
  const { type } = useSelector(x => x.cards)
  const [state, setState] = useState([])
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
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
      <div style={{ marginTop: '3em' }} >
        <ReactSimplyCarousel
          activeSlideIndex={activeSlideIndex}
          onRequestChange={setActiveSlideIndex}
          autoplay={true}
          infinite={true}
          itemsToShow={1}
          itemsToScroll={1}
          autoplayDelay={300}
          forwardBtnProps={{
            //here you can also pass className, or any other button element attributes
            style: {
              alignSelf: 'center',
              background: 'black',
              border: 'none',
              borderRadius: '50%',
              color: 'white',
              cursor: 'pointer',
              fontSize: '20px',
              height: 30,
              lineHeight: 1,
              textAlign: 'center',
              width: 30,
            },
            children: <span>{`>`}</span>,
          }}
          backwardBtnProps={{
            //here you can also pass className, or any other button element attributes
            style: {
              alignSelf: 'center',
              background: 'black',
              border: 'none',
              borderRadius: '50%',
              color: 'white',
              cursor: 'pointer',
              fontSize: '20px',
              height: 30,
              lineHeight: 1,
              textAlign: 'center',
              width: 30,
            },
            children: <span>{`<`}</span>,
          }}
          responsiveProps={[
            {
              itemsToShow: 2,
              itemsToScroll: 2,
              minWidth: 768,
            },
          ]}
          speed={2500}
          easing="linear"
        >
          {state?.map((e, m) => {
            return (
              <div style={{ marginLeft: '3em' }}>
                <Cards
                  name={e.cardHolder}
                  number={e.cardNumber}
                  expiry={e.cardExpiration}
                  cvc="..."
                />
              </div>
            )
          })}
        </ReactSimplyCarousel>
        <h1 style={{textAlign:'center',marginTop: '1em'}}>First 10 Cards</h1>
        <div style={{marginTop:'10em'}}>
          {state?.map((e, m) => {
            return (
              <div style={{ marginTop: '-6em' }}>
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
    </div>
  )
}
