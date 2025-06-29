import React, { useState } from 'react';

const UploadSection = () => {
  const [files, setFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!files) return;

    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });

    await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
  };

  return (
    <div>
      <h2>Upload CSV/XLSX Files</h2>
      <input type="file" multiple accept=".csv,.xlsx" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadSection;
