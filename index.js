let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    
    // Clear the select element
    voiceSelect.innerHTML = "";

    voices.forEach((voice, i) => {
        voiceSelect.options[i] = new Option(voice.name, i);
    });

    // Set the default voice
    speech.voice = voices[0];
};

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);

    // After speaking, create an audio blob and offer it for download
    speech.onend = function(event) {
        let blob = new Blob([new Uint8Array([0])], { type: 'audio/wav' }); // Empty audio data for demonstration
        let url = URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = 'speech_audio.wav';
        a.click();
        window.URL.revokeObjectURL(url);
    }
});
