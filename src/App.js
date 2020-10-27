import { useEffect, useState } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

function App() {

  const [firstName, setFirstName] = useState(["Mark", "Sydney", "Victor", "Peter", "Steven", "Carla", "Nancy", "John", "Carlos", "Maryann"])
  const [checked, setChecked] = useState(false)
  const [secondListOfNames, setSecondListOfNames] = useState([])
  const [sortedLeft, setSortedLeft] = useState(false)
  const [sortedRight, setSortedRight] = useState(false)
  const [searchLeft, setSearchLeft] = useState()
  const [searchRight, setSearchRight] = useState()

  const RightButtonClicked = (name) => () => {
    let newList = secondListOfNames.concat(name)
    setSecondListOfNames(newList)
    setFirstName(firstName.filter(item => item !== name))
  }

  const LeftButtonClicked = (name) => () => {
    let newList = firstName.concat(name)
    setFirstName(newList)
    setSecondListOfNames(secondListOfNames.filter(item => item !== name))
  }

  // Does NOT work as intended
  useEffect(() => {
    let newList = firstName.sort()
    setFirstName(newList)
  }, [sortedLeft])

  // Does NOT work as intended
  useEffect(() => {
    let newList = secondListOfNames.sort()
    setSecondListOfNames(newList)
  }, [sortedRight])

  const LeftSortButtonClicked = () => {
    setSortedLeft(true)
  }

  const RightSortButtonClicked = () => {
    setSortedRight(true)
  }

  const SearchTextLeft = (e) => {
    setFirstName(firstName.filter(item => item.toLowerCase().startsWith(e)))
  }

  const SearchTextRight = (e) => {
    setSecondListOfNames(secondListOfNames.filter(item => item.toLowerCase().startsWith(e)))
  }

  return (
    <div className = "App">
      <h1 className = "header">Move items from one list to another</h1>

      <div className = "container">
        <div className = "list left-list">
          <div className = "sort-search">
            <div className = "sort-button">
              <Button variant = "text" color = "default" onClick = {() => LeftSortButtonClicked()}>Sort list</Button>
            </div>
            <div className = "search-input">
              <input type = "text" placeholder = "Type to search" onChange = {e => SearchTextLeft(e.target.value.toLowerCase())} />
            </div>
          </div>
          {firstName.length === 0 ? "The list is empty" : firstName.map((item) => <p className = "fName">{item}</p>)}
        </div>

        <div className = "arrows">
          <div className = "move-button">
            <Button variant = "contained" color = "primary" onClick = {RightButtonClicked(firstName[0])}>Move right</Button>
          </div>
          <div className = "move-button">
            <Button variant = "contained" color = "primary" onClick = {LeftButtonClicked(secondListOfNames[0])}>Move left</Button>
          </div>
        </div>

        <div className = "list right-list">
          <div className = "sort-search">
            <div className = "sort-button">
              <Button variant = "text" color = "default" onClick = {() => RightSortButtonClicked()}>Sort list</Button>
            </div>
            <div className = "search-input">
              <input type = "text" placeholder = "Type to search" onChange = {e => SearchTextRight(e.target.value.toLowerCase())}/>
            </div>
          </div>
          {secondListOfNames.length === 0 ? "The list is empty" : secondListOfNames.map((item) => <p className = "fName">{item}</p>)}
        </div>
      </div>

      <p className = "author">Practice app made by Juha Karjalainen</p>
    </div>
  );
}

export default App;