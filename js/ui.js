// js/ui.js - Bit-by-Bit Terminal UI & Effects

const commandInput = document.getElementById('command-input');
const terminalOutput = document.getElementById('terminal-output');
const terminalHeader = document.getElementById('terminal-header');

const ASCII_BOOT_LOGO = `

░▒▓███████▓▒░░▒▓█▓▒░▒▓████████▓▒░▒▓███████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░░▒▓█▓▒░▒▓████████▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░  ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░  ░▒▓█▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░  ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░  ░▒▓█▓▒░
░▒▓███████▓▒░░▒▓█▓▒░  ░▒▓█▓▒░   ░▒▓███████▓▒░ ░▒▓██████▓▒░░▒▓███████▓▒░░▒▓█▓▒░  ░▒▓█▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░  ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░  ░▒▓█▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░  ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░  ░▒▓█▓▒░
░▒▓███████▓▒░░▒▓█▓▒░  ░▒▓█▓▒░   ░▒▓███████▓▒░   ░▒▓█▓▒░   ░▒▓███████▓▒░░▒▓█▓▒░  ░▒▓█▓▒░

  BIT-BY-BIT BUDDY V2
`;

async function scrambleText(message, className = 'system-msg', speed = 30) {
    if (isSkipping) {
        appendToOutput(message, className);
        return;
    }
    const chars = '!<>-_\/[]{}|+=+*^?#________';
    const line = document.createElement('pre');
    if (className) line.classList.add(className);
    terminalOutput.appendChild(line);

    for (let i = 0; i < message.length; i++) {
        if (isSkipping) break;
        let iterations = 0;
        const maxIterations = 3;
        
        while (iterations < maxIterations) {
            const scrambled = message.substring(0, i) + 
                             chars[Math.floor(Math.random() * chars.length)] + 
                             message.substring(i + 1).replace(/./g, () => chars[Math.floor(Math.random() * chars.length)]);
            line.textContent = scrambled;
            if (typeof audio !== 'undefined') audio.playScramble();
            await new Promise(r => setTimeout(r, speed / 2));
            iterations++;
        }
        line.textContent = message.substring(0, i + 1) + message.substring(i + 1).replace(/./g, () => chars[Math.floor(Math.random() * chars.length)]);
    }
    line.textContent = message;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function appendToOutput(message, className = 'system-msg') {
    const line = document.createElement('pre');
    line.textContent = message;
    if (className) line.classList.add(className);
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    return line;
}

async function typeWriterOutput(message, className = 'system-msg', speed = 10) {
    if (isSkipping) {
        appendToOutput(message, className);
        return;
    }
    const line = document.createElement('pre');
    if (className) line.classList.add(className);
    terminalOutput.appendChild(line);
    for (let i = 0; i < message.length; i++) {
        if (isSkipping) {
            line.textContent = message;
            break;
        }
        line.textContent += message.charAt(i);
        if (i % 3 === 0) {
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
            if (typeof audio !== 'undefined') audio.playTick();
        }
        await new Promise(r => setTimeout(r, speed));
    }
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

async function showProgressBar(duration = 2000) {
    if (isSkipping) return;
    const barLength = 20;
    const line = document.createElement('pre');
    line.className = 'system-msg';
    terminalOutput.appendChild(line);
    for (let i = 0; i <= barLength; i++) {
        if (isSkipping) break;
        const percent = Math.round((i / barLength) * 100);
        const progress = "█".repeat(i) + "░".repeat(barLength - i);
        line.textContent = `Lade System-Komponenten: [${progress}] ${percent}%`;
        await new Promise(r => setTimeout(r, duration / barLength));
    }
    line.textContent += " [OK]";
}

function refreshHeader() {
    const statusPre = document.querySelector('.status-box');
    if (statusPre) {
        statusPre.textContent = getBuddyStatus();
        statusPre.classList.remove('mood-happy', 'mood-neutral', 'mood-angry', 'mood-worried', 'mood-proud');
        statusPre.classList.add(`mood-${buddyMood}`);
    }
    const miniName = document.getElementById('mini-user-name');
    if (miniName) miniName.textContent = userName.toUpperCase();
    
    const miniRank = document.getElementById('mini-user-rank');
    if (miniRank) miniRank.textContent = userStats.rank.toUpperCase();
}

async function showHeader() {
    if (terminalHeader.innerHTML !== '') {
        refreshHeader();
        return;
    }
    
    terminalHeader.innerHTML = '';
    const container = document.createElement('div');
    container.className = 'side-by-side';
    terminalHeader.appendChild(container);

    const logoPre = document.createElement('pre');
    logoPre.className = 'success-msg';
    container.appendChild(logoPre);

    const wrapper = document.createElement('div');
    wrapper.className = 'buddy-user-wrapper';
    container.appendChild(wrapper);

    const statusPre = document.createElement('pre');
    statusPre.className = 'status-box buddy-active';
    statusPre.classList.add(`mood-${buddyMood}`);
    statusPre.textContent = getBuddyStatus();
    wrapper.appendChild(statusPre);

    const userMiniBox = document.createElement('div');
    userMiniBox.className = 'user-mini-box';
    wrapper.appendChild(userMiniBox);

    const nameSpan = document.createElement('div');
    nameSpan.id = 'mini-user-name';
    nameSpan.className = 'mini-name';
    userMiniBox.appendChild(nameSpan);

    const rankSpan = document.createElement('div');
    rankSpan.id = 'mini-user-rank';
    rankSpan.className = 'mini-rank';
    userMiniBox.appendChild(rankSpan);

    const lines = ASCII_BOOT_LOGO.split('\n');
    for (const line of lines) {
        logoPre.textContent += line + '\n';
        if (typeof audio !== 'undefined') audio.playTick();
        await new Promise(r => setTimeout(r, 40));
    }
    
    refreshHeader();
}

function renderMenu() {
    const header = document.createElement('pre'); header.className = 'menu-header';
    if (menuState.type === 'chapters') header.textContent = '\n--- KAPITELAUSWAHL ---';
    else if (menuState.type === 'settings') header.textContent = '\n--- EINSTELLUNGEN ---';
    else if (menuState.type === 'learning') header.textContent = '\n--- WISSENSTRANSFER (LERNEN) ---';
    else header.textContent = '\n--- UNTERTHEMEN ---';
    terminalOutput.appendChild(header);
    
    menuState.items.forEach((item, index) => {
        const line = document.createElement('pre');
        line.className = 'menu-item' + (index === menuState.selectedIndex ? ' selected' : '');
        let label = item.title;
        if (item.subsections) label = `${item.title} (${item.subsections.length} Themen)`;
        else if (item.priority) label = `${item.priority === 'sehr hoch' ? '[!!!]' : '[!  ]'} ${item.title}`;
        line.textContent = index === menuState.selectedIndex ? ` > ${label} <` : `   ${label}`;
        terminalOutput.appendChild(line);
    });
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Fireworks implementation from Codepen 3 (TheBrutalTooth)
// This will need a canvas element in index.html later.
async function showFireworks() {
    appendToOutput("\n[SYSTEM]: STARTE ERFOLGS-EMULATION... [BITTE WARTEN]");
    const canvas = document.createElement('canvas');
    canvas.id = 'fireworks-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const colors = ['#00e0c6', '#ff0055', '#ffcc00', '#ffffff'];

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.velocity = {
                x: (Math.random() - 0.5) * 8,
                y: (Math.random() - 0.5) * 8
            };
            this.alpha = 1;
            this.friction = 0.95;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }

        update() {
            this.velocity.x *= this.friction;
            this.velocity.y *= this.friction;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= 0.01;
        }
    }

    function createFirework(x, y) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        for (let i = 0; i < 30; i++) {
            particles.push(new Particle(x, y, color));
        }
    }

    let startTime = Date.now();
    function animate() {
        if (Date.now() - startTime > 60000) { // Max 60 seconds
            canvas.remove();
            return;
        }
        requestAnimationFrame(animate);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (Math.random() < 0.05) {
            createFirework(Math.random() * canvas.width, Math.random() * canvas.height);
        }

        particles.forEach((particle, index) => {
            if (particle.alpha > 0) {
                particle.update();
                particle.draw();
            } else {
                particles.splice(index, 1);
            }
        });
    }

    animate();
    
    // Prompt while fireworks are running
    await typeWriterOutput("\n[BiB]: GENIAL! Du hast es drauf.");
    appendToOutput("Tippe /topics für die Übersicht oder Enter für das nächste Kapitel.");
}
