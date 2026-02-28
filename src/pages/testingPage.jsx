
import { useState } from "react";
import toast from "react-hot-toast";
import MediaUpload from "../utilis/mediaUpload";


export default function TestingPage() {
  const [file, setFile] = useState(null);

  
  function handleFileUpload() {
    MediaUpload(file).then(url => {
      toast.success("File uploaded successfully: " + url);
    }).catch(error => {
      toast.error("Error uploading file: " + error);
    });

  }
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <input type="file" onChange={
        (e) => {
          setFile(e.target.files[0]);
        }
      } />
      <button onClick={handleFileUpload} className="bg-gray-700 text-white p-2 rounded-lg ">Upload File</button>

    </div>

  );
}