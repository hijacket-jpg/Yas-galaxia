
const basePhrases = [
    "te quiero", 
    "lindota", 
    "hermosa", 
    "guapota", 
    "enfemera potona", 
    "la más pro", 
    "te kero", 
    "insana", 
    "oño"
];


let phrases = [];
for (let i = 0; i < 4; i++) {
    phrases = phrases.concat(basePhrases);
}

phrases.sort(() => Math.random() - 0.5);

const galaxy = document.getElementById('galaxy');


const numDynamicStars = 100; 
for (let i = 0; i < numDynamicStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const radius = Math.random() * 400 + 80; 
    
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    
    const size = Math.random() * 2 + 1; 
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    star.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
    galaxy.appendChild(star);
}


const textRadius = 320; 
const totalWords = phrases.length;

phrases.forEach((text, i) => {
    const el = document.createElement('div');
    el.className = 'phrase';
    el.textContent = text;
    
    const phi = Math.acos(1 - 2 * (i + 0.5) / totalWords);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    
    const rotateY = theta * (180 / Math.PI);
    const rotateX = phi * (180 / Math.PI) - 90;
    
    el.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(${textRadius}px)`;
    
    galaxy.appendChild(el);
});


let currentRotX = -15; 
let currentRotY = 0;
let isDragging = false;
let startMouseX = 0;
let startMouseY = 0;
const autoSpinSpeed = 0.15; 

const universe = document.getElementById('universe');


universe.addEventListener('mousedown', startDrag);
universe.addEventListener('touchstart', startDrag, { passive: true }); 

window.addEventListener('mousemove', drag);
window.addEventListener('touchmove', drag, { passive: false }); 

window.addEventListener('mouseup', endDrag);
window.addEventListener('touchend', endDrag);

function startDrag(e) {
    isDragging = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    startMouseX = clientX;
    startMouseY = clientY;
}

function drag(e) {
    if (!isDragging) return;
    
    
    if (e.touches) e.preventDefault();
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - startMouseX;
    const deltaY = clientY - startMouseY;
    
    
    currentRotY += deltaX * 0.3;
    currentRotX -= deltaY * 0.3;
    
    startMouseX = clientX;
    startMouseY = clientY;
}

function endDrag() {
    isDragging = false;
}


function animate() {
    if (!isDragging) {
        currentRotY += autoSpinSpeed; 
        currentRotX += autoSpinSpeed * 0.3; 
    }
    
    galaxy.style.transform = `rotateX(${currentRotX}deg) rotateY(${currentRotY}deg)`;
    
    requestAnimationFrame(animate);
}


animate();
