import '../app.css';
import React, { useState, useEffect } from 'react';

export default function App() {
  let today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [numberDays, setNumberDays] = useState(0);
  const [totalCost, setTotalCost] = useState('');

  return (
    <div>
      <h1>Bob's Banana Budget</h1>
      <span>This is a tool to budget banana expenses. Enter a date for the calculationt o begin and how many days to calculate. We'll tell you how much Bob will spend for that time period.</span>
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
            setStartDate(today); setNumberDays(0);
          });

      }}>
        <input type='date' min='2019-01-01' value={startDate} onChange={e => setStartDate(e.target.value)} />
        <input type='text' placeholder='number of days*' value={numberDays} onChange={e => setNumberDays(e.target.value)} />
        <span>*Including the beginning date. Bannas are only purchased on weekdays.</span>
        <button id='submit-button' value="Submit">submit</button>
      </form>
      <div>Total Cost: ${totalCost}</div>
    </div>
  );
}
