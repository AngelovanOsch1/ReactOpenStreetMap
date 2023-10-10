import React from 'react';
import '../src/styles/HitchCalculator.scss';
import svg from './assets/location.svg'

function HitchCalculator() {
  return (
    <section className='hitch-calculator-container'>
      <header>
        <div className='logo'>
          <img
            src={svg}
            alt='Location icon'
          />
          <h1>
            Hitch<span>Tracker</span>
          </h1>
        </div>
        <div className='emergency-text'>
          On emergency call <span>112</span> or <span>911</span>
        </div>
      </header>
      <form action='POST'>
        <div className='input-container'>
          <label>Where are you?</label>
          <input
            type='text'
            placeholder='Type ur location ...'
          />
        </div>
        <div className='input-container'>
          <label>Where do you want to go?</label>
          <input
            type='text'
            placeholder='Type ur destination ...'
          />
        </div>
        <button>Calculate</button>
      </form>
    </section>
  );
}

export default HitchCalculator