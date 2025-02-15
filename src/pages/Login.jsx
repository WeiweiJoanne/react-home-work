import axios from "axios"
import { useEffect, useState } from "react"

const base_URL = import.meta.env.VITE_BASE_URL

function LoginPage({ setIsLogin }) {
    const [account, setAccount] = useState({
        username: "",
        password: ""
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setAccount({
            ...account,
            [name]: value
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        axios.post(`${base_URL}/v2/admin/signin`, account)
            .then(res => {
                if (res.status === 200) {
                    document.cookie = `myToken=${res.data.token}; expires=${new Date(res.data.expired)}`;
                    axios.defaults.headers.common['Authorization'] = res.data.token;
                    // getProduct()
                    setIsLogin(true)
                } else {
                    alert("登入失敗")
                }
            })
            .catch(err => alert("登入失敗"))
    }

    const checkUserLogin = async () => {
        try {
            await axios.post(`${base_URL}/v2/api/user/check`)
            //   getProduct()
            setIsLogin(true)
        } catch (err) {
            console.log(err)
            // alert("登入失敗")
        }

    }

    useEffect(() => {
        const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/,
            "$1",
        );

        axios.defaults.headers.common['Authorization'] = token;
        checkUserLogin()
    }, [])
    return (
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

export default LoginPage