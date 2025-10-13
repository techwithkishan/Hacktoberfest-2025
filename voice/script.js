const startBtn = document.getElementById("start-btn");
const output = document.getElementById("output");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  output.textContent = "❌ Speech Recognition is not supported in this browser.";
  startBtn.disabled = true;
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  startBtn.addEventListener("click", () => {
    recognition.start();
    output.textContent = "🎤 Listening...";
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    output.textContent = `✅ You said: "${transcript}"`;

    // Optional: respond or trigger actions
    if (transcript.toLowerCase().includes("hello")) {
      speak("Hi there!");
    } else if (transcript.toLowerCase().includes("how are you")) {
      speak("I'm doing great, thanks!");
    }
  };

  recognition.onerror = (event) => {
    output.textContent = `❗ Error: ${event.error}`;
  };
}

// Optional: Text-to-speech response
function speak(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
}
