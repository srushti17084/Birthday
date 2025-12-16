// ================= MUSIC CONTROL =================

// Select background music element
const music = document.getElementById('bgMusic');

// Function to play or pause music
function toggleMusic() {
    // If music is paused, play it; otherwise pause it
    music.paused ? music.play() : music.pause();
}

// ================= SPARKLES ANIMATION =================

// Select canvas and context
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

// Set canvas size to screen size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create sparkle particles
let sparkles = Array.from({ length: 180 }, () => createSparkle());

// Function to create a single sparkle
function createSparkle() {
    return {
        x: Math.random() * canvas.width,   // X position
        y: Math.random() * canvas.height,  // Y position
        r: Math.random() * 2 + 1,           // Sparkle size
        opacity: Math.random(),             // Initial opacity
        speed: Math.random() * 0.5 + 0.2,   // Gentle movement speed
        fade: Math.random() * 0.02 + 0.005  // Twinkle speed
    };
}

// Function to draw and animate sparkles
function drawSparkles() {
    // Clear previous frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sparkles.forEach(s => {
        // Draw sparkle
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 182, 193, ${s.opacity})`; // Pink sparkle
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        // Gentle floating motion
        s.y -= s.speed;

        // Twinkling effect
        s.opacity += s.fade;
        if (s.opacity <= 0 || s.opacity >= 1) {
            s.fade *= -1;
        }

        // Reset sparkle if it goes off screen
        if (s.y < 0) {
            s.y = canvas.height;
            s.x = Math.random() * canvas.width;
        }
    });

    // Call animation again
    requestAnimationFrame(drawSparkles);
}

// Start sparkle animation
drawSparkles();
