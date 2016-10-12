var express = require('express');
var router = express.Router();

var fakeData = require("../src/assets/fakedata.json");

function initSession(req){
  let session = getSessionObject(req);
  if (!session || !session.appState){
    let st = Object.assign({}, fakeData);
    delete st.legos; // we don't need to save this data in the session
    setSessionObj(req, { appState: st });
  }
}

function setSessionObj(req, data){
  // req.session = data;
  req.app.locals = data;
}

function getSessionObject(req){
  // return req.session;
  return req.app.locals;
}

/* GET get the current state. */
router.get('/state', function(req, res, next) {
  console.log("session", req.session);
  try {
    initSession(req);

    let state = getSessionObject(req).appState;

    let returnState = Object.assign({}, state, {legos:fakeData.legos});
    res.json( returnState );
  } catch (e) {
    console.log(e);
    res.json(e);
  }
});

/* POST save the current state. */
router.post('/state', function(req, res, next) {

  initSession(req);
  let state = getSessionObject(req).appState;
  let newState = req.body;

  // simple data validation
  if (typeof newState.budget === "number" && newState.budget >0 && newState.budget <= 1000){
    state.budget = newState.budget;
  }

  if (newState.shopList instanceof Array){
    state.shopList = newState.shopList;
  }

  if (newState.cartList instanceof Array){
    state.cartList = newState.cartList;

    // calculate the budget based on the cartList in order to prevent mistakes
    let budgetUsed = 0;
    newState.cartList.forEach(id => {
      try {
        let price = Number(fakeData.legos[id].price);
        budgetUsed += price;
      } catch(e){
        console.log("Error parsing lego price", e);
      }
    });

    state.budgetUsed = budgetUsed;
  }

  res.send('OK');
});

module.exports = router;
