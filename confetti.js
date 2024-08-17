function launchConfetti() {
    const confettiSettings = { 
        particleCount: 100, 
        spread: 70, 
        origin: { y: 0.6 } 
    };
    confetti(confettiSettings);
}

(function() {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
    document.head.appendChild(script);
})();
