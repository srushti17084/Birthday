// ================= MUSIC CONTROL =================

// Select background music element
const music = document.getElementById('bgMusic');

// Function to play or pause music
function toggleMusic() {
    music.paused ? music.play() : music.pause();
}

// ================= FALLING SPARKLES =================

// Select canvas and context
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

// Set canvas size to screen size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create sparkle particles
let sparkles = Array.from({ length: 200 }, () => createSparkle());

// Function to create one sparkle
function createSparkle() {
    return {
        x: Math.random() * canvas.width,     // Horizontal position
        y: Math.random() * canvas.height,    // Vertical position
        r: Math.random() * 2 + 1,             // Sparkle size
        opacity: Math.random(),               // Brightness
        speed: Math.random() * 1 + 0.5,       // Falling speed
        fade: Math.random() * 0.02 + 0.005    // Twinkle speed
    };
}

// Draw and animate sparkles
function drawSparkles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sparkles.forEach(s => {
        // Draw sparkle
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 182, 193, ${s.opacity})`; // Soft pink sparkle
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        // Falling down motion
        s.y += s.speed;

        // Twinkling effect
        s.opacity += s.fade;
        if (s.opacity <= 0 || s.opacity >= 1) {
            s.fade *= -1;
        }

        // Reset sparkle to top when it falls out of view
        if (s.y > canvas.height) {
            s.y = 0;
            s.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(drawSparkles);
}

// Start falling sparkles animation
drawSparkles();
