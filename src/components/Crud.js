// src/components/Crud.js
import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';

const Crud = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [inStock, setInStock] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await firestore.collection('items').get();
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId) {
      await firestore.collection('items').doc(currentId).update({ name, description, quantity, inStock });
    } else {
      await firestore.collection('items').add({ name, description, quantity, inStock });
    }
    setCurrentId(null);
    setName('');
    setDescription('');
    setQuantity(0);
    setInStock(false);
  };

  const handleEdit = (item) => {
    setCurrentId(item.id);
    setName(item.name);
    setDescription(item.description);
    setQuantity(item.quantity);
    setInStock(item.inStock);
  };

  const handleDelete = async (id) => {
    await firestore.collection('items').doc(id).delete();
  };

  return (
    <div>
      <h2>CRUD Operations</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Name" 
        />
        <input 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Description" 
        />
        <input 
          type="number" 
          value={quantity} 
          onChange={(e) => setQuantity(Number(e.target.value))} 
          placeholder="Quantity" 
        />
        <label>
          In Stock:
          <input 
            type="checkbox" 
            checked={inStock} 
            onChange={(e) => setInStock(e.target.checked)} 
          />
        </label>
        <button type="submit">{currentId ? 'Update' : 'Add'}</button>
      </form>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - {item.description} - {item.quantity} - {item.inStock ? 'Yes' : 'No'}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Crud;
