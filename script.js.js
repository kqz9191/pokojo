// Register GSAP plugins
gsap.registerPlugin(TextPlugin);

// --- EXACT MESSAGE TEXT ---
const romanticText = `любимая,не знаю меня трусит как ебанутого я оч переживаю за все. переживаю за наши отношения я с тобой.я правда хочу быть всегда только с тобой,быть твоим любимым, просто чтобы ты меня любила а я тебя. правда тебя люблю очень сильно, и переживаю за то, чтобы мы всегда были вместе,всегда проходили все трудные моменты,всегда друг друг доверяли и говорили вместе обо всех проблемах,которые у нас есть или будут. если мы будем это обсуждать,мы будем понимать что не так. если будем понимать,то будем вместе и под друг друга настраиваться и что то менять. только так, моя любимая, мы сможем быть с тобой до конца наших дней. правда хочу эту всю жизнь прожить с тобой,ты просто такая ну мой самый лучший идеал. ты моя просто частичка жизни, ну как частичка, ПРЯМ ЧАСТЬ вот. ты самое лучшее что есть у меня сейчас, самое лучшее что будешь в этой жизни. я от тебя ничего не требую,когда мы съедемся даже заставлять делать ничего не хочу.хочу чтобы ты наслаждалась свободной жизнью, полную радости и всего такого. ну крч я хочу сделать тебя самой счастливой. ты этого заслуживаешь. я просто создан чтобы любить только тебя\nправда люблю тебя очень сильно,хочу стараться для тебя, хочу целовать тебя, хочу с тобой в обнимочку такую спать мививипт. это просто моя мечта в жизни,которую я обязательно добьюсь. ты мое все, прям все что только можно. ты лучше кислорода,которым я дышу, ну крч я с тобой очень счастлив. просто люби меня,верь мне и ничего не скрывай. я от тебя тоже ничего скрывать не буду. в моих глазах ты самая самая красивая девочка, и самое главное ты моя любимая. я щас это пишу и сам себе не верю что ты именно моя хвэф я не знаю что сказать просто ты лучшая самая. очень рад что из 8 миллиардов человек попалась мне именно ты. просто представь 8 миллиард человек и из всех них ты светишься ярким теплым огоньком у меня в глазах и у меня с сердечке вот таком ❤️. ну это просто не знаю чодвзцжупттвлфжйу. запомни мои слова, ты лучшая, ты любимая мной и ты всегда будешь такой. я тебя никогда не разлюблю, клянусь нашими отношениями, а как ты видишь я не хочу их терять по этому это навсегда. очень сильно хочу в будущем сделать тебе предложение,хочу чтобы ты была моей женой. люблю тебя очень сильно,сладких снов спокойной ночи любименькая моя,желаю тебе только лучшего 🫶`;

// --- THREE.JS SETUP ---
const canvas = document.getElementById('webgl-canvas');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = window.innerWidth < 768 ? 60 : 40;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Math generation for shapes
function createHeartPoints(count, scale, noiseVol = 1) {
    const pts = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const t = Math.random() * Math.PI * 2;
        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        let z = 0;

        // Depth and organic volume
        const volume = Math.random() * noiseVol;
        x += (Math.random() - 0.5) * volume;
        y += (Math.random() - 0.5) * volume;
        z += (Math.random() - 0.5) * volume * 4;

        pts[i * 3] = x * scale;
        pts[i * 3 + 1] = y * scale;
        pts[i * 3 + 2] = z * scale;
    }
    return pts;
}

function createSpherePoints(count, radius) {
    const pts = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const r = radius * Math.cbrt(Math.random());

        pts[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pts[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pts[i * 3 + 2] = r * Math.cos(phi);
    }
    return pts;
}

// Particle System
const particleCount = window.innerWidth < 768 ? 6000 : 12000;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const targets = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

// Initial State: Tiny point in center
for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 0.1;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
    
    const color = new THREE.Color();
    color.setHSL(0.85 + Math.random() * 0.1, 1.0, 0.6); // Neon pink/purple range
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('targetPos', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// Custom Shader for buttery smooth morphing
const material = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uHeartbeat: { value: 0 }
    },
    vertexShader: `
        attribute vec3 targetPos;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float uProgress;
        uniform float uTime;
        uniform float uHeartbeat;

        void main() {
            vColor = color;
            vec3 currentPos = mix(position, targetPos, uProgress);

            // Soft floating effect
            currentPos.x += sin(uTime * 1.5 + currentPos.y) * 0.1;
            currentPos.y += cos(uTime * 1.5 + currentPos.x) * 0.1;

            // Heartbeat scale pulse
            currentPos *= (1.0 + uHeartbeat * 0.15);

            vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
            gl_PointSize = (12.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
        }
    `,
    fragmentShader: `
        varying vec3 vColor;
        void main() {
            vec2 xy = gl_PointCoord.xy - vec2(0.5);
            float ll = length(xy);
            if(ll > 0.5) discard;
            float alpha = (0.5 - ll) * 2.0;
            gl_FragColor = vec4(vColor, alpha);
        }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// State Configurations
const stateIntro = createHeartPoints(particleCount, 0.08, 0.5);
const stateUniverse = createSpherePoints(particleCount, 80);
const stateLargeHeart = createHeartPoints(particleCount, 0.35, 1.5);
const stateExplode = createSpherePoints(particleCount, 150);
const stateFinalHeart = createHeartPoints(particleCount, 0.6, 2.5);

function morphParticlesTo(targetArray, duration = 2.5, ease = "power3.inOut") {
    geometry.setAttribute('targetPos', new THREE.BufferAttribute(targetArray, 3));
    material.uniforms.uProgress.value = 0;
    return gsap.to(material.uniforms.uProgress, {
        value: 1,
        duration: duration,
        ease: ease,
        onComplete: () => {
            geometry.setAttribute('position', new THREE.BufferAttribute(targetArray, 3));
            material.uniforms.uProgress.value = 0;
        }
    });
}

// --- DOM LOGIC & SCENE FLOW ---
let isFinalScene = false;
let clock = new THREE.Clock();

// UI Elements
const sceneIntro = document.getElementById('scene-intro');
const sceneMessage = document.getElementById('scene-message');
const sceneFinal = document.getElementById('scene-final');
const btnContinue = document.getElementById('btn-continue');
const btnRestart = document.getElementById('btn-restart');
const audio = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');

// Initialize First Frame -> Intro Heart
morphParticlesTo(stateIntro, 2);

document.getElementById('click-target').addEventListener('click', () => {
    // 1. Play Music
    if (audio.paused) {
        audio.volume = 0.4;
        audio.play().catch(e => console.log("Audio play prevented", e));
        musicToggle.innerText = '🎵';
    }

    // 2. Hide Intro
    sceneIntro.classList.remove('active');
    setTimeout(() => sceneIntro.classList.add('hidden'), 1500);

    // 3. Zoom out to Universe
    morphParticlesTo(stateUniverse, 3);
    gsap.to(camera.position, { z: window.innerWidth < 768 ? 40 : 25, duration: 3, ease: "power2.inOut" });

    // 4. Form Large Heart
    setTimeout(() => {
        morphParticlesTo(stateLargeHeart, 3.5);
    }, 4000);

    // 5. Explode and Show Message Scene
    setTimeout(() => {
        morphParticlesTo(stateExplode, 2.5, "power4.out");
        
        sceneMessage.classList.remove('hidden');
        setTimeout(() => sceneMessage.classList.add('active'), 100);

        // Start Cinematic Typing
        startTypingAnimation();
    }, 9000);
});

function startTypingAnimation() {
    const textContainer = document.getElementById('message-text');
    textContainer.innerHTML = "";
    
    // Smooth cinematic typing
    gsap.to(textContainer, {
        duration: 35, // Gives enough time to read or watch assembly
        text: romanticText,
        ease: "none",
        onUpdate: createTypingSpark,
        onComplete: () => {
            btnContinue.classList.remove('hidden-btn');
            gsap.to(btnContinue, { opacity: 1, pointerEvents: 'auto', duration: 1 });
        }
    });
}

// Suble sparkles appearing around text container while typing
function createTypingSpark() {
    if(Math.random() > 0.2) return;
    const spark = document.createElement('div');
    spark.style.position = 'absolute';
    spark.style.width = '4px';
    spark.style.height = '4px';
    spark.style.background = '#ff2a85';
    spark.style.boxShadow = '0 0 10px #ff2a85';
    spark.style.borderRadius = '50%';
    
    // Random position within glass panel
    const panel = document.querySelector('.glass-panel');
    spark.style.left = (Math.random() * 100) + '%';
    spark.style.top = (Math.random() * 100) + '%';
    
    panel.appendChild(spark);
    
    gsap.to(spark, {
        y: -50,
        opacity: 0,
        duration: 1 + Math.random(),
        onComplete: () => spark.remove()
    });
}

// Continue Button Click -> Final Scene
btnContinue.addEventListener('click', () => {
    // Text container melts/lifts into the air
    gsap.to(".glass-panel", {
        y: -150,
        opacity: 0,
        filter: "blur(20px)",
        duration: 2,
        onComplete: () => {
            sceneMessage.classList.remove('active');
            sceneMessage.classList.add('hidden');
        }
    });

    // Morph to Massive Final Heart
    morphParticlesTo(stateFinalHeart, 3.5);
    
    // Zoom out slightly for massive heart
    gsap.to(camera.position, { z: window.innerWidth < 768 ? 55 : 35, duration: 3 });

    setTimeout(() => {
        isFinalScene = true;
        sceneFinal.classList.remove('hidden');
        setTimeout(() => sceneFinal.classList.add('active'), 50);
        
        gsap.to(".final-text", { opacity: 1, y: -20, duration: 2, ease: "power2.out" });
        spawnFloatingHearts();
    }, 2500);
});

// Restart Button
btnRestart.addEventListener('click', () => {
    isFinalScene = false;
    sceneFinal.classList.remove('active');
    setTimeout(() => sceneFinal.classList.add('hidden'), 1000);
    
    gsap.to(camera.position, { z: window.innerWidth < 768 ? 60 : 40, duration: 2 });
    morphParticlesTo(stateIntro, 2);
    
    setTimeout(() => {
        sceneIntro.classList.remove('hidden');
        setTimeout(() => sceneIntro.classList.add('active'), 100);
        document.getElementById('message-text').innerHTML = "";
        btnContinue.classList.add('hidden-btn');
        btnContinue.style.opacity = '0';
        btnContinue.style.pointerEvents = 'none';
        gsap.set(".glass-panel", {y: 0, opacity: 1, filter: "blur(0px)"});
        gsap.set(".final-text", { opacity: 0, y: 0 });
    }, 2000);
});

// Mini hearts floating in final scene
function spawnFloatingHearts() {
    if (!isFinalScene) return;
    
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerText = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (4 + Math.random() * 4) + 's';
    heart.style.fontSize = (15 + Math.random() * 15) + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 8000);
    setTimeout(spawnFloatingHearts, 300);
}

// --- INTERACTIVITY & LOOP ---
// Mouse Parallax
let mouseX = 0;
let mouseY = 0;
const cursor = document.querySelector('.cursor-glow');

window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out"
    });
});

// Music Toggle
musicToggle.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        musicToggle.innerText = '🎵';
    } else {
        audio.pause();
        musicToggle.innerText = '🔇';
    }
});

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Render Loop
function animate() {
    requestAnimationFrame(animate);
    
    const time = clock.getElapsedTime();
    material.uniforms.uTime.value = time;
    
    // Smooth camera parallax
    scene.rotation.x += (mouseY * 0.1 - scene.rotation.x) * 0.02;
    scene.rotation.y += (mouseX * 0.1 - scene.rotation.y) * 0.02;
    
    // Heartbeat pulse calculation
    if (isFinalScene) {
        // Creates a beating rhythm
        let pulse = Math.pow(Math.sin(time * 3), 10);
        material.uniforms.uHeartbeat.value = pulse * 0.4;
    } else {
        material.uniforms.uHeartbeat.value = 0;
    }
    
    renderer.render(scene, camera);
}
animate();