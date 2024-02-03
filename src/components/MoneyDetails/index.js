import './index.css'

const MoneyDetails = props => {
  const {moneyDetailsList, income, expenses} = props
  return (
    <>
      <li
        className={`each-money-details-container ${moneyDetailsList[0].className}`}
      >
        <img
          className="style-money-image"
          src={moneyDetailsList[0].imgUrl}
          alt="balance"
        />
        <div className="money-details">
          <p className="money-heading">{moneyDetailsList[0].heading}</p>
          <p className="money" data-testid="balanceAmount">
            Rs {income - expenses}
          </p>
        </div>
      </li>

      <li
        className={`each-money-details-container ${moneyDetailsList[1].className}`}
      >
        <img
          className="style-money-image"
          src={moneyDetailsList[1].imgUrl}
          alt="income"
        />
        <div className="money-details">
          <p className="money-heading">{moneyDetailsList[1].heading}</p>
          <p className="money" data-testid="incomeAmount">
            Rs {income}
          </p>
        </div>
      </li>

      <li
        className={`each-money-details-container ${moneyDetailsList[2].className}`}
      >
        <img
          className="style-money-image"
          src={moneyDetailsList[2].imgUrl}
          alt="expenses"
        />
        <div className="money-details">
          <p className="money-heading">{moneyDetailsList[2].heading}</p>
          <p className="money" data-testid="expensesAmount">
            Rs {expenses}
          </p>
        </div>
      </li>
    </>
  )
}
export default MoneyDetails
