import React, { useState, useEffect, useMemo } from "react";
//import { Link } from "react-router-dom";
import { Button, Select, FormControl, InputLabel, MenuItem, Pagination, TextField } from "@mui/material";
import { defaultFilter } from "../constant/constant";
import categoryService from "../services/categoryService";
import bookService from "../services/bookService";
import './BookListing.css'
import { useAuthContext } from "../context/auth";
import { useCartContext } from "../context/cart";
import shared from "../utils/shared";
import {toast} from"react-toastify"

const BookList = () => {    
  const [bookResponse, setBookResponse] = useState({
      pageIndex: 0,
      PageSize: 10,
      totalPages: 1,
      items: [],
      totalItems: 0,
  });
  const [categories, setCategories] = useState([]);
  const[sortBy, setSortBy] = useState(); 
  const [filters, setFilters] = useState(defaultFilter);
  const authContext = useAuthContext();
const cartContext = useCartContext(); 

  useEffect(() => {
      getAllCategories();
  }, []);

  const getAllCategories = async () => {
      await categoryService.getAll().then((res) => {
          if (res) {
              setCategories(res);
          }
      })
  }

  useEffect(() => {
      const timer = setTimeout(() => {
          if (filters.keyword === "") delete filters.keyword
          searchAllBooks({ ...filters});
      }, 500);
      return () => clearTimeout(timer);
  }, [filters])

  const searchAllBooks = (filters) => {
      bookService.getAll(filters).then((res) => {
          setBookResponse(res);
          console.log(res) 
      });
  }
  const books = useMemo(() => {
      const bookList = [...bookResponse.items];
      if(bookList) {
          bookList.forEach((element) => {
              element.category = categories.find(
                  (a) => a.id === element.categoryId
              )?.name;
      });
      return bookList;
      }
      return []; 
  }, [categories, bookResponse]);

  const addToCart = (book) => {
      shared
        .addToCart(book, authContext.user.id)
        .then((res) => {
          if (res.error) {
            toast.error(res.message,{theme:"colored"});
          } else {
            cartContext.updateCart();
            toast.success(res.message,{theme:"colored"});
          }
        })
        .catch((err) => {
          toast.warning(err,{theme:"colored"});
        });
    };
  
  return(
      <>
      <div className="book-list">
          <div className="bl-container-center">
              <h1>
                  Book Listing
              </h1>

          </div>
          
          <div className="bl-container-main">
              <div className="bl-container-mini-head">

                  <div className="bl-container-bookcount">
                      <h3 
                          className="txt-lb"
                      >
                          Total Items - {bookResponse.totalItems} {}
                      </h3>
                  </div>
              
                  <div className="bl-container-search-sort">

                      <div className="bl-container-search">
                          <TextField
                              id="outlined-basic" 
                              placeholder='Search here &#x1F50E;' 
                              variant="outlined" 

                              name="text"
                              onChange={(e) => {
                                  setFilters({
                                      ...filters,
                                      keyword: e.target.value,
                                      pageIndex: 1
                                  })
                              }}
                          />
                      </div>

                  </div>
              </div>

              <div className="bl-wrapper">
                  <div className="bl-inner-wrapper">

                      {books.map((book, index) => (

                          <div className="bl-card" key={index}>
                              
                              <div className="bl-img">
                                  <img
                                      src={book.base64image}
                                      className="bl-imgtag"
                                      alt={book.name}
                                  />
                              </div>

                              <div className="bl-content">

                                  <div className="bl-name txt-41" title={book.name}>
                                      <h2> {book.name} </h2>
                                  </div>

                                  <div className="bl-category">
                                      <p> {book.category} </p>
                                  </div>

                                  <div className="bl-descreption">
                                      <p> {book.description} </p>
                                  </div>

                                  <div className="bl-price">
                                      <p> MRP: {book.price} </p>
                                  </div>

                                  <div className="bl-cart-btn">
                                      <Button
                                          variant="contained"
                                          className="bg-f14d54 f1-btn-hover"
                                          onClick={()=>addToCart(book)}
                                      >
                                          Add to Cart
                                      </Button>
                                  </div>

                              </div>
                          </div>                            
                      ))}

                  </div>
              </div>

              <div className="bl-pagination-wrapper">
                  <Pagination
                      count = {bookResponse.totalPages} 
                          // ------------- howmany pages
                      page = {filters.pageIndex} 
                          // -------------------- current page
                      onChange = {(e,newPage) => { 
                          // ------------------  to update value of pageIndex when user changes a page
                          setFilters({ ...filters, pageIndex: newPage});
                      }}
                  />
              </div>
          </div>

          </div>

      </>
  );
}

export default BookList;
