import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

const moneyDetailsList = [
  {
    id: 'BALANCE',
    heading: 'Your Balance',
    className: 'balance-container',
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
  },
  {
    id: 'INCOME',
    heading: 'Your Income',
    className: 'income-container',
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
  },
  {
    id: 'EXPENSES',
    heading: 'Your Expenses',
    className: 'expenses-container',
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
  },
]

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    income: 0,
    expenses: 0,
    givenOption: transactionTypeOptions[0].optionId,
    transactionList: [],
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOptionId = event => {
    this.setState({givenOption: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, givenOption} = this.state
    let newIncome = 0
    let newExpenses = 0
    let types
    if (givenOption === 'INCOME') {
      types = 'Income'
    } else {
      types = 'Expenses'
    }
    const newTransaction = {
      itemId: uuidv4(),
      title: titleInput,
      amount: amountInput,
      type: types,
    }

    if (givenOption === 'INCOME') {
      newIncome = amountInput
      this.setState(prevState => ({
        income: Number(prevState.income) + Number(newIncome),
      }))
    } else {
      newExpenses = amountInput
      this.setState(prevState => ({
        expenses: Number(prevState.expenses) + Number(newExpenses),
      }))
    }
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      titleInput: '',
      amountInput: '',
      givenOption: transactionTypeOptions[0].optionId,
    }))
  }

  onDeleteButton = givenId => {
    const {transactionList} = this.state

    const filteredList = transactionList.filter(each => each.itemId === givenId)
    if (filteredList[0].type === 'Income') {
      this.setState(prevState => ({
        income: Number(prevState.income) - Number(filteredList[0].amount),
      }))
    } else {
      this.setState(prevState => ({
        expenses: Number(prevState.expenses) - Number(filteredList[0].amount),
      }))
    }

    this.setState(prevState => ({
      transactionList: prevState.transactionList.filter(
        eachTransaction => eachTransaction.itemId !== givenId,
      ),
    }))
  }

  render() {
    const {
      titleInput,
      amountInput,
      transactionList,
      income,
      expenses,
      givenOption,
    } = this.state

    return (
      <div className="main-container">
        <div className="content-container">
          <div className="person-container">
            <h1 className="style-name">Hi, Richard</h1>
            <p className="style-welcome">
              Welcome back to your
              <span className="style-span"> Money Manager</span>
            </p>
          </div>
          <ul className="details-container">
            <MoneyDetails
              moneyDetailsList={moneyDetailsList}
              income={income}
              expenses={expenses}
            />
          </ul>
          <div className="bottom-container">
            <form className="form-container" onSubmit={this.onAddTransaction}>
              <h1 className="add-transaction-heading">Add Transaction</h1>
              <label className="style-label" htmlFor="title">
                TITLE
              </label>
              <input
                className="style-input"
                id="title"
                placeholder="TITLE"
                onChange={this.onChangeTitleInput}
                value={titleInput}
              />

              <label className="style-label" htmlFor="amount">
                AMOUNT
              </label>
              <input
                className="style-input"
                id="amount"
                placeholder="AMOUNT"
                onChange={this.onChangeAmountInput}
                value={amountInput}
              />

              <label className="style-label" htmlFor="type">
                TYPE
              </label>
              <select
                className="style-input"
                id="type"
                onChange={this.onChangeOptionId}
                value={givenOption}
              >
                <option
                  value={transactionTypeOptions[0].optionId}
                  key={transactionTypeOptions[0].optionId}
                >
                  {transactionTypeOptions[0].displayText}
                </option>
                <option
                  value={transactionTypeOptions[1].optionId}
                  key={transactionTypeOptions[1].optionId}
                >
                  {transactionTypeOptions[1].displayText}
                </option>
              </select>
              <button type="submit" className="style-add-button">
                Add
              </button>
            </form>

            <div className="form-container his-container">
              <h1 className="add-transaction-heading">History</h1>
              <div className="history-box">
                <div className="style-top">
                  <p className="style-each-item">Title</p>
                  <p className="style-each-item">Amount</p>
                  <p className="style-each-item">Type</p>
                </div>
                <ul className="style-history-container">
                  {transactionList.map(eachTransaction => (
                    <TransactionItem
                      eachTransaction={eachTransaction}
                      onDeleteButton={this.onDeleteButton}
                      key={eachTransaction.itemId}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
