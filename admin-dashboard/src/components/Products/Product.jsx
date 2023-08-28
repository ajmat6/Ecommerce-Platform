import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, getallProducts } from "../../reducers/productReducer";
import Modal from "../Modal/Modal";
import './product.css'
import { generatePublicURL } from "../../urlConfig";

function Product() {
  const dispatch = useDispatch();
  const myCategory = useSelector((state) => state.category);
  const myProducts = useSelector((state) => state.product); 
  console.log(myProducts)

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

  const addProductModal = () => {
    return (
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
    )
  }

  const doNothing = () => {

  }

  const renderProducts = () => {
    return (
      <table className="table" style={{fontSize: '16px'}}>
        <thead>
          <tr>
            <th scope="col">S.NO</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            {/* <th scope="col">Product Pictures</th> */}
          </tr>
        </thead>
        <tbody>
          {
            myProducts.products.length > 0 ?
            myProducts.products.map((product) => 
              <tr style={{cursor: 'pointer'}} key={product._id} data-bs-toggle="modal"
              data-bs-target={`#productModal-${product._id}`} >
                <th scope="row">1</th>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                {/* <td>{product.description}</td> */}
                <td>{product.category ? product.category.name : <div>--</div>}</td>
                {/* <td>--</td> */}
              </tr>
            ) : null
          }

          {/* Product Details Modals: Here Model component is used as it needs differnt id each time otherwise for add product also this model will open */}
          {myProducts.products.map((product) => (
              <div class="modal fade modal-lg" id={`productModal-${product._id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id={`productModal-${product._id}`}>Product Details</h5>
                            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body form-control">
                            
                            {/* {product details} */}
                            <div className="row">
                              <div className="col-md-6 my-2">
                                <span>
                                  <label className="productLabel">Name</label>
                                  <p className="productLabelDetails">{product.name}</p>
                                </span>
                              </div>

                              <div className="col-md-6 my-2">
                                <span>
                                  <label className="productLabel">Price</label>
                                  <p className="productLabelDetails">{product.price}</p>
                                </span>
                              </div>

                              <div className="col-md-6 my-2">
                                <span>
                                  <label className="productLabel">Quantity</label>
                                  <p className="productLabelDetails">{product.quantity}</p>
                                </span>
                              </div>

                              <div className="col-md-12 my-2">
                                <span>
                                  <label className="productLabel">Description</label>
                                  <p className="productLabelDetails">{product.description}</p>
                                </span>
                              </div>

                              <div className="col-md-6 my-2">
                                <span>
                                  <label className="productLabel">Category</label>
                                  <p className="productLabelDetails">{product.category ? product.category.name : <div>--</div>}</p>
                                </span>
                              </div>

                              <div className="col-md-12 my-2">
                                <span style={{display: 'flex', flexDirection: 'column'}}>
                                  <label className="productLabel">Product Pictures</label>
                                  <div style={{display: 'flex', gap: '20px', marginTop: '9px'}}>
                                    {product.productPic.map(pic => 
                                      <div className="productImage">
                                        {/* pic.img is img that you used in the product model */}
                                        {/* product image url is fetched using below function */}
                                        <img src={generatePublicURL(pic.img)} /> 
                                      </div>
                                    )}

                                  </div>
                                </span>
                              </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button> */}
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={doNothing}>OK</button>
                        </div>
                    </div>
                </div>
            </div>            
          ))}

        </tbody>
      </table>
    );
  };

  return (
    <Layout sidebar="true">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3> Products </h3>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalCenter"
                onClick={addProductModal}
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

      {/* Modal for adding category */}
      {addProductModal()}
    </Layout>
  );
}

export default Product;
