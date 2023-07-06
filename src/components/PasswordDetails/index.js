import {Component} from 'react'

import './index.css'

class PasswordDetails extends Component {
  onClickDeletePasswordButton = () => {
    const {eachPassword, deletePassword} = this.props
    const {id} = eachPassword
    deletePassword(id)
  }

  render() {
    const {eachPassword, showPasswords} = this.props
    const {website, username, password} = eachPassword

    // const maskedPassword = '*'.repeat(password.length)

    return (
      <li className="password-container">
        <div className="icon-container">
          <p className="starting-letter-icon"> {username[0]} </p>
          <div className="password-details-container">
            <p className="para-content"> {website} </p>
            <p className="para-content"> {username} </p>

            {showPasswords ? (
              <p className="para-content"> {password} </p>
            ) : (
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                alt="stars"
                className="stars-image"
              />
            )}
          </div>
        </div>

        <button
          type="button"
          className="delete-button"
          onClick={this.onClickDeletePasswordButton}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
            alt="delete"
            className="delete-icon"
          />
        </button>
      </li>
    )
  }
}

export default PasswordDetails
