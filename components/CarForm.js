import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { ReactSortable } from 'react-sortablejs';

function CarForm({ initialData, onSubmit }) {
  const [brand, setBrand] = useState(initialData?.brand || '');
  const [model, setModel] = useState(initialData?.model || '');
  const [version, setVersion] = useState(initialData?.version || '');
  const [odometer, setOdometer] = useState(initialData?.odometer || '');
  const [year, setYear] = useState(initialData?.year || '');
  const [vinNumber, setVinNumber] = useState(initialData?.vinNumber || '');
  const [price, setPrice] = useState(initialData?.price || '');
  const [photos, setPhotos] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState(initialData?.photos || []);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (initialData?.photos) {
      setExistingPhotos(initialData.photos);
    }
  }, [initialData]);

  const onDrop = useCallback((acceptedFiles) => {
    setPhotos((prevPhotos) => [
      ...prevPhotos,
      ...acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    ]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleRemovePhoto = (photo) => {
    setPhotos(photos.filter(p => p !== photo));
  };

  const handleRemoveExistingPhoto = (url) => {
    setExistingPhotos(existingPhotos.filter(photo => photo !== url));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      // Subir nuevas imágenes a Cloudinary
      const uploadedPhotos = await Promise.all(photos.map(async (photo) => {
        const formData = new FormData();
        formData.append('file', photo);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );
        return response.data.secure_url;
      }));

      const carData = { 
        brand, 
        model, 
        version, 
        odometer, 
        year, 
        vinNumber, 
        price,
        photos: [...existingPhotos, ...uploadedPhotos]
      };

      onSubmit(carData);
    } catch (error) {
      console.error('Error uploading image:', error.response ? error.response.data : error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form className="bg-gray-800 p-6 rounded-lg" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="brand">Brand</label>
        <input
          className="w-full p-2 rounded-lg bg-gray-700 text-white"
          type="text"
          id="brand"
          name="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="model">Model</label>
        <input
          className="w-full p-2 rounded-lg bg-gray-700 text-white"
          type="text"
          id="model"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="version">Version</label>
        <input
          className="w-full p-2 rounded-lg bg-gray-700 text-white"
          type="text"
          id="version"
          name="version"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="odometer">Odometer</label>
        <input
          className="w-full p-2 rounded-lg bg-gray-700 text-white"
          type="number"
          id="odometer"
          name="odometer"
          value={odometer}
          onChange={(e) => setOdometer(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="year">Year</label>
        <input
          className="w-full p-2 rounded-lg bg-gray-700 text-white"
          type="number"
          id="year"
          name="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="vinNumber">VIN Number</label>
        <input
          className="w-full p-2 rounded-lg bg-gray-700 text-white"
          type="text"
          id="vinNumber"
          name="vinNumber"
          value={vinNumber}
          onChange={(e) => setVinNumber(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="price">Price</label>
        <input
          className="w-full p-2 rounded-lg bg-gray-700 text-white"
          type="number"
          id="price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="photos">Photos</label>
        <div 
          {...getRootProps()} 
          className={`w-full p-2 rounded-lg bg-gray-700 text-white border-2 border-dashed ${isDragActive ? 'border-blue-500' : 'border-gray-500'} flex justify-center items-center cursor-pointer`}
        >
          <input {...getInputProps()} />
          {isDragActive ? <p>Drop the files here...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
        </div>
        <div className="mt-4">
          <ReactSortable list={existingPhotos} setList={setExistingPhotos} className="grid grid-cols-3 gap-2">
            {existingPhotos.map((photo, index) => (
              <div key={index} className="relative mb-2">
                <img src={photo} alt={`Existing photo ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => handleRemoveExistingPhoto(photo)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            ))}
          </ReactSortable>
          <ReactSortable list={photos} setList={setPhotos} className="grid grid-cols-3 gap-2">
            {photos.map((photo, index) => (
              <div key={index} className="relative mb-2">
                <img src={photo.preview} alt={`New photo ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(photo)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            ))}
          </ReactSortable>
        </div>
      </div>
      <button className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700" type="submit" disabled={uploading}>
        {initialData ? 'Update Car' : 'Add Car'}
      </button>
      {uploading && <p className="text-center text-white mt-2">Uploading...</p>}
    </form>
  );
}

export default CarForm;
