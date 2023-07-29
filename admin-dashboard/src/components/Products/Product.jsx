import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";

function Product() {
  const dispatch = useDispatch();
  const myCategory = useSelector((state) => state.category)

  // defining states:
  const [name, setname] = useState("");
  const [quantity, setquantity] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");
  const [productPictures, setproductPictures] = useState("");

  // creating a list of categories:
  const createCategoryList = (categories, option = []) => {
    for (let category of categories) {
      option.push({
        value: category._id,
        name: category.name,
      });

      if (category.children.length > 0) {
        createCategoryList(category.children, option);
      }
    }

    return option;
  };

  // function for handling submission of adding a category modal:
  const hadleCategorySelection = (e) => {
    // const form = new FormData(); // this provides an easy method to create key-value pairs of the form fiels and their input values which will make it easy to send them to backend
    // // console.log(categoryValues);
    // form.append('name', categoryName); // name is the key field in the postman that backend will access as req.body.name as the category name
    // form.append('parentId', parentCategoryId); // first is key and second is value same as like postman
    // form.append('categoryPic', categoryImage);
    // dispatch(addCategory(form));
  };

  return (
    <Layout sidebar>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3> Products </h3>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalCenter"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <ul>
              {/* category is one of the reducer in the store and categories is one of initialState values in categoryReducer */}
              {/* {renderCategories(category.categories)} */}
            </ul>
          </div>
        </div>
      </div>

      {/* Modal for adding category */}

      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Add New Category
              </h5>
              <button
                type="button"
                class="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body form-control">
              <input
                className="form-control my-3"
                type="text"
                value={name}
                placeholder="Product Name"
                onChange={(e) => setname(e.target.value)}
              />

              <input
                className="form-control my-3"
                type="number"
                value={quantity}
                placeholder="Product Quantity"
                onChange={(e) => setquantity(e.target.value)}
              />

              <input
                className="form-control my-3"
                type="number"
                value={productPictures}
                placeholder="Price"
                onChange={(e) => setprice(e.target.value)}
              />

              <input
                className="form-control my-3"
                type="text"
                value={description}
                placeholder="Product Name"
                onChange={(e) => setdescription(e.target.value)}
              />

              <select
                className="form-control my-3"
                value={category}
                onChange={(e) => setcategory(e.target.value)}
              >
                {/* First option is itself 'Select Category' and the rest are rendered using createCategoryList function */}
                <option value={0}>Select Category</option>
                {createCategoryList(myCategory.categories).map((value) => (
                  <option key={value.value} value={value.value}>
                    {value.name}
                  </option>
                ))}
              </select>

              {/* selecting image for the category */}
              <input
                type="file"
                name="categoryImage"
                //  onChange={handleImage}
                placeholder="Choose Category Image"
                className="form-control"
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Product;
