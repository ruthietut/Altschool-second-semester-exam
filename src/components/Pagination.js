import React from "react";
import "../App.css";
import classnames from "classnames";
import { usePagination, DOTS } from "./usePagination";
import "./pagination.scss";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }
  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames("pagination-container", {
        [className]: className,
      })}>
      {/* Left navigation arrow */}
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}>
        <div className="arrow " />
        <FaArrowLeft
          size={25}
          onMouseOver={({ target }) =>
            (target.style.color = "rgb(96, 142, 233)")
          }
          onMouseOut={({ target }) => (target.style.color = "black")}
        />
      </li>
      {paginationRange.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        // Render our Page Pills
        return (
          <li
            className={classnames("pagination-item", {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </li>
        );
      })}
      {/* Right Navigation arrow */}
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}>
        <div className="arrow " />
        <FaArrowRight
          size={25}
          onMouseOver={({ target }) =>
            (target.style.color = "rgb(96, 142, 233)")
          }
          onMouseOut={({ target }) => (target.style.color = "black")}
        />
      </li>
    </ul>
  );
};

export default Pagination;
