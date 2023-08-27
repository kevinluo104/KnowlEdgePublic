import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setResourceTextAsync, getResourceTextAsync, setMainModeAsync, getMainModeAsync } from '../ResourcePage/redux/thunks';
import { async } from '@firebase/util';



const ViewStyled = styled.div`

.text-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 0px;
  margin-left: -2%;
  margin-right: 0%;
}



h3 {
  margin-right: 10px;
}

button {
  background-color: white;
  color: black;
  border: 1px solid #0074d9;
  border-radius: 5px;
  padding: 0 3px;
  height: 50px;
  width: 300px;
}

button:hover {
  background-color: #0074d9;
  color: white;
}

.dropzone {
  width: 600px;
  height: 200px;
  border: 2px dashed black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-left: 34%;
  margin-top: 15px;
}

  .upload {
    margin-left: 34%;
  }
`;


const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const { courseTitle, resourceName } = useParams();
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [submissionMode, setSubmissionMode] = useState('PDF');
  const [text, setText] = useState("");
  const [image, setImage] = useState('');
  const [allImages, setAllImages] = useState('');
  const dispatch = useDispatch();
  const textResource = useSelector((state) => state.resourceTextReducer.text);
  const instructorBoolean = useSelector((state) => state.user.currentUser.instructor);
  //const [mode, setMode] = useState("");
  const mode = useSelector((state) => state.MainModeReducer.mode);
  

  console.log("FFSSSFSA", instructorBoolean);

  const handleFileSelect = (files) => {
    setSelectedFile(files[0]);
    setSelectedFileName(files[0].name);
  };

  const fetchPDF = async () => { // FROM CHATGPT
    try {
      const response = await axios.get('http://localhost:3005/courseDocuments/file', {
        responseType: 'blob', 
        params: {
          courseTitle: courseTitle,
          resourceName: resourceName,
        },
      }).catch ((err) => console.log("PDF File DNE yet"));
      setPdfUrl(URL.createObjectURL(response.data));
    } catch (e) {
      console.log('PDF File DNE yet');
    }
  };

  const fetchData = async () => {
    try {
    let res = await fetch(`http://localhost:3005/image/${courseTitle}/${resourceName}`, {
      method: "GET",
    }).then((res) => res.json()).then((data) => {
     // console.log("HEAAA", data);
      setAllImages(data.data);
    }).catch((err) => console.log("Image File DNE yet"))
  } catch (e) {
    console.log('Image File DNE yet')
  }
  };

  const fetchMode = async () => {
    const res = await dispatch(getMainModeAsync({courseTitle, resourceName}));
    console.log("GSDGSDG", res);

  }

  useEffect(() => {
    fetchPDF();
    fetchMode();
    try {
      console.log("TRYING");
      setText(dispatch(getResourceTextAsync({courseTitle, resourceName})).text);
    } catch (e) {
      console.log("Text DNE yet");
    }
   
  }, [mode]);

  useEffect(() => {
    fetchData();
    try {
   // if (submissionMode == 'Text') {
    console.log("TRYING2");
      setText(dispatch(getResourceTextAsync({ courseTitle, resourceName })).text); 
   // }
  } catch (e) {
    console.log("Text DNE yet");
  }
  }, [submissionMode]);

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('courseTitle', courseTitle); 
      formData.append('resourceName', resourceName);
     
      
      const response = await axios.post('http://localhost:3005/courseDocuments/upload', formData);
      alert('File uploaded successfully!');
      
      const pdfResponse = await axios.get('http://localhost:3005/courseDocuments/file', {
        responseType: 'blob', 
        params: {
          courseTitle: courseTitle,
          resourceName: resourceName,
        },
      });
      setPdfUrl(URL.createObjectURL(pdfResponse.data));
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file.');
    }
  };



  const handleImageUpload = () => {
//console.log("HI",imageTEST);
setImage('');
console.log("1234");
fetch('http://localhost:3005/image/upload', {
  method: "POST",
  //crossDomain: true,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    base64: image,
    courseTitle: courseTitle,
    resourceName: resourceName,
  })
}).then((res) => res.json()).then((data) => {
 // setImage(data.image);
  fetchData();
});
  };


  
  const handleTextSubmit = (e) => {
    dispatch(setResourceTextAsync({text: text, course: courseTitle + '-' + resourceName}));
    setText("");

  };


const convertToBase64 = (e) => {
//console.log(e)
let reader = new FileReader();
reader.readAsDataURL(e.target.files[0]);
reader.onload = () => {
  //console.log(reader.result);
  setImage(reader.result);
};
reader.onerror = error => {
  console.log("Error: ", error);
}
}

const setMain = async () => {
 
 await dispatch(setMainModeAsync({mode: submissionMode, course: courseTitle + '-' + resourceName} ));
}

const submissionModes = ['PDF', 'Text', 'Image']; 

const handleModeChange = (e) => {
    setSubmissionMode(e.target.value); 
  };

    return (
    <ViewStyled>
      {instructorBoolean && (
 <button style = {{marginLeft: "40.5%"}} onClick = {setMain}>Display Current Mode To Students</button>

      )}

{instructorBoolean && (
  <p style = {{marginLeft: "40.5%"}}>Main Mode: {mode} </p>
)}

     
     
      <div>
        {instructorBoolean && (
   <div style = {{marginLeft: "20%"}}>
   <label htmlFor="submissionMode"><p style = {{fontWeight: "bold"}}>Submission Mode:</p></label>
   <select style = {{marginLeft: "0%"}} id="submissionMode" value={submissionMode} onChange={handleModeChange}>
     {submissionModes.map((mode) => (
       <option key={mode} value={mode}>
         {mode}
       </option>
     ))}
   </select>
   </div>
        )}
   
      {instructorBoolean && (
  <p style = {{marginLeft: "41%", fontSize: "25px", fontWeight: "bold"}}>{submissionMode} Submission Mode </p>
      )}
      

        {/* Conditional Rendering based on the submission mode */}
        {submissionMode === 'PDF' && instructorBoolean && (
          <>
            <Dropzone className="dropzone" onDrop={handleFileSelect}>
              {({ getRootProps, getInputProps }) => (
                <div className="dropzone" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag and drop a file here, or click to select a file</p>
                </div>
              )}
            </Dropzone>
            <button style = {{marginLeft: "40.5%"}} className="upload" onClick={handleUpload} disabled={!selectedFile}>
              Upload
            </button>
            {selectedFileName && (
      <p style={{ marginLeft: '34%', marginBottom: '10px'}}>
        File selected: {selectedFileName}
      </p>
    )}
            <br></br>
            <br></br>
          </>
        )}

        {/* Render the PDF or text submission based on submission mode */}
        <br></br>

        {instructorBoolean && ( submissionMode === 'PDF') && pdfUrl && (
          <div style={{ marginRight: "2%", marginLeft: "2%" }}>
          <embed src={pdfUrl} type="application/pdf" width="100%" height="900px" />
        </div>
        )}

        {!instructorBoolean && ( mode === 'PDF') && pdfUrl && (
          <div style={{ marginRight: "2%", marginLeft: "2%" }}>
          <embed src={pdfUrl} type="application/pdf" width="100%" height="900px" />
        </div>
        )}

{/* {(submissionMode === 'PDF' || mode === 'PDF') && pdfUrl && (
          <div style={{ marginRight: "2%", marginLeft: "2%" }}>
          <embed src={pdfUrl} type="application/pdf" width="100%" height="900px" />
        </div>
        )} */}
        {submissionMode === 'Text' && instructorBoolean &&  (
          <div className="text-container">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={10}
              cols={70}
              style = {{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'  ,whiteSpace: "pre-wrap" }}
              
              placeholder="Type your text here..."
            />
            <button onClick={handleTextSubmit}>Submit Text</button>
            {console.log("FDSFFAS", textResource)}
           
          </div>
        )}


{instructorBoolean && textResource && (submissionMode === 'Text') && (
              <p style = {{whiteSpace: "pre-wrap", marginLeft: "5%", marginRight: "5%"}}>{textResource}</p>
            )}

{!instructorBoolean && textResource && (mode === 'Text') && (
              <p style = {{whiteSpace: "pre-wrap", marginLeft: "5%", marginRight: "5%"}}>{textResource}</p>
            )}
 {/* {textResource && (submissionMode === 'Text' || mode === 'Text') && (
              <p style = {{whiteSpace: "pre-wrap", marginLeft: "5%", marginRight: "5%"}}>{textResource}</p>
            )} */}


{submissionMode === 'Image' && instructorBoolean && (
          <>
            <div>
              <input style = {{marginLeft: "40%"}} accept = "image/*" type = "file" name = "file" onChange={convertToBase64}/>
              <button style = {{marginLeft: "40%", width: "80px"}}onClick = {handleImageUpload}>Submit</button>
              {image && <img style = {{marginLeft: "40%"}}width={200} height = {200} src={image}></img>}
       
              </div>
            {selectedFileName && (
              <p style={{ marginLeft: '100%', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                Selected File: {selectedFileName}
              </p>
            )}
            <br></br>
            <br></br>
           
          </>
        )}
        {/* {(submissionMode === "Image" || mode === 'Image') && allImages && allImages.map((data, index) => {
              return(
                <img style = {{marginLeft: "19%", width: "60%", height: "60%"}} key = {index} src={data.image}/>
              )
            })} */}

            {instructorBoolean && (submissionMode === 'Image') && allImages && allImages.map((data, index) => {
              return(
                <img style = {{marginLeft: "19%", width: "60%", height: "60%"}} key = {index} src={data.image}/>
              )
            })} 

{console.log("MODE: "+ mode)}
{!instructorBoolean && (mode === 'Image') && allImages && allImages.map((data, index) => {
              return(
                <img style = {{marginLeft: "19%", width: "60%", height: "60%"}} key = {index} src={data.image}/>
              )
            })} 
       <div>
</div>
 
      
      </div>
    </ViewStyled>
  );
};
        
export default FileUpload;