import '../app.css';
import React, { useState, useEffect } from 'react';

export default function App() {

  const [startDate, setStartDate] = useState('');
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [totalCost, setTotalCost] = useState('');

  // useEffect(() => { console.log(startDate, numberOfDays, totalCost) });

  return (
    <div>
      <h1>Bob's Banana Budget</h1>
      <div>Enter the date you wish to begin budgeting banana expenses and how many days to calculate. We'll calculate the expense.</div>
      <form onSubmit={e => {
        e.preventDefault();
        fetch('/api/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify({
            'startDate': startDate,
            'numberOfDays': numberOfDays
          })
        })
          .then((res) => res.json())
          .then((res) => {
            res.msg === 'Calculation success' ? setTotalCost(res.totalCost) : alert('Invalid input');
            setStartDate(''); setNumberOfDays(0);
          });

      }}>
        <div>
          <span><strong>Beginning Date</strong></span><input type='date' min='2019-01-01' value={startDate} onChange={e => setStartDate(e.target.value)} />
        </div>
        <div>
          <span><strong>Number of Days</strong></span><input type='text' placeholder='number of days*' value={numberOfDays} onChange={e => setNumberOfDays(e.target.value)} />
        </div>
        <button id='submit-button' value="Submit">submit</button>
      </form>
      <div><h2>Total Cost: ${totalCost}</h2></div>
    </div>
  );
}
