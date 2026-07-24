"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { onMotionEnabled } from "@/lib/motion";

// Fundo 3D fixo da página inteira: icosaedro central + rede de nós em esfera
// de Fibonacci + pulsos de sinal + sólidos wireframe orbitando. Desce e gira
// junto com o scroll (com amortecimento pra ficar liso).
export default function OrbitalCore() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !window.WebGLRenderingContext) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      canvas.style.display = "none";
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);

    const isMobile = window.innerWidth < 760;
    const NODE_COUNT = isMobile ? 60 : 120;
    const NODE_RADIUS = 3.1;

    const accent = new THREE.Color(0x3ddc97);
    const accentSoft = new THREE.Color(0x9bffd0);
    const signalColor = new THREE.Color(0xcffff0);

    const glowVertex = [
      "attribute float aSize;",
      "attribute vec3 aColor;",
      "varying vec3 vColor;",
      "void main() {",
      "  vColor = aColor;",
      "  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);",
      "  float dist = max(-mvPosition.z, 1.0);",
      "  gl_PointSize = aSize * (42.0 / dist);",
      "  gl_Position = projectionMatrix * mvPosition;",
      "}",
    ].join("\n");
    const glowFragment = [
      "varying vec3 vColor;",
      "void main() {",
      "  vec2 uv = gl_PointCoord - vec2(0.5);",
      "  float d = length(uv);",
      "  float alpha = smoothstep(0.5, 0.2, d);",
      "  gl_FragColor = vec4(vColor, alpha * 0.95);",
      "}",
    ].join("\n");
    const makeGlowMaterial = () =>
      new THREE.ShaderMaterial({
        vertexShader: glowVertex,
        fragmentShader: glowFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

    const coreGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const core = new THREE.LineSegments(
      new THREE.EdgesGeometry(coreGeo),
      new THREE.LineBasicMaterial({ color: 0x3ddc97, transparent: true, opacity: 0.55 })
    );
    scene.add(core);
    const coreFill = new THREE.Mesh(
      coreGeo,
      new THREE.MeshBasicMaterial({ color: 0x3ddc97, transparent: true, opacity: 0.05, side: THREE.DoubleSide })
    );
    scene.add(coreFill);

    function fibonacciSphere(n: number, radius: number): THREE.Vector3[] {
      const pts: THREE.Vector3[] = [];
      const offset = 2 / n;
      const increment = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < n; i++) {
        const y = i * offset - 1 + offset / 2;
        const r = Math.sqrt(Math.max(0, 1 - y * y));
        const phi = i * increment;
        pts.push(new THREE.Vector3(Math.cos(phi) * r * radius, y * radius, Math.sin(phi) * r * radius));
      }
      return pts;
    }
    const nodePoints = fibonacciSphere(NODE_COUNT, NODE_RADIUS);

    const nodePositions = new Float32Array(NODE_COUNT * 3);
    const nodeColors = new Float32Array(NODE_COUNT * 3);
    const nodeSizes = new Float32Array(NODE_COUNT);
    const nodeBaseSize = new Float32Array(NODE_COUNT);
    const nodePhase = new Float32Array(NODE_COUNT);
    for (let i = 0; i < NODE_COUNT; i++) {
      const i3 = i * 3;
      nodePositions[i3] = nodePoints[i].x;
      nodePositions[i3 + 1] = nodePoints[i].y;
      nodePositions[i3 + 2] = nodePoints[i].z;
      const c = accent.clone().lerp(accentSoft, Math.random());
      nodeColors[i3] = c.r;
      nodeColors[i3 + 1] = c.g;
      nodeColors[i3 + 2] = c.b;
      nodeBaseSize[i] = 1.3 + Math.random() * 0.9;
      nodeSizes[i] = nodeBaseSize[i];
      nodePhase[i] = Math.random() * Math.PI * 2;
    }
    const nodeGeo = new THREE.BufferGeometry();
    const nodeSizeAttr = new THREE.BufferAttribute(nodeSizes, 1);
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    nodeGeo.setAttribute("aColor", new THREE.BufferAttribute(nodeColors, 3));
    nodeGeo.setAttribute("aSize", nodeSizeAttr);
    scene.add(new THREE.Points(nodeGeo, makeGlowMaterial()));

    const edgesSet: Record<string, boolean> = {};
    const edgeList: Array<[number, number]> = [];
    const links = isMobile ? 2 : 3;
    for (let a = 0; a < NODE_COUNT; a++) {
      const dists: Array<{ idx: number; d: number }> = [];
      for (let b = 0; b < NODE_COUNT; b++) {
        if (a === b) continue;
        dists.push({ idx: b, d: nodePoints[a].distanceToSquared(nodePoints[b]) });
      }
      dists.sort((p, q) => p.d - q.d);
      for (let k = 0; k < links && k < dists.length; k++) {
        const b2 = dists[k].idx;
        const key = a < b2 ? `${a}_${b2}` : `${b2}_${a}`;
        if (!edgesSet[key]) {
          edgesSet[key] = true;
          edgeList.push([a, b2]);
        }
      }
    }
    const edgePositions = new Float32Array(edgeList.length * 6);
    for (let e = 0; e < edgeList.length; e++) {
      const pA = nodePoints[edgeList[e][0]];
      const pB = nodePoints[edgeList[e][1]];
      const e6 = e * 6;
      edgePositions[e6] = pA.x;
      edgePositions[e6 + 1] = pA.y;
      edgePositions[e6 + 2] = pA.z;
      edgePositions[e6 + 3] = pB.x;
      edgePositions[e6 + 4] = pB.y;
      edgePositions[e6 + 5] = pB.z;
    }
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute("position", new THREE.BufferAttribute(edgePositions, 3));
    scene.add(
      new THREE.LineSegments(
        edgeGeo,
        new THREE.LineBasicMaterial({ color: 0x3ddc97, transparent: true, opacity: 0.16 })
      )
    );

    const PULSE_COUNT = isMobile ? 6 : 12;
    const pulseEdges: Array<{ a: THREE.Vector3; b: THREE.Vector3; speed: number; phase: number }> = [];
    for (let pc = 0; pc < Math.min(PULSE_COUNT, edgeList.length); pc++) {
      const re = edgeList[Math.floor(Math.random() * edgeList.length)];
      pulseEdges.push({
        a: nodePoints[re[0]],
        b: nodePoints[re[1]],
        speed: 0.25 + Math.random() * 0.35,
        phase: Math.random(),
      });
    }
    const pulsePositions = new Float32Array(pulseEdges.length * 3);
    const pulseColors = new Float32Array(pulseEdges.length * 3);
    const pulseSizes = new Float32Array(pulseEdges.length);
    for (let pi = 0; pi < pulseEdges.length; pi++) {
      pulseColors[pi * 3] = signalColor.r;
      pulseColors[pi * 3 + 1] = signalColor.g;
      pulseColors[pi * 3 + 2] = signalColor.b;
      pulseSizes[pi] = 3.0;
    }
    const pulseGeo = new THREE.BufferGeometry();
    const pulsePosAttr = new THREE.BufferAttribute(pulsePositions, 3);
    pulseGeo.setAttribute("position", pulsePosAttr);
    pulseGeo.setAttribute("aColor", new THREE.BufferAttribute(pulseColors, 3));
    pulseGeo.setAttribute("aSize", new THREE.BufferAttribute(pulseSizes, 1));
    scene.add(new THREE.Points(pulseGeo, makeGlowMaterial()));

    const SHAPE_DEFS = [
      { geo: "icosahedron", r: 0.38, radius: 4.8, incline: 0.5, speed: 0.16, tilt: 0.0, color: 0x3ddc97 },
      { geo: "octahedron", r: 0.32, radius: 4.3, incline: 0.75, speed: -0.21, tilt: 1.4, color: 0x9bffd0 },
      { geo: "tetrahedron", r: 0.36, radius: 4.6, incline: 0.55, speed: -0.18, tilt: 0.7, color: 0x9bffd0 },
      { geo: "torus", r: 0.3, radius: 5.6, incline: 0.25, speed: 0.11, tilt: 3.6, color: 0x3ddc97 },
      { geo: "box", r: 0.26, radius: 5.2, incline: 0.4, speed: 0.19, tilt: 4.1, color: 0x3ddc97 },
    ];
    function makeShapeGeometry(type: string, r: number): THREE.BufferGeometry {
      if (type === "icosahedron") return new THREE.IcosahedronGeometry(r, 0);
      if (type === "octahedron") return new THREE.OctahedronGeometry(r, 0);
      if (type === "tetrahedron") return new THREE.TetrahedronGeometry(r, 0);
      if (type === "torus") return new THREE.TorusGeometry(r, r * 0.32, 8, 20);
      return new THREE.BoxGeometry(r * 1.3, r * 1.3, r * 1.3);
    }
    type Sat = {
      mesh: THREE.LineSegments;
      angle: number;
      speed: number;
      radius: number;
      incline: number;
      tilt: number;
      rotX: number;
      rotY: number;
    };
    const satellites: Sat[] = SHAPE_DEFS.map((def) => {
      const mesh = new THREE.LineSegments(
        new THREE.EdgesGeometry(makeShapeGeometry(def.geo, def.r)),
        new THREE.LineBasicMaterial({ color: def.color, transparent: true, opacity: 0.65 })
      );
      scene.add(mesh);
      return {
        mesh,
        angle: Math.random() * Math.PI * 2,
        speed: def.speed * 0.016,
        radius: def.radius,
        incline: def.incline,
        tilt: def.tilt,
        rotX: (Math.random() - 0.5) * 0.02,
        rotY: (Math.random() - 0.5) * 0.025,
      };
    });

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: 0, y: 0 };
    const mouseTarget = { x: 0, y: 0 };
    function onPointerMove(ev: PointerEvent) {
      mouseTarget.x = (ev.clientX / window.innerWidth - 0.5) * 2;
      mouseTarget.y = (ev.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener("pointermove", onPointerMove);

    function getScrollProgress(): number {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return 0;
      return Math.max(0, Math.min(1, window.scrollY / max));
    }

    function renderFrame(orbitAngle: number, scrollProgress: number) {
      const camRadius = 10.5;
      const camY = 2.2 - scrollProgress * 4.6 + mouse.y * -0.8;
      camera.position.set(
        Math.sin(orbitAngle) * camRadius + mouse.x * 1.1,
        camY,
        Math.cos(orbitAngle) * camRadius
      );
      camera.lookAt(0, -scrollProgress * 1.4, 0);
      renderer.render(scene, camera);
    }
    function placeSatellite(s: Sat) {
      s.mesh.position.set(
        Math.cos(s.angle) * s.radius,
        Math.sin(s.angle * 0.6 + s.tilt) * s.radius * s.incline,
        Math.sin(s.angle) * s.radius
      );
    }

    function renderStatic() {
      core.rotation.set(0.4, 0.6, 0);
      coreFill.rotation.copy(core.rotation);
      satellites.forEach(placeSatellite);
      renderFrame(0.6, 0);
    }

    let rafId = 0;
    let disposed = false;
    let loopStarted = false;
    let smoothScroll = getScrollProgress();
    let lastOpacity = -1;

    function startLoop() {
      if (loopStarted) return;
      loopStarted = true;
      const tick = () => {
        if (disposed) return;
        rafId = requestAnimationFrame(tick);
        if (document.hidden) return;
        mouse.x += (mouseTarget.x - mouse.x) * 0.05;
        mouse.y += (mouseTarget.y - mouse.y) * 0.05;
        const nowSec = performance.now() * 0.001;
        // Amortecimento do scroll: a órbita persegue o valor real suavemente
        // em vez de pular a cada tick de scroll.
        smoothScroll += (getScrollProgress() - smoothScroll) * 0.07;
        const scrollProgress = smoothScroll;

        core.rotation.y += 0.0022;
        core.rotation.x += 0.0009;
        coreFill.rotation.copy(core.rotation);
        for (const s of satellites) {
          s.angle += s.speed;
          placeSatellite(s);
          s.mesh.rotation.x += s.rotX;
          s.mesh.rotation.y += s.rotY;
        }
        for (let ni = 0; ni < NODE_COUNT; ni++) {
          const twinkle = 0.75 + Math.sin(nowSec * 1.4 + nodePhase[ni]) * 0.25;
          nodeSizes[ni] = nodeBaseSize[ni] * twinkle;
        }
        nodeSizeAttr.needsUpdate = true;
        for (let pj = 0; pj < pulseEdges.length; pj++) {
          const pe = pulseEdges[pj];
          const t = (nowSec * pe.speed + pe.phase) % 1;
          pulsePositions[pj * 3] = pe.a.x + (pe.b.x - pe.a.x) * t;
          pulsePositions[pj * 3 + 1] = pe.a.y + (pe.b.y - pe.a.y) * t;
          pulsePositions[pj * 3 + 2] = pe.a.z + (pe.b.z - pe.a.z) * t;
        }
        pulsePosAttr.needsUpdate = true;

        const orbitAngle = nowSec * 0.018 + scrollProgress * Math.PI * 3.2;
        renderFrame(orbitAngle, scrollProgress);

        const nextOpacity = 1 - scrollProgress * 0.35;
        if (Math.abs(nextOpacity - lastOpacity) > 0.004 && canvas) {
          canvas.style.opacity = String(nextOpacity);
          lastOpacity = nextOpacity;
        }
      };
      tick();
    }

    renderStatic();
    const offMotion = onMotionEnabled(startLoop);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      offMotion();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      scene.traverse((obj) => {
        const o = obj as unknown as {
          geometry?: { dispose?: () => void };
          material?: { dispose?: () => void };
        };
        o.geometry?.dispose?.();
        o.material?.dispose?.();
      });
      renderer.dispose();
    };
  }, []);

  return <canvas id="home-gl" ref={canvasRef} aria-hidden="true" />;
}
