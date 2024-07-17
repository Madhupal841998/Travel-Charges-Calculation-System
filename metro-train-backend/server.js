const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 4000;

let journeys = [];
let zeroCards = {};

const charges = {
  KID: 30,
  ADULT: 100,
  SENIOR_CITIZEN: 20,
};

const discounts = {
  RETURN_JOURNEY: 0.5,
};

// Helper function to calculate charges
const calculateCharges = (ageGroup, isReturnJourney) => {
  let charge = charges[ageGroup];
  if (isReturnJourney) {
    charge =  charge + charge *discounts.RETURN_JOURNEY;
  }
  return charge;
};

// Create a new ZeroCard
app.post('/zerocard', (req, res) => {
  const { cardNumber, balance } = req.body;

  if (zeroCards[cardNumber] && zeroCards[cardNumber].balance !== 0) {
    return res.status(400).json({ error: 'ZeroCard already exists' });
  }
  const msg = zeroCards[cardNumber].balance === 0 ? 'ZeroCard Balance Updated' : 'ZeroCard created';

  zeroCards[cardNumber] = { balance };
  res.json({ message: msg, cardNumber, balance });
});

// Check ZeroCard balance
app.get('/zerocard/:cardNumber', (req, res) => {
  const { cardNumber } = req.params;

  if (!zeroCards[cardNumber]) {
    return res.status(404).json({ error: 'ZeroCard not found' });
  }

  res.json({ cardNumber, balance: zeroCards[cardNumber].balance });
});

// Record a journey
app.post('/journey', (req, res) => {
  const { cardNumber, ageGroup, isReturnJourney } = req.body;

  if (!zeroCards[cardNumber]) {
    return res.status(400).json({ error: 'ZeroCard not found' });
  }

  let charge = calculateCharges(ageGroup, isReturnJourney);
  if (zeroCards[cardNumber].balance < charge) {
    return res.status(400).json({ error: 'Insufficient balance' });
  }

  zeroCards[cardNumber].balance -= charge;

  journeys.push({ cardNumber, ageGroup, charge, isReturnJourney });

  res.json({ message: 'Journey recorded', charge });
});

// Get collection summary
app.get('/summary/collection', (req, res) => {
  let totalCollected = 0;
  let totalDiscount = 0;
  console.log(journeys);

  journeys.forEach(journey => {
    totalCollected += journey.charge;
    if (journey.isReturnJourney) {
      totalDiscount += (2 *charges[journey.ageGroup] - journey.charge);
    }
  });

  res.json({ totalCollected, totalDiscount });
});

// Get passenger summary
app.get('/summary/passenger', (req, res) => {
  const passengerCount = {
    KID: 0,
    ADULT: 0,
    SENIOR_CITIZEN: 0,
  };

  journeys.forEach(journey => {
    passengerCount[journey.ageGroup]++;
  });

  const sortedPassengerCount = Object.entries(passengerCount)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([type, count]) => ({ type, count }));

  res.json(sortedPassengerCount);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
