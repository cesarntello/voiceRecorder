import React, {useState} from "react";
import { render } from "react-dom";
import vmsg from 'vmsg';


const recorder = new vmsg.Recorder({
  wasmURL: 'https://unpkg.com/vmsg@0.3.0/vmsg.wasm'
})

class App extends React.Component {
state = {
  isLoading: false,
  isRecording: false,
  recordings: []
}
  


// const handleStartRecording = () => {
// var items = []
//   navigator.mediaDevices.getUserMedia({audio: true})
//   .then(stream => {

//     const mediaRecorder = new MediaRecorder(stream);


//     mediaRecorder.ondataavailable = e =>{

//       items.push(e.data)
//       if(mediaRecorder.state === 'inactive'){

//         var blob = new Blob (items, {type: 'audio/webm'})
//         var audio = document.getElementById('audio')
//         var mainaudio = document.createElement('audio')
//         mainaudio.setAttribute('controls', 'controls')
//         audio.appendChild(mainaudio)
//         mainaudio.innerHTML = '<source src="'+URL.createObjectURL(blob)+'"type= "video.webm"/>'
//       }
//     }

//     mediaRecorder.start(100);
//     setTimeout(()=>{
//       mediaRecorder.stop()
//     },5000)
 

//   });
// };
record = async ()=>{

  this.setState({isLoading:true})
  if(this.state.isRecording){
    const blob = await recorder.stopRecording()
    this.setState({
      isLoading:false,
      isRecording:false,
      recordings: this.state.recordings.concat(URL.createObjectURL(blob))
    })
  }else{
    try{
      await recorder.initAudio()
      await recorder.initWorker()
      recorder.startRecording()
      this.setState({isLoading:false, isRecording:true})
    }catch(e){
      console.log(e)
      this.setState({isLoading:false})
    }
  }

}
render(){ 
  
  const {isLoading, isRecording, recordings} =this.state
  


  return (
    <React.Fragment className="contianer">
     <h1>Microfono App</h1>
      <div className="audio" id="audio"></div>
     <button className="btn btn-primary" onClick={this.record} disabled={isLoading}>{isRecording ? "Stop" : "Record"}</button>
     {/* <button className="btn btn-primary" >Detener grabacion</button> */}
     <ul style={{listStyle: 'none', padding: 0 }}>
    {recordings.map(url => (
      <li key={url}>
        <audio src={url} controls></audio>
      </li>
    ))}

     </ul>
    </React.Fragment>
  )
}
}

export default App;
