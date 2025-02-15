import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Modal } from 'bootstrap';

const base_URL = import.meta.env.VITE_BASE_URL
const api_path = import.meta.env.VITE_API_PATH


function DelProductModal({ tempProduct, isOpen, setModalOpen,getProduct }) {
    const delProductModalRef = useRef(null)
    useEffect(() => {
        new Modal(delProductModalRef.current, {
            backdrop: false
        })
    }, [])

    useEffect(()=>{
        if(isOpen){
            const modalInstance = Modal.getInstance(delProductModalRef.current)
            modalInstance.show()
            
        }

    },[isOpen])

    const handleDeleteProduct = async () => {
        try {
            await deleteProduct()
            getProduct()
            handleCloseDelProductModal()
        } catch (err) {
            alert("刪除產品失敗")
        }
    }


    const deleteProduct = async () => {
        try {
            await axios.delete(`${base_URL}/v2/api/${api_path}/admin/product/${tempProduct.id}`)
        } catch (err) {
            console.log(err);
            alert("刪除產品失敗")
        }
    }

    const handleCloseDelProductModal = () => {
        const modalInstance = Modal.getInstance(delProductModalRef.current)
        modalInstance.hide()
        setModalOpen(false)
    }
    return (
        <div
            ref={delProductModalRef}
            className="modal fade"
            id="delProductModal"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">刪除產品</h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close" onClick={handleCloseDelProductModal}
                        ></button>
                    </div>
                    <div className="modal-body">
                        你是否要刪除
                        <span className="text-danger fw-bold">{tempProduct.title}</span>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                        >
                            取消
                        </button>
                        <button type="button" className="btn btn-danger" onClick={handleDeleteProduct} >
                            刪除
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DelProductModal