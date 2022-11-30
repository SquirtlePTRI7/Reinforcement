import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios";

const CLIENT_ID = "495bf5042e784e5962a5"

export const App = () => {
  const [rerender, setRerender] = useState(false)
  const [userData, setUserData] = useState({})

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const codeParam = urlParams.get("code")

    if(codeParam && localStorage.getItem("accessToken") === null) {
      async function getAccessToken() {
        await fetch("http://localhost:3000/getAccessToken?code=" + codeParam, {
          method: "POST"
        }).then((res) => {
          return res.json()
        }).then((data) => {
          console.log(data)
          if (data) {
            localStorage.setItem("accessToken", data)
            setRerender(!rerender)
          }
        }).catch(err => {
          console.log("fetch getAccessToken error...", err)
        })
      }
      getAccessToken()
    }

  }, []);

      async function getUserData() {
      await fetch("http://localhost:3000/getUserData", {
        method: "GET",
        headers: {
        "Authorization": "Bearer " + localStorage.getItem("accessToken")
      }
      }).then((res) => {
        return res.json()
      }).then((data) => {
        console.log(data)
        setUserData(data)
    })
    }
 

  function loginWithGithub() {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID)
  }

  return (
    <div>
      {localStorage.getItem("accessToken") ? 
        <>
        <button onClick={() => {localStorage.removeItem("accessToken")}}>
          Log out
        </button>
        <h3>Get user data from GitHub api</h3>
        <button onClick={getUserData}>Get user data</button>
       
        </>
      :
        <>
        <h3>User is not logged in</h3>
        <button onClick={loginWithGithub}>
          Login with GitHub
        </button>
        </>
      
    }
      
    </div>
  )
}
