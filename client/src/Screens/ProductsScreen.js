import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveProduct, listProducts, deleteProduct } from '../actions/Product';

const ProductsScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, SetId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [Sex, setSex] = useState('');
  const [countInStock, setCountInStock] = useState('');
const [Wishlist,setWishlist]=useState(false);
  const productList = useSelector((state) => state.productList);

  const { loading, products, error } = productList;
  const userData = useSelector((state) => state.userData);
  const { user } = userData;
  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;
  const productDelete = useSelector((state) => state.productDelete);
  const {
  //  loading: loadingDelete,
    success: successDelete,
    //error: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      props.history.push('/signin');
    }

    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave, successDelete]);
  const openModal = (product) => {
    setModalVisible(true);
    SetId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setDescription(product.description);
    setSex(product.Sex);
    setWishlist(product.Wishlist);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        category,
        description,
        Sex,
        brand,
        image,
        countInStock,
      
        Wishlist

      })
    );
  };
  const DeleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  };
  return (
    <div className='content content-margined'>
      <div className='product-header'>
        <h3>Products</h3>
        <button className='button primary' onClick={() => openModal({})}>
          Create Product
        </button>
      </div>
      {modalVisible && ( 
        <div className='form'>
          <form onSubmit={submitHandler}>
            <ul className='form-container'>
              <li>
                <h2>Create Product</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>
              <li>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor='price'>Price</label>
                <input
                  type='text'
                  name='price'
                  id='price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor='image'>Image</label>
                <input
                  type='text'
                  name='image'
                  id='image'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor='Sex'>Sex</label>
                <input
                  type='text'
                  name='Sex'
                  id='Sex'
                  value={Sex}
                  onChange={(e) => setSex(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor='brand'>Brand</label>
                <input
                  type='text'
                  name='brand'
                  id='brand'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor='counInStock'>countInStock</label>
                <input
                  type='text'
                  name='countInStock'
                  id='countInStock'
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor='category'>Category</label>
                <input
                  type='text'
                  name='category'
                  id='category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor='description'>Description</label>
                <textarea
                  name='description'
                  id='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor='Wishlist'>Wishlist</label>
                <input
                type='boolean'
                  name='Wishlist'
                  id='Wishlist'
                  value={Wishlist}
                  onChange={(e) => setWishlist(e.target.value)}
                />
              </li>




              <li>
                <button type='submit' className='button primary'>
                  {id ? 'Update' : 'Create'}
                </button>
              </li>
              <li>
                <button
                  type='button'
                  onClick={() => setModalVisible(false)}
                  className='button secondrey'
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      <div className='product-list'>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button className='button' onClick={() => openModal(product)}>
                    Edit
                  </button>{' '}
                  <button
                    className='button'
                    onClick={() => DeleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsScreen;
