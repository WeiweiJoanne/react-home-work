
import axios from "axios"
import { useState } from "react"

const base_URL = import.meta.env.VITE_BASE_URL
const api_path = import.meta.env.VITE_API_PATH


function App() {

  const [isLogin, setIsLogin] = useState(false)

  const [account, setAccount] = useState({
    username: "",
    password: ""
  })

  const [card, setCard] = useState({}); // card 是空物件 {} → true

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setAccount({
      ...account,
      [name]: value
    })
  }
  const [productList, setProductList] = useState([])
  const handleFormSubmit = (e) => {
    e.preventDefault()
    axios.post(`${base_URL}/v2/admin/signin`, account)
      .then(res => {

        if (res.status === 200) {

          document.cookie = `hexToken=${res.data.token}; expires=${new Date(res.data.expired)}`;
          axios.defaults.headers.common['Authorization'] = res.data.token;

          axios.get(`${base_URL}/v2/api/${api_path}/admin/products`)
            .then(res => {
              console.log("🚀 ~ handleFormSubmit ~ res.data.products:", res.data.products)
              setProductList(res.data.products)
              setIsLogin(true)
            })
            .catch(err => console.log(err))


        } else {
          alert("登入失敗")
        }
      })
      .catch(err => alert("登入失敗"))
  }

  const checkUserLogin = () => {
    axios.post(`${base_URL}/v2/api/user/check`)
      .then(res=>alert("已登入"))
      .catch(err=>console.log("失敗"))
  }

  return (
    isLogin ? <div className="container">
      <div className="row justify-content-center">
        <div className="col-6">
          <button type="button" className="btn btn-success" onClick={checkUserLogin}>驗證登入</button>
          <h2>產品列表</h2>
          <table className="table">
            <thead>
              <tr>
                <th>產品名稱</th>
                <th>原價</th>
                <th>售價</th>
                <th>是否啟用</th>
                <th>查看細節</th>
              </tr>
            </thead>
            <tbody>
              {
                productList.map(product => (
                  <tr key={product.id}>
                    <th scope="row">{product.title}</th>
                    <td>{product.origin_price}</td>
                    <td>{product.price}</td>
                    <td>{product.is_enabled ? "是" : "否"}</td>
                    <td><button type="button" className="btn btn-primary" onClick={() => setCard(product)}>查看細節</button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className="col-6">
          <h2>單一產品細節</h2>
          {
            card.title ? (<div className="card">
              <img src={card.imageUrl} className="card-img-top primary-image" alt={card.title} />
              <div className="card-body">
                <h5 className="card-title">{card.title} <span className="badge bg-primary ms-2">{card.category}</span></h5>
                <p className="card-text">商品描述：{card.description}</p>
                <p className="card-text">商品內容：{card.content}</p>
                <div className="d-flex">
                  <p className="card-text text-secondary"><del>{card.origin_price}</del></p>
                  元 / {card.price} 元
                </div>
                <p className="card-text">更多圖片</p>

                <div className="d-flex flex-wrap">
                  {
                    card.imagesUrl?.map((image, i) => (
                      <img src={image} key={i} className="img-thumbnail" />
                    ))
                  }
                </div>
              </div>
            </div>) : (<p>請查看產品細節</p>)
          }

        </div>
      </div>
    </div> :
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="mb-5">請先登入</h1>
        <form className="d-flex flex-column gap-3" onSubmit={handleFormSubmit}>
          <div className="form-floating mb-3">
            <input type="email" name="username" className="form-control" onChange={handleInputChange} value={account.username} id="username" placeholder="name@example.com" />
            <label htmlFor="username">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" name="password" className="form-control" onChange={handleInputChange} value={account.password} id="password" placeholder="Password" />
            <label htmlFor="password">Password</label>
          </div>
          <button className="btn btn-primary">登入</button>
        </form>
        <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
      </div>
  )
}

export default App
