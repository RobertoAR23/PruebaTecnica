import React from 'react';

const Paginado = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

    return (
        <div className="flex justify-center mt-4">
            {pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    className={`mx-2 px-4 py-2 border mb-4 ${currentPage === pageNumber ? 'bg-red-800 text-white' : 'bg-red-300'
                        }`}
                    onClick={() => onPageChange(pageNumber)}
                >
                    {pageNumber}
                </button>
            ))}
        </div>
    );
};

export default Paginado;
