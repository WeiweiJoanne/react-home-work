import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Modal } from 'bootstrap';

const base_URL = import.meta.env.VITE_BASE_URL
const api_path = import.meta.env.VITE_API_PATH


import Pagination from "../components/Pagination"
import ProductModal from "../components/ProductModal"
import DelProductModal from "../components/DelProductModal"

function ProductPage({ }) {

    const [pageInfo, setPageInfo] = useState({})
    const getProduct = async (page = 1) => {
      try {
        const res = await axios.get(`${base_URL}/v2/api/${api_path}/admin/products?page=${page}`)
        setProductList(res.data.products)
        setPageInfo(res.data.pagination)
        // setIsLogin(true)
      } catch (err) {
        console.log(err)
      }
  
    }

    useEffect(()=>{
        getProduct()
    },[])



    const defaultModalState = {
        imageUrl: "",
        title: "",
        category: "",
        unit: "",
        origin_price: "",
        price: "",
        description: "",
        content: "",
        is_enabled: 0,
        imagesUrl: [""]
    };

    const [tempProduct, setTempProduct] = useState(defaultModalState)

    const [productList, setProductList] = useState([])
    const [isProductModalOpen, setProductModalOpen] = useState(false)
    const [isDelProductModalOpen, setDelProductModalOpen] = useState(false)


    const [modalMode, setModalMode] = useState(null)
    const handleOpenProductModal = (mode, product) => {
        setModalMode(mode)

        switch (mode) {
            case "create":
                setTempProduct(defaultModalState)
                break;
            case "edit":
                setTempProduct(product)
                break;
            default:
                break;
        }

        // const modalInstance = Modal.getInstance(productModalRef.current)
        // modalInstance.show()
        setProductModalOpen(true)
    }
    const handleOpenDelProductModal = (product) => {
        setTempProduct(product)
        // const modalInstance = Modal.getInstance(delProductModalRef.current)
        // modalInstance.show()
        setDelProductModalOpen(true)
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="d-flex justify-content-between">
                            <h2>產品列表</h2>
                            <button type="button" className="btn btn-primary" onClick={() => handleOpenProductModal('create')}>建立新的產品</button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>產品名稱</th>
                                    <th>原價</th>
                                    <th>售價</th>
                                    <th>是否啟用</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productList.map(product => (
                                        <tr key={product.id}>
                                            <th scope="row">{product.title}</th>
                                            <td>{product.origin_price}</td>
                                            <td>{product.price}</td>
                                            <td>{product.is_enabled ? (<span className="text-success">啟用</span>) : (<span>未啟用</span>)}</td>
                                            <td>
                                                {/* <button type="button" className="btn btn-primary" onClick={() => setCard(product)}>查看細節</button> */}

                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => handleOpenProductModal('edit', product)}>編輯</button>
                                                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleOpenDelProductModal(product)}>刪除</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <Pagination pageInfo={pageInfo} getProduct={getProduct} />

                </div>
            </div>

          <ProductModal modalMode={modalMode} tempProduct={tempProduct} isOpen={isProductModalOpen} setModalOpen={setProductModalOpen} getProduct={getProduct}/>

          <DelProductModal tempProduct={tempProduct} isOpen={isDelProductModalOpen} setModalOpen={setDelProductModalOpen} getProduct={getProduct}/>
        </>

    )
}

export default ProductPage;