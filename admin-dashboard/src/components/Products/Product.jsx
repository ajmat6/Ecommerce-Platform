import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../reducers/productReducer";
import Modal from "../Modal/Modal";

function Product() {
  const dispatch = useDispatch();
  const myCategory = useSelector((state) => state.category);

  // defining states:
  const [name, setname] = useState("");
  const [quantity, setquantity] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");
  const [productPictures, setproductPictures] = useState([]);

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
  const handleAddProduct = (e) => {
    const form = new FormData();

    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", category);

    // appending product pics array in form:
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }

    dispatch(addProduct(form));

    // making add product form empty:
    setname("");
    setquantity("");
    setprice("");
    setdescription("");
    setproductPictures([]);
    setcategory("");
  };

  // function to handle array of product pics:
  const handleProductPics = (e) => {
    setproductPictures([
      ...productPictures, // spilliting / not changing current product pics if any and adding the added picture
      e.target.files[0],
    ]);
  };

  const renderProducts = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">S.NO</th>
            <th scope="col">Name</th>
            <th scope="col">Quantityy</th>
            <th scope="col">Price</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Product Pictures</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </table>
    );
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

        {/* Table to show Products  */}
        <div className="row my-4">
          <div className="col-md-12">
            {renderProducts()}
          </div>
        </div>
      </div>

      {/* Modal for adding category: Passing props to modal component */}

      <Modal
        modaltitle={"Add Product"}
        handleSubmit={handleAddProduct}
        add="Add Product"
      >
        {/* Body send to modal */}
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
          value={price}
          placeholder="Price"
          onChange={(e) => setprice(e.target.value)}
        />

        <input
          className="form-control my-3"
          type="text"
          value={description}
          placeholder="Add Description"
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

        {/* showing images of the product */}
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}> {JSON.stringify(pic.name)} </div>
            ))
          : null}
        <input
          type="file"
          name="productPictures"
          //  onChange={handleImage}
          placeholder="Choose Category Image"
          className="form-control my-2"
          onChange={handleProductPics}
        />
      </Modal>

      {/* <div
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
                value={price}
                placeholder="Price"
                onChange={(e) => setprice(e.target.value)}
              />

              <input
                className="form-control my-3"
                type="text"
                value={description}
                placeholder="Add Description"
                onChange={(e) => setdescription(e.target.value)}
              />

              <select
                className="form-control my-3"
                value={category}
                onChange={(e) => setcategory(e.target.value)}
              > */}
      {/* First option is itself 'Select Category' and the rest are rendered using createCategoryList function */}
      {/* <option value={0}>Select Category</option>
                {createCategoryList(myCategory.categories).map((value) => (
                  <option key={value.value} value={value.value}>
                    {value.name}
                  </option>
                ))}
              </select> */}

      {/* showing images of the product */}
      {/* {productPictures.length > 0
                ? productPictures.map((pic, index) => (
                    <div key={index}> {JSON.stringify(pic.name)} </div>
                  ))
                : null}
              <input
                type="file"
                name="productPictures"
                placeholder="Choose Category Image"
                className="form-control my-2"
                onChange={handleProductPics}
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
                onClick={handleAddProduct}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </Layout>
  );
}

export default Product;
