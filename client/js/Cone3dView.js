import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';

export default class Cone3dView {
	constructor(viewParentSelector) {
		const parent = document.querySelector(viewParentSelector);

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(
			75,
			parent.offsetWidth / parent.offsetHeight,
			0.1,
			1000
		);
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setClearColor(0xdddddd);
		this.renderer.setSize(parent.offsetWidth, parent.offsetHeight);

		this.camera.position.set(0, 2, 5.5);

		// setup lighting
		const light1 = new THREE.PointLight(0xffffff, 1, 1000);
		light1.position.set(50, 50, 50);
		const light2 = new THREE.PointLight(0xffffff, 1, 1000);
		light2.position.set(-50, -50, -50);
		this.scene.add(light1);
		this.scene.add(light2);

		// setup orbit controls (camera moving, rotating and zoom)
		this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
		this.orbitControls.update();
		this.orbitControls.enableDamping = true;
		this.orbitControls.dampingFactor = 0.15;
		this.orbitControls.enableZoom = true;
		// this.scene.add(new THREE.AxesHelper(500));

		// add renderer to dom
		parent.append(this.renderer.domElement);
		// set up renderer size on window resize
		window.addEventListener('resize', () => {
			this.renderer.setSize(parent.offsetWidth, parent.offsetHeight);
			this.camera.aspect = parent.offsetWidth / parent.offsetHeight;
			this.camera.updateProjectionMatrix();
			this.render();
		});

		// create cone material, geometry and mesh
		this.coneGeometry = new THREE.Geometry();
		this.coneMaterial = new THREE.MeshLambertMaterial({ color: 0xdddddd, side: THREE.DoubleSide });
		this.coneMesh = new THREE.Mesh(this.coneGeometry, this.coneMaterial);
		this.coneMesh.rotation.x = -Math.PI / 2;

		this.scene.add(this.coneMesh);

		this.animate();
	}

	drawCone(triangles, isDataOptimized = true) {
		this.coneGeometry.dispose();
		this.coneGeometry = new THREE.Geometry();

		if (isDataOptimized) {
			this.coneGeometry.vertices = triangles.points.map(
				(point) => new THREE.Vector3(point.x, point.y, point.z)
			);
			this.coneGeometry.faces = triangles.trianglesIndexes.map(
				(indexes) => new THREE.Face3(indexes[0], indexes[1], indexes[2])
			);
		} else {
			triangles.forEach((triangle, index) => {
				triangle.forEach((point) => {
					const vertice = new THREE.Vector3(point.x, point.y, point.z);
					this.coneGeometry.vertices.push(vertice);
				});
				const face = new THREE.Face3(index * 3, index * 3 + 1, index * 3 + 2);
				this.coneGeometry.faces.push(face);
			});
		}

		this.coneGeometry.computeFaceNormals();

		this.coneMesh.geometry = this.coneGeometry;
	}

	render() {
		this.renderer.render(this.scene, this.camera);
	}

	animate() {
		requestAnimationFrame(() => this.animate());
		this.orbitControls.update();
		this.render();
	}
}
