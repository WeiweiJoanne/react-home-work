import { useState } from "react"


import LoginPage from "./pages/Login";
import ProductPage from "./pages/productPage";

function App() {

  const [isLogin, setIsLogin] = useState(false)

  // const [card, setCard] = useState({}); // card 是空物件 {} → true

  return (
    <>
      {
        isLogin ? <ProductPage setIsLogin={setIsLogin} /> : <LoginPage setIsLogin={setIsLogin}  />
      }
    </>
  )
}

export default App
