'use strict';

const users = [
  {
    currency: "",
    interestRate: 1.2,
    locale: "en-GB",
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],

    movementsDates: [
      '2021-05-08T21:31:17.178Z',
      '2021-07-05T07:42:02.383Z',
      '2021-01-28T09:15:04.904Z',
      '2021-04-01T10:17:24.185Z',
      '2021-07-09T14:11:59.604Z',
      '2021-05-27T17:01:17.194Z',
      '2021-06-11T23:36:17.929Z',
      '2021-07-10T10:51:36.790Z',
    ],

    owner: "julian",
    pin: 1234
  },

  {
    currency: "",
    interestRate: 1.5,
    locale: "de-DE",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    movementsDates: [
      '2021-05-01T13:15:33.035Z',
      '2021-06-30T09:48:16.867Z',
      '2021-04-25T06:04:23.907Z',
      '2021-01-25T14:18:46.235Z',
      '2021-02-05T16:33:06.386Z',
      '2021-04-10T14:43:26.374Z',
      '2021-06-25T18:49:59.371Z',
      '2021-06-26T12:01:20.894Z',
    ],
    owner: "marty",
    pin: 4321
  }
]

/* -----SIGN IN----- */
const signinModal = document.querySelector('.modal-sign')
const passInputSign = document.querySelector('.signin__input--pin')
const confirmPassInput = document.querySelector('.signin__input--pin-confirm')
const usernameInputSign = document.querySelector('.signin__input--user')
const signinModalBtn = document.querySelector('.modal__btn-sign')
const signInBtn = document.querySelector('.authorization__sign-in')
const signModalClose = document.querySelector('.modal-sign__close')

signModalClose.onclick = () => {  //CLOSE SIGN IN MODAL
  signinModal.style.display = 'none'
}

signInBtn.onclick = () => { //SHOW SIGN IN MODAL
  signinModal.style.display = 'block'
}

signinModalBtn.addEventListener('click', function(e){   //IF ALL INPUTS ARE CORRECT, CALL createNewUser() FUNCTION
  e.preventDefault()
  checkIsDataCorrect()
  if(passInputSign.value && 
    confirmPassInput.value && 
    confirmPassInput.value === passInputSign.value && 
    !users.find(users => users.owner === usernameInputSign.value)){

    createNewUser()
  }
})

function checkIsDataCorrect(){    //CHECK ARE INPUTS CORRECT
  if(confirmPassInput.value !== passInputSign.value){
    passInputSign.classList.add('input--wrong')
    confirmPassInput.classList.add('input--wrong')
  }
  
  if(users.find(users => users.owner === usernameInputSign.value)){
    usernameInputSign.classList.add('input--wrong')
  }

}

function resetSignModal(){
  passInputSign.classList.remove('input--wrong')
  confirmPassInput.classList.remove('input--wrong')
  usernameInputSign.classList.remove('input--wrong')
  passInputSign.value = ''
  confirmPassInput.value = ''
  usernameInputSign.value = ''
  signinModal.style.display = 'none'
}

function createNewUser(){
  const user = {
    owner: document.querySelector('.signin__input--user').value,
    pin: Number(document.querySelector('.signin__input--pin').value),
    movements: [],
    interestRate: 0,
    movementsDates: [],
    currency: '',
    locale: navigator.language
  }

  users.push(user)
  resetSignModal()
}

/* -----LOG IN----- */
const loginModal = document.querySelector('.modal-log')
const passInputLog = document.querySelector('.login__input--pin')
const usernameInputLog = document.querySelector('.login__input--user')
const loginModalBtn = document.querySelector('.modal__btn-log')
const logInBtn = document.querySelector('.authorization__log-in')
const logModalClose = document.querySelector('.modal-log__close')
let currentUser

logInBtn.onclick = () => {  //SHOW LOG IN MODAL
  loginModal.style.display = 'block'
}

logModalClose.onclick = () => { //CLOSE LOG IN MODAL
  loginModal.style.display = 'none' 
}

loginModalBtn.addEventListener('click', function(e){
  e.preventDefault()

  currentUser = users.find(user => user.owner === usernameInputLog.value)

  if(currentUser.pin === Number(passInputLog.value)){   //CHECK IS THE PASSWORD CORRECT
    resetLogModal()
    containerApp.style.opacity = 100
    updateUI(currentUser)
    labelWelcome.innerHTML = `Welcome back, ${currentUser.owner}`
    labelDate.innerHTML = new Intl.DateTimeFormat(currentUser.locale).format(new Date())
    logoutTimer()
  }else{
    passInputLog.classList.add('input--wrong')
    usernameInputLog.classList.add('input--wrong')
  }
})

function resetLogModal(){
  passInputLog.classList.remove('input--wrong')
  usernameInputLog.classList.remove('input--wrong')
  passInputLog.value = ''
  usernameInputLog.value = ''
  loginModal.style.display = 'none'
}
/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const logoutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    time--;
  };

  let time = 10;

  tick();
  const timer = setInterval(tick, 1000);
};

function formatMovementDate(date){
  const calcDaysPassed = (date1, date2) => Math.abs(date2-date1) / (1000 * 60 * 60 * 24)
  const daysPassed = Math.floor(calcDaysPassed(new Date(), date))

  if(daysPassed === 0 ){
    return 'Today'
  }else if(daysPassed === 1 ){
    return 'Yesterday'
  } else if(daysPassed <= 7 ) {
    return 'Last week'
  }else{
    return new Intl.DateTimeFormat(currentUser.locale).format(new Date(date))
  }
}

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const movDate = new Date(acc.movementsDates[i])
    const displayDate = formatMovementDate(movDate)

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const updateUI = function (acc) {   //UPDATING UI
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

btnTransfer.addEventListener('click', function (e) {    //TRANSFER TO ANOTHER USER
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = users.find(
    acc => acc.owner === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentUser.balance >= amount &&
    receiverAcc?.owner !== currentUser.owner
  ) {
    // Doing the transfer
    currentUser.movements.push(-amount);
    currentUser.movementsDates.push(new Date().toISOString()) 
    receiverAcc.movementsDates.push(new Date().toISOString()) 
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentUser);
  }
});

btnLoan.addEventListener('click', function (e) {    //ADD INCOME 
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0) {
    // Add movement
    currentUser.movements.push(amount);
    currentUser.movementsDates.push(new Date().toISOString())

    // Update UI
    updateUI(currentUser);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {   //CLOSE USER`S ACCOUNT
  e.preventDefault();

  if (
    inputCloseUsername.value === currentUser.owner &&
    Number(inputClosePin.value) === currentUser.pin
  ) {
    // Delete account
    const index = users.findIndex(user => user.owner === inputCloseUsername.value)
    users.splice(index, 1)

    // Hide UI
    containerApp.style.opacity = 0;
    labelWelcome.innerText = 'Log in to get started'
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentUser, !sorted);
  sorted = !sorted;
});