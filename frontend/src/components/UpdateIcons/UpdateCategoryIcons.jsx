import React, { useState } from 'react';
import axios from 'axios';
import './UpdateCategoryIcons.css';

const UpdateCategoryIcons = () => {
  const [cardIcon, setCardIcon] = useState(null);
  const [category, setCategory] = useState('');
  const [msg, setMsg] = useState('');

  const handleFileChange = (event) => {
    setCardIcon(event.target.files[0]);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('file', cardIcon);


      await axios.put(`http://localhost:3001/assessmentcards/upload/category/${category}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      setMsg(`Updated icon for category "${category}"`);
    } catch (error) {
      console.error('Error uploading file:', error);
      setMsg('Error uploading file');
    }
  };

  return (
    <div className='File-upload-form'>
      <form onSubmit={handleSubmit}>
        <p>Upload file (svg only):</p>
        <input  type="file" onChange={handleFileChange} />
        <select name="category" id="category" value={category} onChange={handleCategoryChange} >
            <option>Select a category</option>
            <option value="Who is assessed">Who is assessed</option>
            <option value="The assessor">The assessor</option>
            <option value="Assessment artefact">Assessment artefact</option>
            <option value="Assessment format">Assessment format</option>
            <option value="Context">Context</option>
            <option value="Assessment timing">Assessment timing</option>
        </select>
        <button className='Default-button' type="submit">Save</button>
      </form>
       <p>{msg}</p>
    </div>
  );
};

export default UpdateCategoryIcons;
