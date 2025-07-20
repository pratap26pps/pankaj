import React, { useState } from 'react';

function CrauselUploader() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [cardType, setCardType] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setPreview(null);
        }
    };

 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !cardType) return;

        const formData = new FormData();
        formData.append('photo', file);
        formData.append('cardType', cardType);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                alert('File uploaded successfully!');
            } else {
                alert('Upload failed.');
            }
        } catch (error) {
            alert('Error uploading file.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen ">
            <h1 className="text-3xl font-bold text-center  text-gray-800">Crausel Management</h1>
            <form
                onSubmit={handleSubmit}
                className="flex justify-center items-center flex-1"
            >
                <div className="bg-white rounded-xl shadow-lg p-8 -mt-30 w-full max-w-md">
                    <h2 className="text-xl font-semibold mb-6 text-gray-700">Upload Crausel Photo</h2>
                   
                    <div className="mb-5">
                        <label className="block mb-2 font-medium text-gray-600">Photo:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                            className="w-full"
                        />
                    </div>
                    {preview && (
                        <div className="mb-5 text-center">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-48 mx-auto rounded-lg mt-2 shadow"
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={!file}
                        className={`w-full py-2 rounded-md font-semibold text-white transition-colors ${
                            !file
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        Upload
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CrauselUploader;