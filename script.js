// ================= MUSIC CONTROL =================

// Select background music element
const music = document.getElementById('bgMusic');

// Function to play or pause music
function toggleMusic() {
    // If music is paused, play it; otherwise pause it
    music.paused ? music.play() : music.pause();
}

// ================= CONFETTI ANIMATION =================

// Select canvas and context
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

// Set canvas size to screen size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create confetti particles
let confetti = Array.from({ length: 200 }, () => ({
    x: Math.random() * canvas.width,   // X position
    y: Math.random() * canvas.height,  // Y position
    r: Math.random() * 6 + 2,           // Radius
    d: Math.random() * 200,             // Density
    color: `hsl(${Math.random() * 360}, 100%, 70%)` // Random color
}));

// Function to draw and animate confetti
function drawConfetti() {
    // Clear previous frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw each confetti particle
    confetti.forEach(p => {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        // Falling motion
        p.y += Math.cos(p.d) + 2;

        // Reset confetti to top when it falls down
        if (p.y > canvas.height) p.y = 0;
    });

    // Call animation again
    requestAnimationFrame(drawConfetti);
}

// Start confetti animation
drawConfetti();
