var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var hints = document.querySelector('.hints');

document.body.onclick = function() {
  recognition.start();
}

recognition.onresult = function(event) {

  var last = event.results.length - 1;
  var speech = event.results[last][0].transcript;

  if(speech === "turn on the light") {
    document.querySelector("#Layer_1").setAttribute("fill", "yellow")
  } else if(speech === "turn off the light") {
    document.querySelector("#Layer_1").setAttribute("fill", "gray")
  }

  diagnostic.textContent = 'You said: ' + speech + '.';
  
  console.log('Confidence: ' + event.results[0][0].confidence);
}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "Can't hear you!";
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}
