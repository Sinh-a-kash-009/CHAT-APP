import { useRef, useEffect } from 'react'
import {
  Renderer,
  Camera,
  Transform,
  Plane,
  Mesh,
  Program,
  Texture,
} from 'ogl'

import '../App.css';

function debounce(func, wait) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t
}

function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance)
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      instance[key] = instance[key].bind(instance)
    }
  })
}

function createTextTexture(gl, text, font = "bold 30px monospace", color = "black") {
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")
  context.font = font
  const metrics = context.measureText(text)
  const textWidth = Math.ceil(metrics.width)
  const textHeight = Math.ceil(parseInt(font, 10) * 1.2)
  canvas.width = textWidth + 20
  canvas.height = textHeight + 20
  context.font = font
  context.fillStyle = color
  context.textBaseline = "middle"
  context.textAlign = "center"
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillText(text, canvas.width / 2, canvas.height / 2)
  const texture = new Texture(gl, { generateMipmaps: false })
  texture.image = canvas
  return { texture, width: canvas.width, height: canvas.height }
}

class Title {
  constructor({ gl, plane, renderer, text, textColor = "#545050", font = "30px sans-serif" }) {
    autoBind(this)
    this.gl = gl
    this.plane = plane
    this.renderer = renderer
    this.text = text
    this.textColor = textColor
    this.font = font
    this.createMesh()
  }
  createMesh() {
    const { texture, width, height } = createTextTexture(
      this.gl,
      this.text,
      this.font,
      this.textColor
    )
    const geometry = new Plane(this.gl)
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true
    })
    this.mesh = new Mesh(this.gl, { geometry, program })
    const aspect = width / height
    const textHeight = this.plane.scale.y * 0.15
    const textWidth = textHeight * aspect
    this.mesh.scale.set(textWidth, textHeight, 1)
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05
    this.mesh.setParent(this.plane)
  }
}

class Media {
  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font
  }) {
    this.extra = 0
    this.geometry = geometry
    this.gl = gl
    this.image = image
    this.index = index
    this.length = length
    this.renderer = renderer
    this.scene = scene
    this.screen = screen
    this.text = text
    this.viewport = viewport
    this.bend = bend
    this.textColor = textColor
    this.borderRadius = borderRadius
    this.font = font
    this.createShader()
    this.createMesh()
    this.createTitle()
    this.onResize()
  }
  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: false })
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          if(d > 0.0) {
            discard;
          }
          
          gl_FragColor = vec4(color.rgb, 1.0);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius }
      },
      transparent: true
    })
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = this.image
    img.onload = () => {
      texture.image = img
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight]
    }
  }
  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    })
    this.plane.setParent(this.scene)
  }
  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      text: this.text,
      textColor: this.textColor,
      fontFamily: this.font
    })
  }
  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra

    const x = this.plane.position.x
    const H = this.viewport.width / 2

    if (this.bend === 0) {
      this.plane.position.y = 0
      this.plane.rotation.z = 0
    } else {
      const B_abs = Math.abs(this.bend)
      const R = (H * H + B_abs * B_abs) / (2 * B_abs)
      const effectiveX = Math.min(Math.abs(x), H)

      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX)
      if (this.bend > 0) {
        this.plane.position.y = -arc
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R)
      } else {
        this.plane.position.y = arc
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R)
      }
    }

    this.speed = scroll.current - scroll.last
    this.program.uniforms.uTime.value += 0.04
    this.program.uniforms.uSpeed.value = this.speed

    const planeOffset = this.plane.scale.x / 2
    const viewportOffset = this.viewport.width / 2
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal
      this.isBefore = this.isAfter = false
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal
      this.isBefore = this.isAfter = false
    }
  }
  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen
    if (viewport) {
      this.viewport = viewport
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height]
      }
    }
    this.scale = this.screen.height / 1500
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y]
    this.padding = 2
    this.width = this.plane.scale.x + this.padding
    this.widthTotal = this.width * this.length
    this.x = this.width * this.index
  }
}

class App {
  constructor(container, { items, bend, textColor = "#ffffff", borderRadius = 0, font = "bold 30px Figtree" } = {}) {
    document.documentElement.classList.remove('no-js')
    this.container = container
    this.scroll = { ease: 0.05, current: 0, target: 0, last: 0 }
    this.onCheckDebounce = debounce(this.onCheck, 200)
    this.createRenderer()
    this.createCamera()
    this.createScene()
    this.onResize()
    this.createGeometry()
    this.createMedias(items, bend, textColor, borderRadius, font)
    this.update()
    this.addEventListeners()
  }
  createRenderer() {
    this.renderer = new Renderer({ alpha: true })
    this.gl = this.renderer.gl
    this.gl.clearColor(0, 0, 0, 0)
    this.container.appendChild(this.gl.canvas)
  }
  createCamera() {
    this.camera = new Camera(this.gl)
    this.camera.fov = 45
    this.camera.position.z = 20
  }
  createScene() {
    this.scene = new Transform()
  }
  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100
    })
  }
  createMedias(items, bend = 1, textColor, borderRadius, font) {
    const defaultItems = [
      { image: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGwOLvbgpL5s2pKvHMqYP1v0lop7wchwk6Gg&s`, text: 'create a study group' },
      { image: `data:image/jpeg;base64,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`, text: 'sharing notes and resources' },
      { image: `data:image/jpeg;base64,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`, text: 'track study goals and task' },
      { image: `data:image/jpeg;base64,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`, text: 'chat in real time with group members' },
    ]
    const galleryItems = items && items.length ? items : defaultItems
    this.mediasImages = galleryItems.concat(galleryItems)
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font
      })
    })
  }
  onTouchDown(e) {
    this.isDown = true
    this.scroll.position = this.scroll.current
    this.start = e.touches ? e.touches[0].clientX : e.clientX
  }
  onTouchMove(e) {
    if (!this.isDown) return
    const x = e.touches ? e.touches[0].clientX : e.clientX
    const distance = (this.start - x) * 0.05
    this.scroll.target = this.scroll.position + distance
  }
  onTouchUp() {
    this.isDown = false
    this.onCheck()
  }
  onWheel() {
    this.scroll.target += 2
    this.onCheckDebounce()
  }
  onCheck() {
    if (!this.medias || !this.medias[0]) return
    const width = this.medias[0].width
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width)
    const item = width * itemIndex
    this.scroll.target = this.scroll.target < 0 ? -item : item
  }
  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    }
    this.renderer.setSize(this.screen.width, this.screen.height)
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height
    })
    const fov = (this.camera.fov * Math.PI) / 180
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect
    this.viewport = { width, height }
    if (this.medias) {
      this.medias.forEach((media) =>
        media.onResize({ screen: this.screen, viewport: this.viewport })
      )
    }
  }
  update() {
    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease
    )
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left'
    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction))
    }
    this.renderer.render({ scene: this.scene, camera: this.camera })
    this.scroll.last = this.scroll.current
    this.raf = window.requestAnimationFrame(this.update.bind(this))
  }
  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this)
    this.boundOnWheel = this.onWheel.bind(this)
    this.boundOnTouchDown = this.onTouchDown.bind(this)
    this.boundOnTouchMove = this.onTouchMove.bind(this)
    this.boundOnTouchUp = this.onTouchUp.bind(this)
    window.addEventListener('resize', this.boundOnResize)
    window.addEventListener('mousewheel', this.boundOnWheel)
    window.addEventListener('wheel', this.boundOnWheel)
    window.addEventListener('mousedown', this.boundOnTouchDown)
    window.addEventListener('mousemove', this.boundOnTouchMove)
    window.addEventListener('mouseup', this.boundOnTouchUp)
    window.addEventListener('touchstart', this.boundOnTouchDown)
    window.addEventListener('touchmove', this.boundOnTouchMove)
    window.addEventListener('touchend', this.boundOnTouchUp)
  }
  destroy() {
    window.cancelAnimationFrame(this.raf)
    window.removeEventListener('resize', this.boundOnResize)
    window.removeEventListener('mousewheel', this.boundOnWheel)
    window.removeEventListener('wheel', this.boundOnWheel)
    window.removeEventListener('mousedown', this.boundOnTouchDown)
    window.removeEventListener('mousemove', this.boundOnTouchMove)
    window.removeEventListener('mouseup', this.boundOnTouchUp)
    window.removeEventListener('touchstart', this.boundOnTouchDown)
    window.removeEventListener('touchmove', this.boundOnTouchMove)
    window.removeEventListener('touchend', this.boundOnTouchUp)
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas)
    }
  }
}

function CircularGallery({
  items,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = "bold 30px Figtree"
}) {
  const containerRef = useRef(null)
  useEffect(() => {
    const app = new App(containerRef.current, { items, bend, textColor, borderRadius, font })
    return () => {
      app.destroy()
    }
  }, [items, bend, textColor, borderRadius, font])
  return (
    <div className='circular-gallery' ref={containerRef} />
  )
}
export {CircularGallery}
