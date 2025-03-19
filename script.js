/*
  _____               _     _       _____                        _       _
 |  __ \             (_)   | |     / ____|                      (_)     | |
 | |  | |_   ___   ___ ___ | |_   | (___   ___ _ __ ___ _ __  ___  __ _| |
 | |  | \ \ / / | | | / __|| __|   \___ \ / __| '__/ _ \ '_ \/ __|/ _` | |
 | |  | |\ V /| |_| | \__ \| |_    ____) | (__| | |  __/ |_) \__ \ (_| | |
 |_____/  \_/  \__, | |___/ \__|  |_____/ \___|_|  \___| .__/|___/\__, |_|
                __/ |                                   | |         __/ |
               |___/                                    |_|        |___/
*/

// Array of bright colors to cycle through (global for use in multiple functions)
const colors = [
    '#ff0000', // Red
    '#00ff00', // Green
    '#0000ff', // Blue
    '#ffff00', // Yellow
    '#ff00ff', // Magenta
    '#00ffff'  // Cyan
];

// Easter Egg: Hidden message in the console
console.log("%c" + 
    "                                                                      \n" +
    "    ________  ______          ______        __                        \n" +
    "   / ____/ / / / __ \\        / ____/__  __/ /___ ___  __             \n" +
    "  / /_  / /_/ / /_/ /       / __/ / _ \\/ / / __ `/ / / /            \n" +
    " / __/ / __  / _, _/       / /___/  __/ / / /_/ / /_/ /              \n" +
    "/_/   /_/ /_/_/ |_|       /_____/\\___/_/_/\\__,_/\\__, /           \n" +
    "                                                /____/                \n" +
    "                                                                      ",
    "color: lime; background: black; font-family: monospace;"
);

// DVD Logo Bouncing Animation
document.addEventListener('DOMContentLoaded', function() {
    // Get canvas and context
    const canvas = document.getElementById('dvdCanvas');
    const ctx = canvas.getContext('2d');
    
    // Load the logo image
    const logoImg = new Image();
    logoImg.src = 'logo.svg'; // Using the local logo.svg
    
    // Variables for animation
    let logoWidth = 100;
    let logoHeight = 100;
    let xPos = Math.random() * (canvas.width - logoWidth);
    let yPos = Math.random() * (canvas.height - logoHeight);
    let xSpeed = 2;
    let ySpeed = 2;
    
    let currentColorIndex = 0;
    let cornerHits = 0; // Counter for corner hits
    
    // Function to check if the logo hit a corner
    function hitCorner(x, y) {
        const corners = [
            {x: 0, y: 0}, // Top-left
            {x: canvas.width - logoWidth, y: 0}, // Top-right
            {x: 0, y: canvas.height - logoHeight}, // Bottom-left
            {x: canvas.width - logoWidth, y: canvas.height - logoHeight} // Bottom-right
        ];
        
        for (const corner of corners) {
            // Allow a small tolerance for corner hit detection
            if (Math.abs(x - corner.x) < 2 && Math.abs(y - corner.y) < 2) {
                return true;
            }
        }
        return false;
    }
    
    // Animation function
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Move the logo
        xPos += xSpeed;
        yPos += ySpeed;
        
        // Check for horizontal bounces
        if (xPos <= 0 || xPos >= canvas.width - logoWidth) {
            xSpeed = -xSpeed;
            
            // Change color on bounce
            currentColorIndex = (currentColorIndex + 1) % colors.length;
            
            // Check for corner hit
            if (hitCorner(xPos, yPos)) {
                cornerHits++;
                // Special effects for corner hit
                document.body.style.backgroundColor = colors[currentColorIndex];
                setTimeout(() => {
                    document.body.style.backgroundColor = '';
                }, 500);
            }
        }
        
        // Check for vertical bounces
        if (yPos <= 0 || yPos >= canvas.height - logoHeight) {
            ySpeed = -ySpeed;
            
            // Change color on bounce
            currentColorIndex = (currentColorIndex + 1) % colors.length;
            
            // Check for corner hit
            if (hitCorner(xPos, yPos)) {
                cornerHits++;
                // Special effects for corner hit
                document.body.style.backgroundColor = colors[currentColorIndex];
                setTimeout(() => {
                    document.body.style.backgroundColor = '';
                }, 500);
            }
        }
        
        // Apply the current color filter to the logo
        ctx.save();
        ctx.fillStyle = colors[currentColorIndex];
        ctx.fillRect(xPos, yPos, logoWidth, logoHeight);
        ctx.globalCompositeOperation = 'destination-in';
        ctx.drawImage(logoImg, xPos, yPos, logoWidth, logoHeight);
        ctx.restore();
        
        // Request next frame
        requestAnimationFrame(animate);
    }
    
    // Start animation when image loads
    logoImg.onload = function() {
        animate();
    };
    
    // Easter Egg: Display corner hit counter on right-click
    canvas.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        alert(`DVD Logo has hit the corner ${cornerHits} times! That's rare!`);
    });
});

// Easter Egg: Konami Code Detection
// Up, Up, Down, Down, Left, Right, Left, Right, B, A
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', function(e) {
    // Check if the key matches the next key in the Konami Code sequence
    const requiredKey = konamiCode[konamiIndex];
    const pressedKey = e.key.toLowerCase();
    
    if (pressedKey === requiredKey.toLowerCase()) {
        konamiIndex++;
        
        // If the entire sequence is entered correctly
        if (konamiIndex === konamiCode.length) {
            // Show the Easter egg
            document.getElementById('konami-easter-egg').style.display = 'block';
            
            // Play a sound (if browsers allowed auto-play)
            // const audio = new Audio('tada.wav');
            // audio.play();
            
            // Hide the Easter egg after 5 seconds
            setTimeout(function() {
                document.getElementById('konami-easter-egg').style.display = 'none';
            }, 5000);
            
            // Reset the index
            konamiIndex = 0;
        }
    } else {
        // Reset the index if the wrong key is pressed
        konamiIndex = 0;
    }
});

// Easter Egg: Cursor Trails (old school effect)
document.addEventListener('mousemove', function(e) {
    // Only create a trail with 5% probability to avoid overwhelming the browser
    if (Math.random() > 0.05) return;
    
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.position = 'absolute';
    trail.style.width = '10px';
    trail.style.height = '10px';
    trail.style.borderRadius = '50%';
    trail.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    trail.style.zIndex = '9999';
    trail.style.pointerEvents = 'none';
    document.body.appendChild(trail);
    
    // Animate fade out
    setTimeout(function() {
        trail.style.transition = 'all 1s';
        trail.style.opacity = '0';
        setTimeout(function() {
            trail.remove();
        }, 1000);
    }, 100);
});

// Update the "last updated" date
document.getElementById('lastUpdated').innerText = new Date().toLocaleDateString('en-US', {
    year: '2-digit',
    month: 'short',
    day: 'numeric'
});

// Easter Egg: Random "Geocities-style" alert on page entry
setTimeout(function() {
    // Show alert with 10% probability
    if (Math.random() < 0.1) {
        alert("Welcome to our AWESOME website!\nDon't forget to sign our guestbook!");
    }
}, 5000);

// Easter Egg: Add a hidden image that appears on triple-click
document.addEventListener('click', (function() {
    let clickCount = 0;
    let clickTimer = null;
    
    return function() {
        clickCount++;
        
        if (clickCount === 1) {
            clickTimer = setTimeout(function() {
                clickCount = 0;
            }, 400);
        } else if (clickCount === 3) {
            clearTimeout(clickTimer);
            clickCount = 0;
            
            // Create and show a hidden flying toaster image
            const toaster = document.createElement('img');
            toaster.src = 'images/toaster.gif';
            toaster.style.position = 'fixed';
            toaster.style.top = '50px';
            toaster.style.left = '-100px';
            toaster.style.zIndex = '9999';
            document.body.appendChild(toaster);
            
            // Animate the toaster flying across the screen
            let position = -100;
            const flyInterval = setInterval(function() {
                position += 5;
                toaster.style.left = position + 'px';
                
                if (position > window.innerWidth) {
                    clearInterval(flyInterval);
                    toaster.remove();
                }
            }, 50);
        }
    };
})()); 