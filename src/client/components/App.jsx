import '../app.css';
import React, { useState, useEffect } from 'react';

export default function App() {

  const [startDate, setStartDate] = useState('');
  const [numberDays, setNumberDays] = useState(0);
  const [totalCost, setTotalCost] = useState('');

  useEffect(() => { console.log(startDate, numberDays, totalCost) });
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
            'numberDays': numberDays
          })
        })
          .then((res) => res.json())
          .then((res) => {
            res.msg === 'Calculation success' ? setTotalCost(res.budget) : alert('Invalid input');
            setStartDate(''); setNumberDays(0);
          });

      }}>
        <div>
          <span>Beginning Date</span><input type='date' min='2019-01-01' value={startDate} onChange={e => setStartDate(e.target.value)} />
        </div>
        <div>
          <span>Number of Days</span><input type='text' placeholder='number of days*' value={numberDays} onChange={e => setNumberDays(e.target.value)} />
          <p>*Including the beginning date. Bannas are only purchased on weekdays.</p>
        </div>


        <button id='submit-button' value="Submit">submit</button>
      </form>
      <div>Total Cost: ${totalCost}</div>
    </div>
  );
}
