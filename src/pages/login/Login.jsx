import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png';
import { login, signUp } from '../../firbase';
import netflix_spinner from '../../assets/netflix_spinner.gif'

function Login() {

  const [signState, setSignState] = useState('Sign In');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (signState === "Sign In") {
      await login(email, password);
    }
    else {
      await signUp(name, email, password);
    }
    setLoading(false);
  }

  return (
    <>
      <div className="login">
        <img src={logo} className="login-logo" alt="" />
        <div className="login-form">
          <h1>{signState}</h1>
          <form>
            {signState === "Sign Up" ? (
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="your name"
              />
            ) : (
              <></>
            )}
            <input
              type="email"
              placeholder="your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassWord(e.target.value);
              }}
            />
            <button onClick={user_auth} type="submit">
              {signState}
            </button>
            <div className="form-help">
              <div className="remember">
                <input type="checkbox" />
                <label htmlFor="">Remember Me</label>
              </div>
              <p>Need help?</p>
            </div>
          </form>
          <div className="form-switch">
            {signState === "Sign In" ? (
              <p
                onClick={() => {
                  setSignState("Sign Up");
                }}
              >
                New to Netflix? <span>Sign Up Now</span>
              </p>
            ) : (
              <p>
                Already have account?{" "}
                <span
                  onClick={() => {
                    setSignState("Sign In");
                  }}
                >
                  Sign In Now
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login