'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
	owner: 'Jonas Schmedtmann',
	movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
	interestRate: 1.2, // %
	pin: 1111,
};

const account2 = {
	owner: 'Jessica Davis',
	movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
	interestRate: 1.5,
	pin: 2222,
};

const account3 = {
	owner: 'Steven Thomas Williams',
	movements: [200, -200, 340, -300, -20, 50, 400, -460],
	interestRate: 0.7,
	pin: 3333,
};

const account4 = {
	owner: 'Sarah Smith',
	movements: [430, 1000, 700, 50, 90],
	interestRate: 1,
	pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovements = function(movements) {
	containerMovements.innerHTML = '';
	movements.forEach(function(mov, i){
		const transactionType = mov > 0 ? 'deposit' : 'withdrawal';
		const html = `
		<div class="movements__row">
			<div class="movements__type movements__type--${transactionType}">${i + 1} ${transactionType.toUpperCase()}</div>
			<div class="movements__value">${mov}€</div>
		  </div>
		`;
		containerMovements.insertAdjacentHTML('afterbegin' ,html);
	});
}

const calcShowBalance = function(account) {
	account.balance = account.movements.reduce((sum, mov) => sum+=mov, 0);
	labelBalance.textContent = `${account.balance}€`;
}

const calcShowSummary = function(account) {
	const income = account.movements.filter((mov) => mov > 0).reduce((sum, mov) => sum += mov,0);
	const outcome = account.movements.filter((mov) => mov < 0).reduce((sum,mov) => sum += mov, 0);
	const interest = account.movements
	.filter((mov) => mov > 0)
	.map((mov) => mov * account.interestRate/100)
	.filter((mov) => mov >= 1)
	.reduce((sum, mov) => sum += mov);
	labelSumIn.textContent = `${income}€`;
	labelSumOut.textContent = `${Math.abs(outcome)}€`;
	labelSumInterest.textContent = `${interest}€`;
	
};

const updateUI = function(currentUser) {
	// Show balance
	calcShowBalance(currentUser);
	// Show summary
	calcShowSummary(currentUser);
	// Show movements
	displayMovements(currentUser.movements);	
};

const userLoginCreator = function(accounts) {
	accounts.forEach(function(user){
		user.username = user.owner
		.toLocaleLowerCase()
		.split(' ')
		.map((name) => name[0])
		.join('');
	});
};
userLoginCreator(accounts);
let currentUser;

// Event handler
btnLogin.addEventListener('click', function(event){
	event.preventDefault();
	currentUser = accounts.find(acc => acc.username === inputLoginUsername.value);
	if(currentUser && currentUser.pin === Number(inputLoginPin.value)) {
		// Display UI and messages
		labelWelcome.textContent = `Welcome back ${currentUser.owner.split(' ')[0]}`;
		containerApp.style.opacity = 1;
		// Clear login inputs
		inputLoginUsername.value = '';
		inputLoginPin.value = '';
		inputLoginUsername.blur();
		inputLoginPin.blur();
		updateUI(currentUser);
	} else {
		labelWelcome.textContent = `Wrong username or PIN`;
	}
});

// Make Transfer
btnTransfer.addEventListener('click', function(event){
	event.preventDefault();
	const amount = Number(inputTransferAmount.value);
	const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
	console.log(receiverAcc);
	if(amount > 0 && amount <= currentUser.balance && receiverAcc && receiverAcc.username !== currentUser.username) {
		currentUser.movements.push(-amount);
		receiverAcc.movements.push(amount);
		inputTransferAmount.value = inputTransferTo.value = '';
		inputTransferAmount.blur();
		inputTransferTo.blur();
		updateUI(currentUser);
	}
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// const currencies = new Map([
// 	['USD', 'United States dollar'],
// 	['EUR', 'Euro'],
// 	['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////