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

// ================= FIREWORK / CRACKER BURST (ENDING) =================

// Firework particles
let fireworks = [];

// Firework particle creator
function createFirework(x, y) {
    for (let i = 0; i < 40; i++) {
        fireworks.push({
            x: x,
            y: y,
            radius: Math.random() * 2 + 1,
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 4 + 2,
            alpha: 1,
            decay: Math.random() * 0.02 + 0.015,
            color: `hsl(${Math.random() * 360}, 100%, 70%)`
        });
    }
}

// Draw fireworks
function drawFireworks() {
    fireworks.forEach((p, index) => {
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.color.match(/\d+/)[0]},100%,70%,${p.alpha})`;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Move outward (burst effect)
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.alpha -= p.decay;

        // Remove faded particles
        if (p.alpha <= 0) {
            fireworks.splice(index, 1);
        }
    });
}

// Hook fireworks into existing animation loop
const originalDrawSparkles = drawSparkles;
function drawSparkles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw sparkles
    sparkles.forEach(s => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,182,193,${s.opacity})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        s.y += s.speed;
        s.opacity += s.fade;
        if (s.opacity <= 0 || s.opacity >= 1) s.fade *= -1;
        if (s.y > canvas.height) {
            s.y = 0;
            s.x = Math.random() * canvas.width;
        }
    });

    // Draw fireworks on top
    drawFireworks();

    requestAnimationFrame(drawSparkles);
}

// ================= ENDING TRIGGER =================

// Slideshow duration = 40s
setTimeout(() => {

    // Change ending message
    document.getElementById("cardMessage").innerHTML =
        "🎉 <strong>Have a Wonderful Birthday!</strong> 🎂💖";

    // Firework bursts (multiple crackers)
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            createFirework(
                Math.random() * canvas.width,
                Math.random() * canvas.height * 0.6
            );
        }, i * 400);
    }

}, 38000); // Trigger near end
