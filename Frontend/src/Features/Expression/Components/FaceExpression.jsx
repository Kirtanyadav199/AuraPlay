import React, { useEffect, useRef, useState } from "react";
import { initialize,detectFace } from "../utils/utils";


export default function FaceExpression() {
  const videoRef = useRef(null);

  const [emotion, setEmotion] = useState("Loading...");

  useEffect(() => {
    initialize({videoRef});
  }, []);

  

    
  

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width="600"
      />
      <h2>{emotion}</h2>
      <button onClick={()=>{detectFace({videoRef,setEmotion})}}>Detect Expression</button>
    </div>
  );
}

