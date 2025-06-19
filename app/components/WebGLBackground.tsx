"use client";
import {useEffect, useRef} from "react";
import * as THREE from "three";

interface WebGLBackgroundProps {
  className?: string;
}

const WebGLBackground: React.FC<WebGLBackgroundProps> = ({className}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const circlesRef = useRef<
    Array<{
      x: number;
      y: number;
      radius: number;
      noiseFactor: number;
      baseHue: number;
    }>
  >([]);

  useEffect(() => {
    if (!mountRef.current) return;

    // シーンの初期化
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // アスペクト比を考慮したカメラの設定
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(
      -1 * aspect,
      1 * aspect,
      1,
      -1,
      0.1,
      1000
    );
    camera.position.z = 1;

    // レンダラーの設定
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      stencil: false,
      depth: false,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // 円の数を調整
    const numCircles = 15;
    const circles = [];
    for (let i = 0; i < numCircles; i++) {
      circles.push({
        x: (Math.random() * 2 - 1) * aspect,
        y: Math.random() * 2 - 1,
        radius: Math.random() * 0.8 + 0.4,
        noiseFactor: Math.random() * 5,
        baseHue: 300 + Math.random() * 30, // 45度から75度の間でランダムなベースハウスを設定
      });
    }
    circlesRef.current = circles;

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float time;
      uniform vec2 resolution;
      uniform vec3 circles[15];
      uniform float noiseFactors[15];
      uniform float baseHues[15];
      uniform float aspect;
      varying vec2 vUv;
      
      // 最適化されたノイズ関数
      float noise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float n = dot(i, vec3(1.0, 157.0, 113.0));
        return mix(
          mix(
            mix(fract(sin(n + 0.0) * 43758.5453),
                fract(sin(n + 1.0) * 43758.5453), f.x),
            mix(fract(sin(n + 157.0) * 43758.5453),
                fract(sin(n + 158.0) * 43758.5453), f.x),
            f.y),
          mix(
            mix(fract(sin(n + 113.0) * 43758.5453),
                fract(sin(n + 114.0) * 43758.5453), f.x),
            mix(fract(sin(n + 270.0) * 43758.5453),
                fract(sin(n + 271.0) * 43758.5453), f.x),
            f.y),
          f.z);
      }
      
      // 修正されたHSL to RGB変換
      vec3 hsl2rgb(vec3 c) {
        vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
        vec3 result = vec3(c.z) + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
        return clamp(result, 0.0, 1.0);
      }
      
      void main() {
        vec2 uv = vUv * 2.0 - 1.0;
        uv.x *= aspect;
        
        vec3 bgColor = vec3(0.98);
        vec3 finalColor = bgColor;
        
        for (int i = 0; i < 15; i++) {
          vec2 center = circles[i].xy;
          float radius = circles[i].z;
          float noiseFactor = noiseFactors[i];
          float baseHue = baseHues[i];
          
          float animatedTime = time;
          vec2 animatedCenter = center + vec2(
            sin(animatedTime + float(i) * 0.5) * 0.02,
            cos(animatedTime + float(i) * 0.5) * 0.02
          );
          
          float noiseVal = noise(vec3(uv * 0.5 + animatedTime, noiseFactor));
          float h = mod(baseHue + noiseVal * 10.0, 360.0);
          float l = 0.8 + noiseVal * 0.15;
          
          vec3 color = hsl2rgb(vec3(h / 360.0, 0.6, l));
          
          float dist = length(uv - animatedCenter);
          float alpha = smoothstep(radius, radius * 0.5, dist);
          
          finalColor = mix(finalColor, color, alpha * 0.15);
        }
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // マテリアルとメッシュを作成
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: {value: 0},
        resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        circles: {
          value: circles.map((c) => new THREE.Vector3(c.x, c.y, c.radius)),
        },
        noiseFactors: {value: circles.map((c) => c.noiseFactor)},
        baseHues: {value: circles.map((c) => c.baseHue)},
        aspect: {value: aspect},
      },
    });

    const geometry = new THREE.PlaneGeometry(2 * aspect, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // アニメーション関数
    let lastTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;

      if (deltaTime > frameInterval) {
        lastTime = currentTime - (deltaTime % frameInterval);

        if (material.uniforms.time) {
          material.uniforms.time.value = currentTime * 0.001;
        }

        renderer.render(scene, camera);
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    // リサイズハンドラー
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (
          renderer &&
          material.uniforms.resolution &&
          material.uniforms.aspect
        ) {
          const width = window.innerWidth;
          const height = window.innerHeight;
          const newAspect = width / height;

          // カメラのアスペクト比を更新
          camera.left = -1 * newAspect;
          camera.right = 1 * newAspect;
          camera.updateProjectionMatrix();

          // ジオメトリのサイズを更新
          geometry.dispose();
          const newGeometry = new THREE.PlaneGeometry(2 * newAspect, 2);
          mesh.geometry = newGeometry;

          // ユニフォーム変数を更新
          material.uniforms.aspect.value = newAspect;
          material.uniforms.resolution.value.set(width, height);

          renderer.setSize(width, height);
        }
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    // クリーンアップ
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (renderer && mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
      if (geometry) {
        geometry.dispose();
      }
      if (material) {
        material.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    />
  );
};

export default WebGLBackground;
