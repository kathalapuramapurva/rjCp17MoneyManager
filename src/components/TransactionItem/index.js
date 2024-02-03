import './index.css'

const TransactionItem = props => {
  const {eachTransaction, onDeleteButton} = props
  const {itemId, title, amount, type} = eachTransaction
  const onDelete = () => {
    onDeleteButton(itemId)
  }
  return (
    <li className="style-eachTransaction">
      <p className="style-each">{title}</p>
      <p className="style-each">Rs {amount}</p>
      <p className="style-each">{type}</p>

      <button
        className="style-delete-button"
        type="button"
        onClick={onDelete}
        data-testid="delete"
      >
        <img
          className="style-image"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default TransactionItem
