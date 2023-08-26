import React, { useState , useEffect, useRef} from 'react'
// import { useReactMediaRecorder } from 'react-media-recorder';
import { useNavigate } from "react-router-dom";
import "./Home.css"


const Home = () => {

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (!token) {
          navigate("./signin");
        }
    }, []);

    const [screen, setscreen] = useState(null);
    const [webcam, setwebcam] = useState(null);
    const [screenRecording, setScreenRecording] = useState(false);
    const [webcamRecording, setWebcamRecording] = useState(false);
    const [screenVideo, setScreenVideo] = useState(null);
    const [webcamVideo, setWebcamVideo] = useState(null);
  
    const screenVideoRef = useRef(null);
    const webcamVideoRef = useRef(null);
  
    const startScreenRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
  
        const Recorder = new MediaRecorder(stream);
        const store = [];
  
        Recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            store.push(event.data);
          }
        };
  
        Recorder.onstop = () => {
          const blob = new Blob(store, { type: 'video/webm' });
          setScreenVideo(blob);
          localStorage.setItem('screenRecording', URL.createObjectURL(blob));
        };
  
        setscreen(Recorder);
        Recorder.start();
        setScreenRecording(true);
      } catch (error) {
        console.error('Error start to screen recording:', error);
      }
    };
  
    const startWebcamRecording = async () => {
      try {
        const webcamStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  
        const Recorder = new MediaRecorder(webcamStream);
        const store = [];
  
        Recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            store.push(event.data);
          }
        };
  
        Recorder.onstop = () => {
          const blob = new Blob(store, { type: 'video/webm' });
          setWebcamVideo(blob);
          localStorage.setItem('webcamRecording', URL.createObjectURL(blob));
        };
  
        setwebcam(Recorder);
        Recorder.start();
        setWebcamRecording(true);
      } catch (error) {
        console.error('Error start to webcam recording:', error);
      }
    };
  
    const stopScreenRecording = () => {
      if (screen && screen.state === 'recording') {
        screen.stop();
        setScreenRecording(false);
      }
    };
  
    const stopWebcamRecording = () => {
      if (webcam && webcam.state === 'recording') {
        webcam.stop();
        setWebcamRecording(false);
      }
    };
  
    return (
      <div>
        <h1>Screen and Webcam Recorder</h1>
        <div>
          {screenRecording ? (
            <button onClick={stopScreenRecording}>Stop Screen Recording</button>
          ) : (
            <button onClick={startScreenRecording}>Start Screen Recording</button>
          )}
          {localStorage.getItem('screenRecording') && (
            <div>
              <h2>Screen Recording</h2>
              <video ref={screenVideoRef} controls>
                <source src={localStorage.getItem('screenRecording')} type="video/webm" />
              </video>
            </div>
          )}
        </div>
        <div>
          {webcamRecording ? (
            <button onClick={stopWebcamRecording}>Stop Webcam Recording</button>
          ) : (
            <button onClick={startWebcamRecording}>Start Webcam Recording</button>
          )}
          {localStorage.getItem('webcamRecording') && (
            <div>
              <h2>Webcam Recording</h2>
              <video ref={webcamVideoRef} controls>
                <source src={localStorage.getItem('webcamRecording')} type="video/webm" />
              </video>
            </div>
          )}
        </div>
      </div>
    );
  }
export default Home
