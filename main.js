import inquirer from "inquirer";
//bank account class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    //debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`withdrawal of $${amount} succesful. remaining balance: $${this.balance}`);
        }
        else {
            console.log("insufficient balance.");
        }
    }
    // credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; //$1 fee charge if more than $100 is deposited
        }
        this.balance += amount;
        console.log(`deposit of $${amount} successful. remaining balance: $${this.balance}`);
    }
    //check balance 
    checkBalance() {
        console.log(`current balance: $${this.balance}`);
    }
}
//customer class 
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// create bank account
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];
//create customers
const customers = [
    new Customer("Hamna", "Khan", "Male", 20, 3162223334, accounts[0]),
    new Customer("syeda", "hamna", "female", 23, 3332223334, accounts[1]),
    new Customer("Amna", "Khan", "female", 25, 3412223334, accounts[2])
];
//function to interact with bank account
async function sevice() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "enter your account number:"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "select",
                    choices: ["deposit", "withdraw", "check balance", "exit"]
                }]);
            switch (ans.select) {
                case "deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "enter the amount to deposite:"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "enter the amount to withdraw:"
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "check balance":
                    customer.account.checkBalance();
                    break;
                case "exit":
                    console.log("exiting banck program...");
                    console.log("\n Thank you for using our bank services. Have a great day!");
                    return;
            }
        }
        else {
            console.log("Invalid account number. please try again.");
        }
    } while (true);
}
sevice();
