function Pagination({pageInfo,getProduct}) {
    const handlePageChange = (page) => {
        getProduct(page)
    }
    return (
        <div className="d-flex justify-content-center">
            <nav>
                <ul className="pagination">
                    <li className={`page-item ${!pageInfo.has_pre && 'disabled'}`} onClick={() => handlePageChange(pageInfo.current_page - 1)}>
                        <a className="page-link" href="#">
                            上一頁
                        </a>
                    </li>
                    {
                        Array.from({ length: pageInfo.total_pages }).map((e, i) => (
                            <li className={`page-item ${pageInfo.current_page === i + 1 && 'active'}`} key={i + 1} onClick={() => handlePageChange(i + 1)}>
                                <a className="page-link" href="#" >
                                    {i + 1}
                                </a>
                            </li>
                        ))
                    }
                    <li className={`page-item ${!pageInfo.has_next && 'disabled'}`} onClick={() => handlePageChange(pageInfo.current_page + 1)}>
                        <a className="page-link" href="#">
                            下一頁
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination;