import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useReducer } from 'react';
import "./App.css";

function Home() {
  let navigate = useNavigate();
  function handleClick() {
    navigate('/termux')
  }
  function goAbout() {
    navigate('/about')
  }
  function goTools() {
    navigate('/tools')
  }
  return (
    <div className="home">
      <div className="home-top-nav">
        <button className="home-buttons" onClick={handleClick}>Blog</button>
        <button className="home-buttons" onClick={goTools}>Tools</button>
        <button className="home-buttons" onClick={goAbout}>About</button>
      </div>
      <img className="home-logo" src={require("./images/termux-photo.jpg")} alt="logo" />
      <h1 className="logo-name">quarks</h1>
      <button onClick={handleClick}>Learn Termux</button>
    </div>
  )
}

function Tools() {
  let navigate = useNavigate();
  function goCalculator() {
    navigate('/tools/calculator')
  }
  return (
    <div>
      <button onClick={goCalculator}>calculator</button>
    </div>
  )
}

function About() {
  return (
    <div>
      <h1
        style={
          {
            fontSize: 100,
          }
        }
      >
        About
      </h1>
    </div>
  )
}


function Posts() {
  return (
    <div className="whole-post">
      <img src={require("./images/termux-photo-100x100.jpg")} alt="termux-photo" />
    </div>
  )
}

export default function ABlogPost() {
  return (
    <div className="whole-blog">
      <div>
        <h1 className="blog-title">How To Termux - part one</h1>
        <h3 className="blog-section-1"> Introduction to Termux</h3>
        <img className="blog-images" src={require("./images/termux-photo.jpg")} alt="termux-photo" />
        <p className="blog-paragraph">
          Termux is by far the best Linux terminal emulator for Android.<br></br>
          It Comes in handy for Linux lovers letting them use tools in Terminal.<br></br>
          So to start with Termux it will be a good idea to update and upgrade<br></br>
          the packages repository.
        </p>
        <h3 className="blog-section-1">Updating and Upgrading the packages repository</h3>
        <p className="blog-paragraph">
          That can be done by typing the following commands in the terminal
          <h4 className="blog-command">apt update</h4>
          and then
          <h4 className="blog-command">apt upgrade</h4>
          click <Link to="/">here</Link> if you get errors on the above step.
        </p>
      </div>
      <div className="posts-list">
        <Posts />
        <Posts />
        <Posts />
        <Posts />
      </div>

    </div>
  )
}

function OperationButton({ dispatch, operation }) {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  )
}

function DigitButton({ dispatch, digit }) {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })
      }
    >
      {digit}
    </button>
  )
}

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}


function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        }
      }
      if (state.currentOperand == null) return state
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null }
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state)
      }
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "รท":
      computation = prev / current
      break
  }

  return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split('.')
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function Calculator() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  )
}


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="termux" element={<ABlogPost />} />
      <Route path="about" element={<About />} />
      <Route path="tools" element={<Tools />} />
      <Route path="tools/calculator" element={<Calculator />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

