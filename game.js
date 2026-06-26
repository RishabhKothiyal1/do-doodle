// ==========================================
// 1. GAME DATA & CONFIGURATION
// ==========================================

const WORD_DICTIONARIES = {
    en: [
        "apple", "banana", "cherry", "grape", "orange", "pear", "strawberry", "watermelon",
        "cat", "dog", "elephant", "giraffe", "lion", "monkey", "penguin", "tiger", "zebra",
        "airplane", "bicycle", "car", "helicopter", "motorcycle", "train", "ship", "truck",
        "house", "castle", "bridge", "skyscraper", "lighthouse", "tent", "igloo", "barn",
        "guitar", "piano", "drum", "violin", "trumpet", "flute", "harp", "saxophone",
        "computer", "phone", "television", "camera", "watch", "lamp", "clock", "keys",
        "football", "basketball", "tennis", "baseball", "swimming", "boxing", "running",
        "sun", "moon", "star", "cloud", "rain", "snow", "rainbow", "lightning", "wind",
        "pizza", "burger", "sushi", "taco", "cookie", "cake", "ice cream", "donut", "bread",
        "hammer", "screwdriver", "ladder", "saw", "scissors", "pencil", "brush", "ruler",
        "spider", "butterfly", "dinosaur", "dragon", "unicorn", "alien", "ghost", "wizard"
    ],
    es: [
        "manzana", "platano", "cereza", "uva", "naranja", "pera", "fresa", "sandia",
        "gato", "perro", "elefante", "jirafa", "leon", "mono", "pinguino", "tigre", "cebra",
        "avion", "bicicleta", "coche", "helicoptero", "moto", "tren", "barco", "camion",
        "casa", "castillo", "puente", "rascacielos", "faro", "tienda", "iglu", "granja",
        "guitarra", "piano", "tambor", "violin", "trompeta", "flauta", "arpa", "saxofon",
        "computadora", "telefono", "television", "camara", "reloj", "lampara", "llaves",
        "futbol", "baloncesto", "tenis", "beisbol", "natacion", "boxeo", "correr",
        "sol", "luna", "estrella", "nube", "lluvia", "nieve", "arcoiris", "rayo", "viento",
        "pizza", "hamburguesa", "sushi", "taco", "galleta", "pastel", "helado", "dona", "pan",
        "martillo", "destornillador", "escalera", "sierra", "tijeras", "lapiz", "cepillo", "regla",
        "arana", "mariposa", "dinosaurio", "dragon", "unicornio", "extraterrestre", "fantasma", "mago"
    ],
    de: [
        "apfel", "banane", "kirsche", "traube", "orange", "birne", "erdbeere", "wassermelone",
        "katze", "hund", "elefant", "giraffe", "loewe", "affe", "pinguin", "tiger", "zebra",
        "flugzeug", "fahrrad", "auto", "hubschrauber", "motorrad", "zug", "schiff", "lastwagen",
        "haus", "schloss", "bruecke", "wolkenkratzer", "leuchtturm", "zelt", "iglu", "scheune",
        "gitarre", "klavier", "trommel", "violine", "trompete", "floete", "harfe", "saxophon",
        "computer", "telefon", "fernseher", "kamera", "uhr", "lampe", "wecker", "schluessel",
        "fussball", "basketball", "tennis", "baseball", "schwimmen", "boxen", "laufen",
        "sonne", "mond", "stern", "wolke", "regen", "schnee", "regenbogen", "blitz", "wind",
        "pizza", "burger", "sushi", "taco", "keks", "kuchen", "eis", "donut", "brot",
        "hammer", "schraubenzieher", "leiter", "saege", "schere", "bleistift", "pinsel", "lineal",
        "spinne", "schmetterling", "dinosaurier", "drache", "einhorn", "ausserirdischer", "gespenst", "magier"
    ],
    fr: [
        "pomme", "banane", "cerise", "raisin", "orange", "poire", "fraise", "pasteque",
        "chat", "chien", "elephant", "girafe", "lion", "singe", "pingouin", "tigre", "zebre",
        "avion", "bicyclette", "voiture", "helicoptere", "moto", "train", "bateau", "camion",
        "maison", "chateau", "pont", "gratte-ciel", "phare", "tente", "igloo", "grange",
        "guitare", "piano", "tambour", "violon", "trompette", "flute", "harpe", "saxophoner",
        "ordinateur", "telephone", "television", "appareil photo", "montre", "lampe", "horloge", "cles",
        "football", "basketball", "tennis", "baseball", "natation", "boxe", "courir",
        "soleil", "lune", "etoile", "nuage", "pluie", "neige", "arc-en-ciel", "eclair", "vent",
        "pizza", "hamburger", "sushi", "taco", "biscuit", "gateau", "glace", "beignet", "pain",
        "marteau", "tournevis", "echelle", "scie", "ciseaux", "crayon", "pinceau", "regle",
        "araignee", "papillon", "dinosaure", "dragon", "licorne", "extraterrestre", "fantome", "magicien"
    ],
    pt: [
        "maca", "banana", "cereja", "uva", "laranja", "pera", "morango", "melancia",
        "gato", "cachorro", "elefante", "girafa", "leao", "macaco", "pinguim", "tigre", "zebra",
        "aviao", "bicicleta", "carro", "helicoptero", "motocicleta", "trem", "navio", "caminhao",
        "casa", "castelo", "ponte", "arranha-ceu", "farol", "tenda", "iglu", "celeiro",
        "guitarra", "piano", "tambor", "violino", "trompete", "flauta", "harpa", "saxofone",
        "computador", "telefone", "televisao", "camera", "relogio", "lampada", "chaves",
        "futebol", "basquete", "tenis", "beisebol", "natacao", "boxe", "correr",
        "sol", "lua", "estrela", "nuvem", "chuva", "neve", "arco-iris", "raio", "vento",
        "pizza", "hamburguer", "sushi", "taco", "biscoito", "bolo", "sorvete", "rosquinha", "pao",
        "martelo", "chave de fenda", "escada", "serra", "tesoura", "lapis", "pincel", "regua",
        "aranha", "borboleta", "dinossauro", "dragao", "unicornio", "alienigena", "fantasma", "mago"
    ]
};

// Avatar options
const AVATAR_PARTS = {
    color: ['#ff3b30', '#ff9500', '#ffcc00', '#4cd964', '#5ac8fa', '#007aff', '#5856d6', '#ff2d55', '#d946ef', '#84cc16', '#a2845e', '#ffffff'],
    eyes: [
        // Default
        '<circle cx="42" cy="35" r="4.5" fill="#000"/><circle cx="58" cy="35" r="4.5" fill="#000"/>',
        // Sunglasses
        '<path d="M 32 30 L 68 30 L 65 40 L 35 40 Z" fill="#000" stroke="#000" stroke-width="2" stroke-linejoin="round"/><line x1="32" y1="30" x2="26" y2="35" stroke="#000" stroke-width="3"/><line x1="68" y1="30" x2="74" y2="35" stroke="#000" stroke-width="3"/>',
        // Cute Anime
        '<circle cx="42" cy="35" r="6" fill="#000"/><circle cx="40" cy="33" r="2" fill="#fff"/><circle cx="58" cy="35" r="6" fill="#000"/><circle cx="56" cy="33" r="2" fill="#fff"/>',
        // Closed/Squint
        '<path d="M 35 37 L 45 33 L 35 31" fill="none" stroke="#000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M 65 37 L 55 33 L 65 31" fill="none" stroke="#000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>',
        // Angry
        '<circle cx="42" cy="37" r="4" fill="#000"/><circle cx="58" cy="37" r="4" fill="#000"/><path d="M 32 28 L 46 34" stroke="#000" stroke-width="4" stroke-linecap="round"/><path d="M 68 28 L 54 34" stroke="#000" stroke-width="4" stroke-linecap="round"/>',
        // Winking
        '<circle cx="42" cy="35" r="4.5" fill="#000"/><path d="M 53 35 Q 58 28 63 35" fill="none" stroke="#000" stroke-width="4" stroke-linecap="round"/>'
    ],
    mouth: [
        // Smile
        '<path d="M 38 45 Q 50 55 62 45" fill="none" stroke="#000" stroke-width="4.5" stroke-linecap="round"/>',
        // Big Open Smile
        '<path d="M 38 44 Q 50 60 62 44 Z" fill="#000" stroke="#000" stroke-width="2" stroke-linejoin="round"/><path d="M 44 50 Q 50 56 56 50" fill="#ff4d4d"/>',
        // Surprised O
        '<ellipse cx="50" cy="48" rx="6" ry="8" fill="#000"/>',
        // Flat line
        '<line x1="40" y1="48" x2="60" y2="48" stroke="#000" stroke-width="4.5" stroke-linecap="round"/>',
        // Smirk
        '<path d="M 40 45 Q 46 49 56 44" fill="none" stroke="#000" stroke-width="4.5" stroke-linecap="round"/>',
        // Frown
        '<path d="M 40 50 Q 50 42 60 50" fill="none" stroke="#000" stroke-width="4.5" stroke-linecap="round"/>'
    ]
};

// ==========================================
// 2. AUDIO SYNTH ENGINE (Web Audio API)
// ==========================================
class SoundSynth {
    constructor() {
        this.ctx = null;
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    play(freq, type, duration, delay = 0, slideTo = null) {
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);
        if (slideTo) {
            osc.frequency.exponentialRampToValueAtTime(slideTo, this.ctx.currentTime + delay + duration);
        }

        gain.gain.setValueAtTime(0.15, this.ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + delay + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + delay);
        osc.stop(this.ctx.currentTime + delay + duration);
    }

    success() {
        this.play(523.25, 'triangle', 0.1, 0); // C5
        this.play(659.25, 'triangle', 0.2, 0.08); // E5
    }

    tick() {
        this.play(900, 'sine', 0.03); // Short high tick
    }

    start() {
        this.play(261.63, 'sine', 0.1, 0); // C4
        this.play(329.63, 'sine', 0.1, 0.08); // E4
        this.play(392.00, 'sine', 0.1, 0.16); // G4
        this.play(523.25, 'sine', 0.3, 0.24); // C5
    }

    failure() {
        this.play(300, 'sawtooth', 0.3, 0, 150); // slide down
    }

    victory() {
        const notes = [523, 587, 659, 698, 784, 880, 987, 1047];
        notes.forEach((f, idx) => {
            this.play(f, 'triangle', 0.15, idx * 0.08);
        });
    }
}
const sound = new SoundSynth();

// ==========================================
// 3. CONFETTI & PARTICLES ENGINE
// ==========================================
class ConfettiManager {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.active = false;
        
        window.addEventListener('resize', () => this.resize());
        this.resize();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    spawn(count = 100) {
        this.resize();
        this.particles = [];
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: this.canvas.width / 2,
                y: this.canvas.height / 2 - 50,
                angle: Math.random() * Math.PI * 2,
                speed: 3 + Math.random() * 8,
                gravity: 0.15 + Math.random() * 0.15,
                color: `hsl(${Math.random() * 360}, 90%, 60%)`,
                size: 6 + Math.random() * 8,
                rotation: Math.random() * Math.PI,
                rotationSpeed: -0.1 + Math.random() * 0.2,
                decay: 0.01 + Math.random() * 0.015,
                opacity: 1
            });
        }
        if (!this.active) {
            this.active = true;
            this.animate();
        }
    }

    animate() {
        if (!this.active) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        let alive = false;
        for (let p of this.particles) {
            if (p.opacity <= 0) continue;
            alive = true;

            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed + p.gravity;
            p.speed *= 0.98; // Friction
            p.y += p.gravity;
            p.gravity += 0.05;
            p.rotation += p.rotationSpeed;
            p.opacity -= p.decay;

            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = Math.max(0, p.opacity);
            this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            this.ctx.restore();
        }

        if (alive) {
            requestAnimationFrame(() => this.animate());
        } else {
            this.active = false;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
}
let confetti;

// ==========================================
// 4. CLIENT GAME STATE & UI CONTROLLER
// ==========================================
const game = {
    // Current player config
    myNickname: "",
    myAvatar: { color: 0, eyes: 0, mouth: 0 },
    role: "", // "host" or "client"
    myPeerId: "",
    
    // Canvas context
    canvas: null,
    ctx: null,
    isDrawing: false,
    lastX: 0,
    lastY: 0,
    currentStroke: [], // points in current line path
    drawHistory: [],   // Array of strokes for undo: { type: 'stroke', points: [], color, size, isEraser }
    
    // Toolbar selections
    currentColor: "#000000",
    currentSize: 8,
    isEraser: false,
    activeTool: "pencil",
    
    // Screen display helper
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
        if (screenId === 'game-screen') {
            this.resizeCanvas();
        } else if (screenId === 'setup-screen') {
            this.startPrismaticBurstTick();
        }
    },

    init() {
        this.canvas = document.getElementById('drawing-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Fix internal coordinate size (avoids scale mismatch)
        this.canvas.width = 800;
        this.canvas.height = 600;
        
        confetti = new ConfettiManager('bg-particles');
        
        this.randomizeAvatar();
        this.setupEventHandlers();
        this.drawAvatar();
        this.startTypingAnimation();
        this.initTextAnimations();
        this.initPrismaticBurst();
    },

    startTypingAnimation() {
        const doEl = document.getElementById('typing-do');
        const doodleEl = document.getElementById('typing-doodle');
        const cursorEl = document.getElementById('typing-cursor');
        
        if (!doEl || !doodleEl) return;
        
        const word1 = "Do";
        const word2 = "Doodle";
        let i = 0;
        let j = 0;
        
        const typeDo = () => {
            if (i < word1.length) {
                doEl.textContent += word1.charAt(i);
                i++;
                setTimeout(typeDo, 120);
            } else {
                setTimeout(typeDoodle, 150);
            }
        };
        
        const typeDoodle = () => {
            if (j < word2.length) {
                const char = word2.charAt(j);
                doodleEl.textContent += char;
                doodleEl.setAttribute('data-text', doodleEl.textContent);
                j++;
                setTimeout(typeDoodle, 120);
            } else {
                // Typing complete, fade out the cursor after a small delay
                if (cursorEl) {
                    setTimeout(() => {
                        cursorEl.style.transition = 'opacity 0.5s ease';
                        cursorEl.style.opacity = '0';
                        setTimeout(() => cursorEl.remove(), 500);
                    }, 1500);
                }
            }
        };
        
        // Start typing sequence
        setTimeout(typeDo, 400);
    },

    initTextAnimations() {
        document.querySelectorAll('.text-animate').forEach(el => {
            const text = el.textContent.trim();
            const by = el.getAttribute('data-by') || 'character';
            const delayAttr = el.getAttribute('data-delay') || '0s';
            el.innerHTML = ''; // clear original text
            
            // Setup accessibility screen-reader label
            el.setAttribute('aria-label', text);
            const srSpan = document.createElement('span');
            srSpan.className = 'sr-only';
            srSpan.textContent = text;
            el.appendChild(srSpan);
            
            let segments = [];
            if (by === 'character') {
                segments = text.split('');
            } else if (by === 'word') {
                segments = text.split(/(\s+)/);
            } else {
                segments = [text];
            }
            
            segments.forEach((seg, index) => {
                const span = document.createElement('span');
                span.textContent = seg;
                span.style.setProperty('--i', index);
                span.style.setProperty('--delay', delayAttr);
                span.setAttribute('aria-hidden', 'true');
                el.appendChild(span);
            });
        });
    },


    initPrismaticBurst() {
        this.prismaticCanvas = document.getElementById('prismatic-burst-canvas');
        this.prismaticContainer = document.getElementById('setup-screen');
        if (!this.prismaticCanvas || !this.prismaticContainer) return;

        this.prismaticActive = false;
        this.prismaticMouseTarget = [0.5, 0.5];
        this.prismaticMouseSmooth = [0.5, 0.5];

        const gl = this.prismaticCanvas.getContext('webgl2');
        if (!gl) {
            console.warn("WebGL 2 not supported, skipping PrismaticBurst.");
            return;
        }
        this.prismaticGl = gl;
        gl.clearColor(0.0, 0.0, 0.0, 1.0);

        const vsSource = `#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

        const fsSource = `#version 300 es
precision highp float;
precision highp int;

out vec4 fragColor;

uniform vec2  uResolution;
uniform float uTime;

uniform float uIntensity;
uniform float uSpeed;
uniform int   uAnimType;
uniform vec2  uMouse;
uniform int   uColorCount;
uniform float uDistort;
uniform vec2  uOffset;
uniform sampler2D uGradient;
uniform float uNoiseAmount;
uniform int   uRayCount;

float hash21(vec2 p){
    p = floor(p);
    float f = 52.9829189 * fract(dot(p, vec2(0.065, 0.005)));
    return fract(f);
}

mat2 rot30(){ return mat2(0.8, -0.5, 0.5, 0.8); }

float layeredNoise(vec2 fragPx){
    vec2 p = mod(fragPx + vec2(uTime * 30.0, -uTime * 21.0), 1024.0);
    vec2 q = rot30() * p;
    float n = 0.0;
    n += 0.40 * hash21(q);
    n += 0.25 * hash21(q * 2.0 + 17.0);
    n += 0.20 * hash21(q * 4.0 + 47.0);
    n += 0.10 * hash21(q * 8.0 + 113.0);
    n += 0.05 * hash21(q * 16.0 + 191.0);
    return n;
}

vec3 rayDir(vec2 frag, vec2 res, vec2 offset, float dist){
    float focal = res.y * max(dist, 1e-3);
    return normalize(vec3(2.0 * (frag - offset) - res, focal));
}

float edgeFade(vec2 frag, vec2 res, vec2 offset){
    vec2 toC = frag - 0.5 * res - offset;
    float r = length(toC) / (0.5 * min(res.x, res.y));
    float x = clamp(r, 0.0, 1.0);
    float q = x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
    float s = q * 0.5;
    s = pow(s, 1.5);
    float tail = 1.0 - pow(1.0 - s, 2.0);
    s = mix(s, tail, 0.2);
    float dn = (layeredNoise(frag * 0.15) - 0.5) * 0.0015 * s;
    return clamp(s + dn, 0.0, 1.0);
}

mat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1.0,0.0,0.0, 0.0,c,-s, 0.0,s,c); }
mat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c,0.0,s, 0.0,1.0,0.0, -s,0.0,c); }
mat3 rotZ(float a){ float c = cos(a), s = sin(a); return mat3(c,-s,0.0, s,c,0.0, 0.0,0.0,1.0); }

vec3 sampleGradient(float t){
    t = clamp(t, 0.0, 1.0);
    return texture(uGradient, vec2(t, 0.5)).rgb;
}

vec2 rot2(vec2 v, float a){
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c) * v;
}

float bendAngle(vec3 q, float t){
    float a = 0.8 * sin(q.x * 0.55 + t * 0.6)
            + 0.7 * sin(q.y * 0.50 - t * 0.5)
            + 0.6 * sin(q.z * 0.60 + t * 0.7);
    return a;
}

void main(){
    vec2 frag = gl_FragCoord.xy;
    float t = uTime * uSpeed;
    float jitterAmp = 0.1 * clamp(uNoiseAmount, 0.0, 1.0);
    vec3 dir = rayDir(frag, uResolution, uOffset, 1.0);
    float marchT = 0.0;
    vec3 col = vec3(0.0);
    float n = layeredNoise(frag);
    vec4 c = cos(t * 0.2 + vec4(0.0, 33.0, 11.0, 0.0));
    mat2 M2 = mat2(c.x, c.y, c.z, c.w);
    float amp = clamp(uDistort, 0.0, 50.0) * 0.15;

    mat3 rot3dMat = mat3(1.0);
    if(uAnimType == 1){
      vec3 ang = vec3(t * 0.31, t * 0.21, t * 0.17);
      rot3dMat = rotZ(ang.z) * rotY(ang.y) * rotX(ang.x);
    }
    mat3 hoverMat = mat3(1.0);
    if(uAnimType == 2){
      vec2 m = uMouse * 2.0 - 1.0;
      vec3 ang = vec3(m.y * 0.6, m.x * 0.6, 0.0);
      hoverMat = rotY(ang.y) * rotX(ang.x);
    }

    for (int i = 0; i < 44; ++i) {
        vec3 P = marchT * dir;
        P.z -= 2.0;
        float rad = length(P);
        vec3 Pl = P * (10.0 / max(rad, 1e-6));

        if(uAnimType == 0){
            Pl.xz *= M2;
        } else if(uAnimType == 1){
      Pl = rot3dMat * Pl;
        } else {
      Pl = hoverMat * Pl;
        }

        float stepLen = min(rad - 0.3, n * jitterAmp) + 0.1;

        float grow = smoothstep(0.35, 3.0, marchT);
        float a1 = amp * grow * bendAngle(Pl * 0.6, t);
        float a2 = 0.5 * amp * grow * bendAngle(Pl.zyx * 0.5 + 3.1, t * 0.9);
        vec3 Pb = Pl;
        Pb.xz = rot2(Pb.xz, a1);
        Pb.xy = rot2(Pb.xy, a2);

        float rayPattern = smoothstep(
            0.5, 0.7,
            sin(Pb.x + cos(Pb.y) * cos(Pb.z)) *
            sin(Pb.z + sin(Pb.y) * cos(Pb.x + t))
        );

        if (uRayCount > 0) {
            float ang = atan(Pb.y, Pb.x);
            float comb = 0.5 + 0.5 * cos(float(uRayCount) * ang);
            comb = pow(comb, 3.0);
            rayPattern *= smoothstep(0.15, 0.95, comb);
        }

        vec3 spectralDefault = 1.0 + vec3(
            cos(marchT * 3.0 + 0.0),
            cos(marchT * 3.0 + 1.0),
            cos(marchT * 3.0 + 2.0)
        );

        float saw = fract(marchT * 0.25);
        float tRay = saw * saw * (3.0 - 2.0 * saw);
        vec3 userGradient = 2.0 * sampleGradient(tRay);
        vec3 spectral = (uColorCount > 0) ? userGradient : spectralDefault;
        vec3 base = (0.05 / (0.4 + stepLen))
                  * smoothstep(5.0, 0.0, rad)
                  * spectral;

        col += base * rayPattern;
        marchT += stepLen;
    }

    col *= edgeFade(frag, uResolution, uOffset);
    col *= uIntensity;

    fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

        const compile = (source, type) => {
            const s = gl.createShader(type);
            gl.shaderSource(s, source);
            gl.compileShader(s);
            if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
                console.error("Shader Compile Error:", gl.getShaderInfoLog(s));
                return null;
            }
            return s;
        };

        const vs = compile(vsSource, gl.VERTEX_SHADER);
        const fs = compile(fsSource, gl.FRAGMENT_SHADER);
        if (!vs || !fs) return;

        const program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Program Link Error:", gl.getProgramInfoLog(program));
            return;
        }

        // Interleaved single large triangle: Position X, Y, UV U, V
        const vertices = new Float32Array([
            -1.0, -1.0,  0.0,  0.0,
             3.0, -1.0,  2.0,  0.0,
            -1.0,  3.0,  0.0,  2.0
        ]);

        const vertexBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const posLoc = gl.getAttribLocation(program, 'position');
        const uvLoc = gl.getAttribLocation(program, 'uv');

        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 16, 0);

        gl.enableVertexAttribArray(uvLoc);
        gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 16, 8);

        gl.useProgram(program);

        this.prismaticUniforms = {
            uResolution: gl.getUniformLocation(program, 'uResolution'),
            uTime: gl.getUniformLocation(program, 'uTime'),
            uIntensity: gl.getUniformLocation(program, 'uIntensity'),
            uSpeed: gl.getUniformLocation(program, 'uSpeed'),
            uAnimType: gl.getUniformLocation(program, 'uAnimType'),
            uMouse: gl.getUniformLocation(program, 'uMouse'),
            uColorCount: gl.getUniformLocation(program, 'uColorCount'),
            uDistort: gl.getUniformLocation(program, 'uDistort'),
            uOffset: gl.getUniformLocation(program, 'uOffset'),
            uGradient: gl.getUniformLocation(program, 'uGradient'),
            uNoiseAmount: gl.getUniformLocation(program, 'uNoiseAmount'),
            uRayCount: gl.getUniformLocation(program, 'uRayCount')
        };

        // Hex to RGB parser helper
        const hexToRgb01 = hex => {
            let h = hex.trim();
            if (h.startsWith('#')) h = h.slice(1);
            if (h.length === 3) {
                const r = h[0], g = h[1], b = h[2];
                h = r + r + g + g + b + b;
            }
            const intVal = parseInt(h, 16);
            if (isNaN(intVal) || (h.length !== 6 && h.length !== 8)) return [1, 1, 1];
            const r = ((intVal >> 16) & 255) / 255;
            const g = ((intVal >> 8) & 255) / 255;
            const b = (intVal & 255) / 255;
            return [r, g, b];
        };

        // Create user gradient texture
        const colors = ['#7c3aed', '#000000', '#ffffff'];
        const count = colors.length;
        const textureData = new Uint8Array(count * 4);
        for (let i = 0; i < count; i++) {
            const [r, g, b] = hexToRgb01(colors[i]);
            textureData[i * 4 + 0] = Math.round(r * 255);
            textureData[i * 4 + 1] = Math.round(g * 255);
            textureData[i * 4 + 2] = Math.round(b * 255);
            textureData[i * 4 + 3] = 255;
        }

        const gradientTex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, gradientTex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, count, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, textureData);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        // Bind static uniforms once
        gl.uniform1f(this.prismaticUniforms.uIntensity, 2.0);
        gl.uniform1f(this.prismaticUniforms.uSpeed, 0.5);
        gl.uniform1i(this.prismaticUniforms.uAnimType, 1); // rotate3d
        gl.uniform1i(this.prismaticUniforms.uColorCount, count);
        gl.uniform1f(this.prismaticUniforms.uDistort, 1.0);
        gl.uniform2f(this.prismaticUniforms.uOffset, 0.0, 0.0);
        gl.uniform1f(this.prismaticUniforms.uNoiseAmount, 0.8);
        gl.uniform1i(this.prismaticUniforms.uRayCount, 24);

        // Bind gradient texture unit
        gl.uniform1i(this.prismaticUniforms.uGradient, 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, gradientTex);

        // Pointer event listener on container
        this.prismaticContainer.addEventListener('pointermove', (e) => {
            const rect = this.prismaticContainer.getBoundingClientRect();
            const x = (e.clientX - rect.left) / Math.max(rect.width, 1);
            const y = (e.clientY - rect.top) / Math.max(rect.height, 1);
            this.prismaticMouseTarget = [Math.min(Math.max(x, 0), 1), Math.min(Math.max(y, 0), 1)];
        }, { passive: true });

        this.startPrismaticBurstTick();
    },

    startPrismaticBurstTick() {
        if (this.prismaticActive || !this.prismaticGl) return;
        this.prismaticActive = true;

        let accumTime = 0;
        let last = performance.now();

        const tick = (now) => {
            if (!this.prismaticActive || !this.prismaticContainer.classList.contains('active')) {
                this.prismaticActive = false;
                return;
            }

            const dt = Math.max(0, now - last) * 0.001;
            last = now;
            accumTime += dt;

            // Resize canvas to full screen
            const w = window.innerWidth;
            const h = window.innerHeight;
            if (this.prismaticCanvas.width !== w || this.prismaticCanvas.height !== h) {
                this.prismaticCanvas.width = w;
                this.prismaticCanvas.height = h;
                this.prismaticGl.viewport(0, 0, w, h);
            }

            // Smooth pointer position
            const tau = 0.02 + 0.25 * 0.5; // hoverDampness = 0.25
            const alpha = 1.0 - Math.exp(-dt / tau);
            this.prismaticMouseSmooth[0] += (this.prismaticMouseTarget[0] - this.prismaticMouseSmooth[0]) * alpha;
            this.prismaticMouseSmooth[1] += (this.prismaticMouseTarget[1] - this.prismaticMouseSmooth[1]) * alpha;

            // Bind dynamic uniforms
            this.prismaticGl.uniform2f(this.prismaticUniforms.uResolution, this.prismaticCanvas.width, this.prismaticCanvas.height);
            this.prismaticGl.uniform1f(this.prismaticUniforms.uTime, accumTime);
            this.prismaticGl.uniform2fv(this.prismaticUniforms.uMouse, this.prismaticMouseSmooth);

            // Draw full screen quad
            this.prismaticGl.clear(this.prismaticGl.COLOR_BUFFER_BIT);
            this.prismaticGl.drawArrays(this.prismaticGl.TRIANGLES, 0, 3);

            requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    },

    // Procedural SVG Generator
    generateAvatarSVG(avatarObj) {
        const colorVal = AVATAR_PARTS.color[avatarObj.color] || '#ff3b30';
        const eyesVal = AVATAR_PARTS.eyes[avatarObj.eyes] || AVATAR_PARTS.eyes[0];
        const mouthVal = AVATAR_PARTS.mouth[avatarObj.mouth] || AVATAR_PARTS.mouth[0];

        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- Shoulders -->
            <path d="M 18 90 C 18 64, 33 57, 50 57 C 67 57, 82 64, 82 90 Z" fill="${colorVal}" stroke="#000" stroke-width="5.5" stroke-linejoin="round" stroke-linecap="round"/>
            <!-- Head -->
            <circle cx="50" cy="38" r="19.5" fill="${colorVal}" stroke="#000" stroke-width="5.5"/>
            ${eyesVal}
            ${mouthVal}
        </svg>`;
    },

    serializeAvatar(avatarObj) {
        return `${avatarObj.color}-${avatarObj.eyes}-${avatarObj.mouth}`;
    },

    deserializeAvatar(str) {
        const parts = str.split('-').map(Number);
        if (parts.length === 4) {
            // fallback mapping old bg/face to color
            return { color: parts[0] % AVATAR_PARTS.color.length, eyes: parts[2] % AVATAR_PARTS.eyes.length, mouth: parts[3] % AVATAR_PARTS.mouth.length };
        }
        return { color: parts[0] || 0, eyes: parts[1] || 0, mouth: parts[2] || 0 };
    },

    randomizeAvatar() {
        this.myAvatar.color = Math.floor(Math.random() * AVATAR_PARTS.color.length);
        this.myAvatar.eyes = Math.floor(Math.random() * AVATAR_PARTS.eyes.length);
        this.myAvatar.mouth = Math.floor(Math.random() * AVATAR_PARTS.mouth.length);
        this.drawAvatar();
    },

    cycleAvatarPart(part, dir) {
        const len = AVATAR_PARTS[part].length;
        const current = this.myAvatar[part];
        if (dir === 'next') {
            this.myAvatar[part] = (current + 1) % len;
        } else {
            this.myAvatar[part] = (current - 1 + len) % len;
        }
        this.drawAvatar();
    },

    drawAvatar() {
        const svg = this.generateAvatarSVG(this.myAvatar);
        document.getElementById('avatar-preview').innerHTML = svg;
    },

    showToast(msg) {
        const t = document.getElementById('toast');
        t.innerText = msg;
        t.classList.remove('hidden');
        setTimeout(() => {
            t.classList.add('hidden');
        }, 3000);
    },

    // Handle canvas sizing responsiveness
    resizeCanvas() {
        // Redraw content because size updates clears context settings
        this.redrawCanvas();
    },

    setupEventHandlers() {
        // 1. Setup Screen mode buttons (Host vs Join)
        document.getElementById('mode-host-card').addEventListener('click', () => {
            document.getElementById('mode-host-card').classList.add('active');
            document.getElementById('mode-join-card').classList.remove('active');
            document.getElementById('room-code-group').classList.add('hidden');
            document.getElementById('action-btn').querySelector('span').innerText = "Create Lobby";
        });

        document.getElementById('mode-join-card').addEventListener('click', () => {
            document.getElementById('mode-join-card').classList.add('active');
            document.getElementById('mode-host-card').classList.remove('active');
            document.getElementById('room-code-group').classList.remove('hidden');
            document.getElementById('action-btn').querySelector('span').innerText = "Join Lobby";
        });

        // Randomize avatar
        document.getElementById('random-avatar-btn').addEventListener('click', () => this.randomizeAvatar());

        // Cycle avatar parts
        document.querySelectorAll('.avatar-nav').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const part = btn.getAttribute('data-part');
                const dir = btn.getAttribute('data-dir');
                this.cycleAvatarPart(part, dir);
            });
        });

        // 2. Action buttons (Create/Join)
        document.getElementById('action-btn').addEventListener('click', () => {
            sound.init(); // Init synth context upon first interaction
            const nameInput = document.getElementById('username-input').value.trim();
            if (!nameInput) {
                this.showToast("Please enter a nickname!");
                return;
            }
            this.myNickname = nameInput;

            const isHost = document.getElementById('mode-host-card').classList.contains('active');
            if (isHost) {
                network.initHost();
            } else {
                const code = document.getElementById('room-code-input').value.trim();
                if (!code) {
                    this.showToast("Please enter a Room Code!");
                    return;
                }
                network.initClient(code);
            }
        });

        // Copy room code
        document.getElementById('copy-code-btn').addEventListener('click', () => {
            const input = document.getElementById('share-code-display');
            input.select();
            document.execCommand('copy');
            this.showToast("Room code copied to clipboard!");
        });

        // Settings updates (Only works if host, listener updates state and broadcasts)
        document.querySelectorAll('.game-setting').forEach(setting => {
            setting.addEventListener('change', () => {
                if (network.isHost) {
                    network.broadcastSettings();
                }
            });
        });

        // Start Game
        document.getElementById('start-game-btn').addEventListener('click', () => {
            if (network.isHost) {
                network.startGame();
            }
        });

        // Back to lobby from podium
        document.getElementById('play-again-btn').addEventListener('click', () => {
            if (network.isHost) {
                network.resetToLobby();
            }
        });

        // 3. Drawing Interactions
        const getCanvasCoords = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            // Multi-touch / Single-touch handling
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            return {
                x: Math.round((clientX - rect.left) * scaleX),
                y: Math.round((clientY - rect.top) * scaleY)
            };
        };

        const startDraw = (e) => {
            // Check if user is the current drawer
            if (!this.isMyTurnToDraw()) return;
            e.preventDefault();
            const coords = getCanvasCoords(e);
            
            if (this.activeTool === 'bucket') {
                // Perform local flood fill
                this.floodFillLocal(coords.x, coords.y, this.currentColor);
                
                // Add fill action to history
                const fillObj = {
                    type: 'fill',
                    x: coords.x,
                    y: coords.y,
                    color: this.currentColor
                };
                this.drawHistory.push(fillObj);
                
                if (network.isHost) {
                    network.pushDrawHistory(fillObj);
                }
                
                // Broadcast fill to other clients
                network.sendDrawingData({
                    type: 'draw_segment',
                    tool: 'bucket',
                    x0: coords.x,
                    y0: coords.y,
                    color: this.currentColor
                });
                return;
            }

            this.isDrawing = true;
            this.lastX = coords.x;
            this.lastY = coords.y;
            this.currentStroke = [{ x: coords.x, y: coords.y }];
            
            // Draw a tiny dot immediately on click
            this.drawDot(coords.x, coords.y, this.currentColor, this.currentSize, this.isEraser);

            // Send the initial dot as a zero-length segment over the network
            network.sendDrawingData({
                type: 'draw_segment',
                x0: coords.x,
                y0: coords.y,
                x1: coords.x,
                y1: coords.y,
                color: this.currentColor,
                size: this.currentSize,
                eraser: this.isEraser
            });
        };

        const draw = (e) => {
            if (!this.isDrawing || !this.isMyTurnToDraw()) return;
            e.preventDefault();
            const coords = getCanvasCoords(e);
            
            this.drawLineSegment(
                this.lastX, this.lastY, coords.x, coords.y, 
                this.currentColor, this.currentSize, this.isEraser
            );
            
            // Log path segment
            this.currentStroke.push({ x: coords.x, y: coords.y });
            
            // Send drawing coordinate packet over network
            network.sendDrawingData({
                type: 'draw_segment',
                x0: this.lastX,
                y0: this.lastY,
                x1: coords.x,
                y1: coords.y,
                color: this.currentColor,
                size: this.currentSize,
                eraser: this.isEraser
            });

            this.lastX = coords.x;
            this.lastY = coords.y;
        };

        const stopDraw = () => {
            if (!this.isDrawing) return;
            this.isDrawing = false;
            if (this.currentStroke.length > 0) {
                // Add to client side draw history
                const strokeObj = {
                    type: 'stroke',
                    points: this.currentStroke,
                    color: this.currentColor,
                    size: this.currentSize,
                    isEraser: this.isEraser
                };
                this.drawHistory.push(strokeObj);
                
                // Host maintains history for late joiners / refreshes
                if (network.isHost) {
                    network.pushDrawHistory(strokeObj);
                }
            }
            this.currentStroke = [];
        };

        // Desktop mouse
        this.canvas.addEventListener('mousedown', startDraw);
        this.canvas.addEventListener('mousemove', draw);
        window.addEventListener('mouseup', stopDraw); // stop even if mouse is released outside canvas
        
        // Touch mobile
        this.canvas.addEventListener('touchstart', startDraw, { passive: false });
        this.canvas.addEventListener('touchmove', draw, { passive: false });
        window.addEventListener('touchend', stopDraw);

        // Drawing Tools
        const toolPencil = document.getElementById('tool-pencil');
        const toolBucket = document.getElementById('tool-bucket');
        const toolEraser = document.getElementById('tool-eraser');
        const toolClear = document.getElementById('tool-clear');
        const toolUndo = document.getElementById('tool-undo');

        if (toolPencil) {
            toolPencil.addEventListener('click', () => {
                this.isEraser = false;
                this.activeTool = 'pencil';
                toolPencil.classList.add('active');
                if (toolBucket) toolBucket.classList.remove('active');
                if (toolEraser) toolEraser.classList.remove('active');
            });
        }

        if (toolBucket) {
            toolBucket.addEventListener('click', () => {
                this.isEraser = false;
                this.activeTool = 'bucket';
                toolBucket.classList.add('active');
                if (toolPencil) toolPencil.classList.remove('active');
                if (toolEraser) toolEraser.classList.remove('active');
            });
        }

        if (toolEraser) {
            toolEraser.addEventListener('click', () => {
                this.isEraser = true;
                this.activeTool = 'eraser';
                toolEraser.classList.add('active');
                if (toolPencil) toolPencil.classList.remove('active');
                if (toolBucket) toolBucket.classList.remove('active');
            });
        }

        if (toolClear) {
            toolClear.addEventListener('click', () => {
                if (!this.isMyTurnToDraw()) return;
                this.clearCanvasLocal();
                network.sendDrawingData({ type: 'clear' });
                if (network.isHost) {
                    network.clearDrawHistory();
                }
            });
        }

        if (toolUndo) {
            toolUndo.addEventListener('click', () => {
                if (!this.isMyTurnToDraw()) return;
                this.undoLastStrokeLocal();
                network.sendDrawingData({ type: 'undo' });
            });
        }

        // Brush Size slider
        const sizeSlider = document.getElementById('brush-size');
        if (sizeSlider) {
            sizeSlider.addEventListener('input', (e) => {
                this.currentSize = parseInt(e.target.value);
                const display = document.getElementById('brush-size-display');
                if (display) display.innerText = `${this.currentSize}px`;
            });
        }

        // Color Swatches
        document.querySelectorAll('.color-swatch').forEach(swatch => {
            swatch.addEventListener('click', (e) => {
                document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
                swatch.classList.add('active');
                this.currentColor = swatch.getAttribute('data-color');
                this.isEraser = false;
                
                // If currently erasing, switch back to pencil tool
                if (this.activeTool === 'eraser') {
                    this.activeTool = 'pencil';
                }
                
                // Sync active classes
                if (this.activeTool === 'pencil') {
                    if (toolPencil) toolPencil.classList.add('active');
                    if (toolBucket) toolBucket.classList.remove('active');
                    if (toolEraser) toolEraser.classList.remove('active');
                } else if (this.activeTool === 'bucket') {
                    if (toolBucket) toolBucket.classList.add('active');
                    if (toolPencil) toolPencil.classList.remove('active');
                    if (toolEraser) toolEraser.classList.remove('active');
                }
            });
        });

        // Chat / guessing Form submission
        document.getElementById('chat-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('chat-input');
            const txt = input.value.trim();
            if (!txt) return;
            input.value = "";
            network.sendChatMessage(txt);
        });

        // Policy / Terms Modal handlers
        const policyModal = document.getElementById('policy-modal');
        const openTermsBtn = document.getElementById('open-terms-btn');
        const openPrivacyBtn = document.getElementById('open-privacy-btn');
        const closeModalBtn = document.getElementById('close-modal-btn');

        if (openTermsBtn) {
            openTermsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showPolicyModal('terms');
            });
        }
        if (openPrivacyBtn) {
            openPrivacyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showPolicyModal('privacy');
            });
        }
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                policyModal.classList.add('hidden');
            });
        }
        if (policyModal) {
            policyModal.addEventListener('click', (e) => {
                if (e.target === policyModal) {
                    policyModal.classList.add('hidden');
                }
            });
        }
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && policyModal && !policyModal.classList.contains('hidden')) {
                policyModal.classList.add('hidden');
            }
        });
    },

    isMyTurnToDraw() {
        return network.gameState && network.gameState.state === 'DRAWING' && network.gameState.currentDrawer === network.myId;
    },

    showPolicyModal(type) {
        const modal = document.getElementById('policy-modal');
        const title = document.getElementById('modal-title');
        const body = document.getElementById('modal-body');
        
        if (!modal || !title || !body) return;

        if (type === 'terms') {
            title.innerText = "Terms of Service";
            body.innerHTML = `
                <div class="policy-philosophy">
                    <p><strong>Do Doodle</strong> is built with a serverless mindset. We don't store your sessions, we don't host databases, and we don't manage user accounts. Your game is yours.</p>
                </div>
                <div class="policy-section">
                    <h3>1. Acceptance of Terms</h3>
                    <p>By accessing and playing Do Doodle, you agree to be bound by these Terms of Service. If you do not agree, please do not use the application.</p>
                </div>
                <div class="policy-section">
                    <h3>2. Peer-to-Peer Architecture</h3>
                    <p>Do Doodle operates strictly as a peer-to-peer (P2P) gaming platform. Direct data channels are established between player browsers using WebRTC. Lobbies and handshakes are orchestrated through PeerJS signaling brokers. Lobbies are temporary and ephemeral; no state is preserved once a connection is terminated.</p>
                </div>
                <div class="policy-section">
                    <h3>3. User Conduct</h3>
                    <p>You agree to use this platform responsibly and with respect for other players. Specifically, you agree not to:</p>
                    <ul>
                        <li>Draw offensive, sexually explicit, hateful, or abusive content on the canvas.</li>
                        <li>Send harassing, spammy, or harmful messages in the lobby chat.</li>
                        <li>Attempt to execute exploits, reverse engineer the communication channels, or disrupt the network stability of peers.</li>
                    </ul>
                </div>
                <div class="policy-section">
                    <h3>4. Disclaimer of Warranty</h3>
                    <p>Do Doodle is provided on an "as-is" and "as-available" basis without warranties of any kind. Lobbies rely entirely on the WebRTC connectivity of player networks. We do not guarantee uninterrupted service, lobby persistence, or the absolute safety of peer interactions.</p>
                </div>
            `;
        } else if (type === 'privacy') {
            title.innerText = "Privacy Policy";
            body.innerHTML = `
                <div class="policy-philosophy">
                    <p><strong>Core Philosophy:</strong> If we can't see your data, we can't lose it, sell it, or expose it.</p>
                </div>
                <div class="policy-section">
                    <h3>1. Zero Data Retention</h3>
                    <p>We do not operate backend servers, user profiles, or databases. Your selected nickname and avatar are temporary session variables that reside strictly within your browser's memory and are never uploaded or stored persistently.</p>
                </div>
                <div class="policy-section">
                    <h3>2. Direct WebRTC Communications</h3>
                    <p>Lobby updates, drawing canvas vectors, strokes, and guess chats are broadcasted directly between peers using WebRTC Data Channels. None of your drawing actions or chat logs are routed through or processed by our infrastructure. PeerJS broker servers are utilized solely to handshake and exchange connection metadata (SDP/candidate exchange).</p>
                </div>
                <div class="policy-section">
                    <h3>3. No Tracking & Analytics</h3>
                    <p>We do not deploy telemetry, Google Analytics, social media tracking pixels, or third-party cookies. We do not track who you play with, how long you play, or what you draw.</p>
                </div>
                <div class="policy-section">
                    <h3>4. Immediate Session Erasure</h3>
                    <p>Because all data is processed in-memory or locally, exiting the lobby or closing your browser tab instantly terminates the peer connection and completely purges all session traces (including nickname, drawings, and chat logs) from your device.</p>
                </div>
            `;
        }

        modal.classList.remove('hidden');
    },

    // Drawing Canvas Primitives
    drawDot(x, y, color, size, eraser) {
        this.ctx.beginPath();
        this.ctx.fillStyle = eraser ? "#ffffff" : color;
        this.ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        this.ctx.fill();
    },

    drawLineSegment(x0, y0, x1, y1, color, size, eraser) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = eraser ? "#ffffff" : color;
        this.ctx.lineWidth = size;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.moveTo(x0, y0);
        this.ctx.lineTo(x1, y1);
        this.ctx.stroke();
    },

    handleDrawSegment(data) {
        if (data.tool === 'bucket') {
            this.floodFillLocal(data.x0, data.y0, data.color);
            this.drawHistory.push({
                type: 'fill',
                x: data.x0,
                y: data.y0,
                color: data.color
            });
            return;
        }

        this.drawLineSegment(data.x0, data.y0, data.x1, data.y1, data.color, data.size, data.eraser);
        
        const lastStroke = this.drawHistory[this.drawHistory.length - 1];
        if (lastStroke && lastStroke.type === 'stroke' && lastStroke.color === data.color && lastStroke.size === data.size && lastStroke.isEraser === data.eraser) {
            lastStroke.points.push({ x: data.x1, y: data.y1 });
        } else {
            this.drawHistory.push({
                type: 'stroke',
                points: [{ x: data.x0, y: data.y0 }, { x: data.x1, y: data.y1 }],
                color: data.color,
                size: data.size,
                isEraser: data.eraser
            });
        }
    },

    clearCanvasLocal() {
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawHistory = [];
    },

    undoLastStrokeLocal() {
        this.drawHistory.pop();
        if (network.isHost) {
            network.popDrawHistory();
        }
        this.redrawCanvas();
    },

    redrawCanvas() {
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let stroke of this.drawHistory) {
            if (stroke.type === 'fill') {
                this.floodFillLocal(stroke.x, stroke.y, stroke.color);
                continue;
            }
            if (!stroke.points || stroke.points.length === 0) continue;
            
            // Draw initial point
            const start = stroke.points[0];
            this.drawDot(start.x, start.y, stroke.color, stroke.size, stroke.isEraser);
            
            // Draw line segments
            for (let i = 1; i < stroke.points.length; i++) {
                const prev = stroke.points[i - 1];
                const curr = stroke.points[i];
                this.drawLineSegment(prev.x, prev.y, curr.x, curr.y, stroke.color, stroke.size, stroke.isEraser);
            }
        }
    },

    hexToRgba(hex) {
        if (!hex || typeof hex !== 'string') return null;
        hex = hex.replace('#', '');
        if (hex.length === 3) {
            hex = hex.split('').map(char => char + char).join('');
        }
        if (hex.length === 6) {
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            return { r, g, b, a: 255 };
        }
        return null;
    },

    floodFillLocal(startX, startY, fillColor) {
        if (startX === undefined || startY === undefined) return;
        startX = Math.floor(Number(startX));
        startY = Math.floor(Number(startY));
        if (isNaN(startX) || isNaN(startY)) return;

        const width = this.canvas.width;
        const height = this.canvas.height;
        if (startX < 0 || startX >= width || startY < 0 || startY >= height) return;
        
        const imgData = this.ctx.getImageData(0, 0, width, height);
        const data = imgData.data;
        
        const fillRgba = this.hexToRgba(fillColor);
        if (!fillRgba) return;
        
        const startPos = (startY * width + startX) * 4;
        const startR = data[startPos];
        const startG = data[startPos + 1];
        const startB = data[startPos + 2];
        const startA = data[startPos + 3];
        
        // If target and replacement colors are already the same, skip
        if (
            startR === fillRgba.r && 
            startG === fillRgba.g && 
            startB === fillRgba.b && 
            startA === fillRgba.a
        ) {
            return;
        }
        
        let head = 0;
        const queue = [startY * width + startX];
        const visited = new Uint8Array(width * height);
        visited[startY * width + startX] = 1;
        
        const matchColor = (nIdx) => {
            const nPos = nIdx * 4;
            return Math.abs(data[nPos] - startR) < 10 &&
                   Math.abs(data[nPos + 1] - startG) < 10 &&
                   Math.abs(data[nPos + 2] - startB) < 10 &&
                   Math.abs(data[nPos + 3] - startA) < 10;
        };
        
        while (head < queue.length) {
            const idx = queue[head++];
            const cx = idx % width;
            const cy = Math.floor(idx / width);
            
            const pos = idx * 4;
            data[pos] = fillRgba.r;
            data[pos + 1] = fillRgba.g;
            data[pos + 2] = fillRgba.b;
            data[pos + 3] = fillRgba.a;
            
            // Check 4 neighbors
            if (cx > 0) {
                const nIdx = idx - 1;
                if (!visited[nIdx] && matchColor(nIdx)) {
                    visited[nIdx] = 1;
                    queue.push(nIdx);
                }
            }
            if (cx < width - 1) {
                const nIdx = idx + 1;
                if (!visited[nIdx] && matchColor(nIdx)) {
                    visited[nIdx] = 1;
                    queue.push(nIdx);
                }
            }
            if (cy > 0) {
                const nIdx = idx - width;
                if (!visited[nIdx] && matchColor(nIdx)) {
                    visited[nIdx] = 1;
                    queue.push(nIdx);
                }
            }
            if (cy < height - 1) {
                const nIdx = idx + width;
                if (!visited[nIdx] && matchColor(nIdx)) {
                    visited[nIdx] = 1;
                    queue.push(nIdx);
                }
            }
        }
        
        this.ctx.putImageData(imgData, 0, 0);
    },

    // DOM Injectors
    updateLobbyPlayersList(players) {
        const container = document.getElementById('lobby-players-list');
        container.innerHTML = "";
        
        document.getElementById('player-count-badge').innerText = `${players.length} / 10`;

        players.forEach(p => {
            const item = document.createElement('div');
            item.className = 'player-item';
            
            const avatarSvg = this.generateAvatarSVG(p.avatar);
            const isMe = p.id === network.myId;
            const isHost = p.id === network.hostId;

            item.innerHTML = `
                <div class="player-info-meta">
                    <div class="player-avatar-mini">${avatarSvg}</div>
                    <span class="player-name-text">${escapeHTML(p.name)}</span>
                </div>
                <div class="btn-group">
                    ${isHost ? '<span class="player-badge-pill host"><i class="fa-solid fa-crown"></i> Host</span>' : ''}
                    ${isMe ? '<span class="player-badge-pill you">You</span>' : ''}
                </div>
            `;
            container.appendChild(item);
        });

        // Toggle settings inputs enabling/disabling
        const settingInputs = document.querySelectorAll('.game-setting');
        settingInputs.forEach(input => {
            if (network.isHost) {
                input.removeAttribute('disabled');
            } else {
                input.setAttribute('disabled', 'true');
            }
        });

        // Toggle Start Button visibility
        const startBtn = document.getElementById('start-game-btn');
        if (network.isHost) {
            startBtn.removeAttribute('disabled');
            startBtn.innerHTML = `<i class="fa-solid fa-play"></i> Start Game`;
        } else {
            startBtn.setAttribute('disabled', 'true');
            startBtn.innerHTML = `<i class="fa-solid fa-hourglass"></i> Waiting for Host...`;
        }
    },

    updateScoreboard(players, gameState) {
        const container = document.getElementById('scoreboard-list');
        container.innerHTML = "";

        // Sort players descending score
        const sorted = [...players].sort((a,b) => b.score - a.score);

        sorted.forEach(p => {
            const item = document.createElement('div');
            
            let extraClass = "";
            let statusIcons = "";
            
            const isDrawer = gameState && gameState.state === 'DRAWING' && gameState.currentDrawer === p.id;
            const hasGuessed = gameState && gameState.correctGuessers && gameState.correctGuessers.includes(p.id);

            if (isDrawer) {
                extraClass = "drawing";
                statusIcons = `<span class="draw-pencil"><i class="fa-solid fa-pencil"></i></span>`;
            } else if (hasGuessed) {
                extraClass = "guessed";
                statusIcons = `<span class="guess-check"><i class="fa-solid fa-circle-check"></i></span>`;
            }

            item.className = `score-item ${extraClass}`;
            const avatarSvg = this.generateAvatarSVG(p.avatar);

            item.innerHTML = `
                <div class="score-player">
                    <div class="player-avatar-mini" style="width: 28px; height: 28px;">${avatarSvg}</div>
                    <span class="score-player-name">${escapeHTML(p.name)}</span>
                </div>
                <span class="score-val">${p.score} pts</span>
                <div class="score-status-icons">${statusIcons}</div>
            `;
            container.appendChild(item);
        });
    },

    appendChatMessage(senderName, text, type = 'normal') {
        const container = document.getElementById('chat-messages');
        const msg = document.createElement('div');
        
        if (type === 'system') {
            msg.className = 'chat-msg system';
            msg.innerHTML = `<span>${escapeHTML(text)}</span>`;
        } else if (type === 'correct') {
            msg.className = 'chat-msg correct-guess';
            msg.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${escapeHTML(text)}</span>`;
        } else if (type === 'close') {
            msg.className = 'chat-msg close-guess';
            msg.innerHTML = `<span>${escapeHTML(text)}</span>`;
        } else {
            msg.className = 'chat-msg';
            msg.innerHTML = `<span class="msg-sender">${escapeHTML(senderName)}:</span> <span>${escapeHTML(text)}</span>`;
        }
        
        container.appendChild(msg);
        // Scroll to bottom
        container.scrollTop = container.scrollHeight;
    },

    renderWordState(gameState) {
        const display = document.getElementById('word-display');
        const hint = document.getElementById('word-hint');
        
        hint.innerText = "Category: Dictionary Word";

        if (gameState.state === 'SELECTING_WORD') {
            display.innerText = "Selecting word...";
            return;
        }

        if (gameState.currentDrawer === network.myId) {
            // I am drawing, show full word!
            display.innerHTML = `<span style="color: var(--color-success); font-family: inherit;">${gameState.currentWord.toUpperCase()}</span>`;
        } else {
            // I am guessing, show hints
            let blanks = "";
            const word = gameState.currentWord || "";
            const correctGuessers = gameState.correctGuessers || [];
            
            // If I already guessed correctly, show me the full word!
            if (correctGuessers.includes(network.myId)) {
                display.innerHTML = `<span style="color: var(--color-success); font-family: inherit;">${word.toUpperCase()}</span>`;
            } else {
                // Otherwise show dashes
                for (let char of word) {
                    if (char === " ") {
                        blanks += "&nbsp;&nbsp;";
                    } else {
                        blanks += "_ ";
                    }
                }
                display.innerHTML = blanks.trim();
            }
        }
    },

    updateTimerDisplay(timeRemaining, maxTime) {
        document.getElementById('game-timer').innerText = timeRemaining;
        
        // Progress circle calculation
        const percent = (timeRemaining / maxTime) * 100;
        const progressCircle = document.getElementById('timer-progress');
        progressCircle.setAttribute('stroke-dasharray', `${percent}, 100`);

        if (timeRemaining <= 10) {
            progressCircle.classList.add('timer-urgent');
            if (timeRemaining > 0) sound.tick();
        } else {
            progressCircle.classList.remove('timer-urgent');
        }
    },

    // Show Word Selection Panel (for the drawer)
    showWordSelectionOverlay(words) {
        const overlay = document.getElementById('canvas-overlay');
        const title = document.getElementById('overlay-title');
        const desc = document.getElementById('overlay-desc');
        const options = document.getElementById('word-options');

        title.innerText = "Choose a Word";
        desc.innerText = "You are drawing! Choose a word to start:";
        options.innerHTML = "";

        words.forEach(word => {
            const btn = document.createElement('button');
            btn.className = 'word-btn';
            btn.innerText = word;
            btn.addEventListener('click', () => {
                network.selectWord(word);
                overlay.classList.add('hidden');
            });
            options.appendChild(btn);
        });

        overlay.classList.remove('hidden');
    },

    // Show Word Selecting State (for the guessers)
    showWordSelectingOverlayForGuessers(drawerName) {
        const overlay = document.getElementById('canvas-overlay');
        const title = document.getElementById('overlay-title');
        const desc = document.getElementById('overlay-desc');
        const options = document.getElementById('word-options');

        title.innerText = "Selecting Word...";
        desc.innerText = `${drawerName} is picking a word to draw. Prepare your guesses!`;
        options.innerHTML = `<div style="font-size: 28px; color: var(--text-secondary); margin-top: 10px;"><i class="fa-solid fa-spinner fa-spin"></i></div>`;

        overlay.classList.remove('hidden');
    },

    hideCanvasOverlay() {
        document.getElementById('canvas-overlay').classList.add('hidden');
    },

    // Renders the Final Podium Screen
    showPodium(players) {
        this.showScreen('game-over-screen');
        sound.victory();

        // Sort players descending score
        const sorted = [...players].sort((a,b) => b.score - a.score);

        // Reset podium fields
        for (let i = 1; i <= 3; i++) {
            document.getElementById(`podium-avatar-${i}`).innerHTML = "";
            document.getElementById(`podium-name-${i}`).innerText = "-";
            document.getElementById(`podium-score-${i}`).innerText = "0 pts";
        }

        // Fill podium spots
        if (sorted[0]) {
            document.getElementById('podium-avatar-1').innerHTML = this.generateAvatarSVG(sorted[0].avatar);
            document.getElementById('podium-name-1').innerText = sorted[0].name;
            document.getElementById('podium-score-1').innerText = `${sorted[0].score} pts`;
            confetti.spawn(140);
        }
        if (sorted[1]) {
            document.getElementById('podium-avatar-2').innerHTML = this.generateAvatarSVG(sorted[1].avatar);
            document.getElementById('podium-name-2').innerText = sorted[1].name;
            document.getElementById('podium-score-2').innerText = `${sorted[1].score} pts`;
        }
        if (sorted[2]) {
            document.getElementById('podium-avatar-3').innerHTML = this.generateAvatarSVG(sorted[2].avatar);
            document.getElementById('podium-name-3').innerText = sorted[2].name;
            document.getElementById('podium-score-3').innerText = `${sorted[2].score} pts`;
        }

        // Fill full leaderboard table
        const tbody = document.getElementById('final-leaderboard-body');
        tbody.innerHTML = "";
        sorted.forEach((p, idx) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>#${idx + 1}</strong></td>
                <td style="display: flex; align-items: center; gap: 8px;">
                    <div class="player-avatar-mini" style="width: 24px; height: 24px;">${this.generateAvatarSVG(p.avatar)}</div>
                    ${escapeHTML(p.name)}
                </td>
                <td>${p.score} pts</td>
            `;
            tbody.appendChild(tr);
        });

        // Hide play again action if client (Only host can trigger reset)
        if (!network.isHost) {
            document.getElementById('play-again-btn').style.display = 'none';
        } else {
            document.getElementById('play-again-btn').style.display = 'inline-flex';
        }
    }
};

// ==========================================
// 5. HELPER UTILITIES
// ==========================================
function escapeHTML(str) {
    if (!str) return "";
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

// Window load init
window.addEventListener('DOMContentLoaded', () => game.init());
