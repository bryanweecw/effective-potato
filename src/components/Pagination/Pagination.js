import React, {useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({pageNumber, info, updatePageNumber}) => {
    let pageChange = (data) =>{
        updatePageNumber(data.selected +1)
    }; // main function to change page here -> updates api
    const [width, setWidth] = useState(window.innerWidth); //statehook to set pagination width
    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }; // define function updateDimensions to be called in useeffect hook
    useEffect(()=>{
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []); //useeffect hook to allow for responsive pagination component (resizes with )
    return(
        <><style jsx>{`
            a{ 
                color: white;
                text-decoration: none;
            }
            @media (max-width: 768px){
                .pagination {font-size: 12px}

                .next,
                .prev {display: none}
            }
            @media (max-width: 768px){
                .pagination {font-size: 14px}
            }
        `}
            </style>
        <ReactPaginate
            forcePage={pageNumber === 1 ? 0 : pageNumber - 1}
            marginPagesDisplayed={width < 576 ? 1 : 2}
            pageRangeDisplayed={width < 576 ? 1 : 2}
            pageCount={info?.pages}
            onPageChange={pageChange} //something like onClick, tells paginate component what to do
            className="pagination justify-content-center my-4 gap-4"
            nextLabel="Next"
            previousLabel="Prev"
            previousClassName="btn btn-primary fs-5 prev"
            nextClassName="btn btn-primary fs-5 next"
            activeClassName="active"
            pageClassName="page-item"
            pageLinkClassName="page-link"
        />
            </>
    )
}

export default Pagination;