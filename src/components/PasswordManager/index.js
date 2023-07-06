import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import NoPasswords from '../NoPasswords'

import PasswordDetails from '../PasswordDetails'

class PasswordManager extends Component {
  state = {
    listOfPasswords: '',
    passwordCount: 0,
    website: '',
    username: '',
    password: '',
    showPasswords: false,
    searchInput: '',
    fullPasswordList: '',
  }

  onClickAddButton = event => {
    event.preventDefault()

    const {website, username, password} = this.state

    const newPasswordDetails = {
      id: uuidv4(),
      website,
      username,
      password,
    }

    this.setState(prevState => ({
      listOfPasswords: [...prevState.listOfPasswords, newPasswordDetails],
      website: '',
      username: '',
      password: '',
      passwordCount: prevState.passwordCount + 1,
    }))
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickShowPasswords = () => {
    this.setState(prevState => ({showPasswords: !prevState.showPasswords}))
  }

  deletePassword = id => {
    const {listOfPasswords} = this.state
    const updatedPasswordsList = listOfPasswords.filter(each => each.id !== id)
    this.setState({listOfPasswords: updatedPasswordsList})
  }

  onSearchPassword = event => {
    const {listOfPasswords, fullPasswordList} = this.state

    this.setState({
      searchInput: event.target.value,
    })

    let filteredPasswordsList
    if (event.target.value === '') {
      this.setState({listOfPasswords: fullPasswordList})
    } else if (event.target.value !== '') {
      this.setState(prevState => ({
        fullPasswordList: [...prevState.listOfPasswords],
      }))
      filteredPasswordsList = listOfPasswords.filter(eachPassword =>
        eachPassword.website
          .toLowerCase()
          .includes(event.target.value.toLowerCase()),
      )

      if (filteredPasswordsList.length <= 0) {
        this.setState(prevState => ({
          fullPasswordList: [...prevState.listOfPasswords],
          listOfPasswords: '',
        }))
      } else if (filteredPasswordsList.length > 0) {
        this.setState(prevState => ({
          fullPasswordList: [...prevState.listOfPasswords],
          listOfPasswords: filteredPasswordsList,
        }))
      }
    }
    // else if (event.target.value === '') {
    //   this.setState({listOfPasswords: fullPasswordList})
    // }
  }

  render() {
    const {
      website,
      username,
      password,
      listOfPasswords,
      passwordCount,
      showPasswords,
      searchInput,
    } = this.state

    let Result
    if (listOfPasswords.length > 0) {
      Result = listOfPasswords.map(eachPassword => (
        <PasswordDetails
          key={eachPassword.id}
          eachPassword={eachPassword}
          showPasswords={showPasswords}
          deletePassword={this.deletePassword}
        />
      ))
    }

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="first-container">
          <div className="add-new-password-container">
            <h1 className="add-new-password-heading"> Add New Password </h1>
            <form className="form-container">
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="website-image"
                />
                <input
                  type="text"
                  className="input-box"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsite}
                  value={website}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="website-image"
                />
                <input
                  type="text"
                  className="input-box"
                  placeholder="Enter Username"
                  onChange={this.onChangeUserName}
                  value={username}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="website-image"
                />
                <input
                  type="password"
                  className="input-box"
                  placeholder="Enter Password"
                  onChange={this.onChangePassword}
                  value={password}
                />
              </div>
              <button
                type="submit"
                className="add-button"
                onClick={this.onClickAddButton}
              >
                {' '}
                Add{' '}
              </button>
            </form>
          </div>
          <div className="password-manager-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt=" password manager"
              className="password-manager-lg-image"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt=" password manager"
              className="password-manager-sm-image"
            />
          </div>
        </div>

        <div className="second-container">
          <div className="your-passwords-container">
            <div className="passwords-title-container">
              <h1 className="your-passwords"> Your Passwords </h1>
              <p className="passwords-count"> {passwordCount} </p>
            </div>

            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-image"
              />
              <input
                type="search"
                value={searchInput}
                className="input-search"
                placeholder="Search"
                onChange={this.onSearchPassword}
              />
            </div>
          </div>
          <hr className="horizontal-rule" />
          <div className="show-passwords-container">
            <input
              type="checkbox"
              id="showPasswords"
              className="checkbox"
              onClick={this.onClickShowPasswords}
            />
            <label htmlFor="showPasswords" className="show-passwords-text">
              Show Passwords
            </label>
          </div>

          {listOfPasswords.length > 0 ? (
            <ul className="unordered-list-container"> {[Result]} </ul>
          ) : (
            <NoPasswords />
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
