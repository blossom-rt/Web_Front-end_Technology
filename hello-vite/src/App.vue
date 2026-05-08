<template>
  <div class="sci-fi-bg" @click="createRipple" @mousemove="updateMouse">
    <div class="stars"></div>
    <div class="scanline"></div>
    <div class="mouse-glow" :style="{ left: mouseX + 'px', top: mouseY + 'px' }"></div>

    <div class="ripple-container">
      <div v-for="ripple in ripples" :key="ripple.id" 
           class="ripple" :style="{ left: ripple.x + 'px', top: ripple.y + 'px' }"></div>
    </div>

    <div class="hologram-card">
      <h1 class="neon-text">{{ displayText }}<span class="cursor">|</span></h1>
      <p class="sub-text">SYSTEM BOOTING · CYBERSPACE ONLINE</p>

      <div class="tech-line top"></div>
      <div class="tech-line bottom"></div>
      <div class="tech-line left"></div>
      <div class="tech-line right"></div>

      <div class="status">
        <span class="pulse"></span>
        CONNECTION STABLE
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const mouseX = ref(0)
const mouseY = ref(0)

const ripples = ref([])
let rippleId = 0

const fullText = "HELLO, VITE!"
const displayText = ref("")
let index = 0
let timer = null

function typeLoop() {
  if (index < fullText.length) {
    displayText.value += fullText[index]
    index++
  } else {
    clearInterval(timer)
    setTimeout(() => {
      displayText.value = ""
      index = 0
      typeStart()
    }, 1500)
  }
}

function typeStart() {
  timer = setInterval(typeLoop, 120)
}

onMounted(() => {
  typeStart()
})

const updateMouse = (e) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

const createRipple = (e) => {
  const id = ++rippleId
  ripples.value.push({ id, x: e.clientX, y: e.clientY })
  setTimeout(() => {
    ripples.value = ripples.value.filter(r => r.id !== id)
  }, 1000)
}
</script>

<style scoped>
/* 核心：固定页面，禁止滚动、拖拽、滑动 */
html, body {
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  width: 100% !important;
  height: 100% !important;
}

.sci-fi-bg {
  width: 100vw;
  height: 100vh;
  background: #050a1a;
  background: radial-gradient(ellipse at center, #0a1025 0%, #020308 100%);
  overflow: hidden; /* 禁止滚动 */
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Courier New', monospace;
  cursor: crosshair;
  user-select: none;
}

.stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.stars::before,
.stars::after {
  content: "";
  position: absolute;
  width: 1px;
  height: 1px;
  background: white;
  box-shadow: 1000px 200px #fff, 500px 600px #fff, 1200px 300px #88aaff,
    300px 900px #aaffee, 800px 150px #ffffff, 1500px 700px #cceeff;
  animation: twinkle 3s infinite alternate;
}
.stars::after {
  box-shadow: 200px 300px #fff, 900px 800px #aaffff, 400px 400px #ddccff,
    1100px 100px #ffffff, 600px 700px #cceeff;
  animation-delay: 1.5s;
}

.scanline {
  position: absolute;
  width: 100%;
  height: 4px;
  background: rgba(100, 200, 255, 0.3);
  box-shadow: 0 0 10px #44ccff;
  animation: scan 6s linear infinite;
  z-index: 1;
}

.mouse-glow {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1;
}

.ripple-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}
.ripple {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid rgba(0, 229, 255, 0.8);
  transform: translate(-50%, -50%);
  animation: rippleEffect 1s ease-out forwards;
}

.hologram-card {
  position: relative;
  z-index: 2;
  padding: 70px 110px;
  background: rgba(10, 20, 40, 0.6);
  border: 1px solid rgba(0, 180, 255, 0.4);
  border-radius: 8px;
  backdrop-filter: blur(6px);
  box-shadow: 0 0 30px rgba(0, 140, 255, 0.3), inset 0 0 30px rgba(0, 140, 255, 0.1);
  text-align: center;
  animation: float 6s ease-in-out infinite;
}

.neon-text {
  font-size: 48px;
  font-weight: bold;
  background: linear-gradient(90deg, #00e5ff, #008cff);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 0 10px #00e5ff, 0 0 20px #008cff, 0 0 40px #004cff;
  letter-spacing: 6px;
  margin: 0;
  line-height: 1.2;
  overflow: visible;
}

.cursor {
  color: #00e5ff;
  animation: blink 0.7s infinite;
}

.sub-text {
  color: #99ccff;
  text-shadow: 0 0 6px #66aaff;
  font-size: 14px;
  letter-spacing: 2px;
  opacity: 0.8;
  margin-top: 10px;
}

.tech-line {
  position: absolute;
  background: #00e5ff;
  box-shadow: 0 0 8px #00e5ff;
}
.tech-line.top {
  top: -1px;
  left: 20%;
  width: 60%;
  height: 1px;
}
.tech-line.bottom {
  bottom: -1px;
  left: 20%;
  width: 60%;
  height: 1px;
}
.tech-line.left {
  top: 20%;
  left: -1px;
  width: 1px;
  height: 60%;
}
.tech-line.right {
  top: 20%;
  right: -1px;
  width: 1px;
  height: 60%;
}

.status {
  margin-top: 25px;
  color: #66ffaa;
  text-shadow: 0 0 6px #33ffaa;
  font-size: 12px;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.pulse {
  width: 6px;
  height: 6px;
  background: #33ffaa;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
@keyframes scan {
  0% { top: 0%; }
  100% { top: 100%; }
}
@keyframes pulse {
  0%, 100% { opacity: 0.4; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.1); }
}
@keyframes twinkle {
  0% { opacity: 0.3; }
  100% { opacity: 1; }
}
@keyframes rippleEffect {
  0% {
    width: 20px;
    height: 20px;
    opacity: 1;
  }
  100% {
    width: 300px;
    height: 300px;
    opacity: 0;
  }
}
@keyframes blink {
  0%,100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>