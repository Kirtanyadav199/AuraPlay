import {
  createFaceLandmarker,
  getFaceLandmarker,
} from "../utils/faceLandmarker.js";


export const initialize = async ({videoRef}) => {
    await createFaceLandmarker();
    await startCamera({videoRef});
  };

export  const startCamera = async ({videoRef}) => {
    const stream =
      await navigator.mediaDevices.getUserMedia({
        video: true,
      });

    videoRef.current.srcObject = stream;

    videoRef.current.onloadedmetadata = () => {
      videoRef.current.play();
      // detectFace();
    };
  };

 export const detectFace = ({videoRef,setEmotion}) => {
    const faceLandmarker = getFaceLandmarker();

    const video = videoRef.current;

      if (
        video.readyState >= 2 &&
        faceLandmarker
      ) {
        const result =
          faceLandmarker.detectForVideo(
            video,
            performance.now()
          );

        if (
          result.faceBlendshapes &&
          result.faceBlendshapes.length > 0
        ) {
          const shapes =
            result.faceBlendshapes[0].categories;

          const smileLeft =
            shapes.find(
              (item) =>
                item.categoryName ===
                "mouthSmileLeft"
            )?.score || 0;

          const smileRight =
            shapes.find(
              (item) =>
                item.categoryName ===
                "mouthSmileRight"
            )?.score || 0;

          const jawOpen =
            shapes.find(
              (item) =>
                item.categoryName ===
                "jawOpen"
            )?.score || 0;

          const browUp =
            shapes.find(
              (item) =>
                item.categoryName ===
                "browInnerUp"
            )?.score || 0;

            const frownLeft = 
            shapes.find(
              (item)=>
              item.categoryName ===
              "mouthFrownLeft"
              )?.score || 0;

              const frownRight = 
            shapes.find(
              (item)=>
              item.categoryName ===
              "mouthFrownRight"
              )?.score || 0;

          const averageSmile =
            (smileLeft + smileRight) / 2;

            

          // Emotion Logic

          if (averageSmile > 0.4) {
            setEmotion("😊 Happy");
          }
          else if (
            jawOpen > 0.3 &&
            browUp > 0.4
          ) {
            setEmotion("😲 Surprised");
          }
          else if( frownLeft > 0.002 && frownRight>0.002){
            setEmotion("😔 Sad");
          }
          else {
            setEmotion("😐 Neutral");
          }
        }
      }

      
    };