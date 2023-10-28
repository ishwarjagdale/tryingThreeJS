import * as THREE from "three";
import React, {useEffect, useState} from "react";
import { MapControls } from 'three/addons/controls/MapControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth
	/ window.innerHeight, 0.1, 1000 );


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

const grid = new THREE.PlaneGeometry( window.innerWidth, window.innerHeight );
const gridMaterial = new THREE.MeshBasicMaterial( {color: '#1c1b1b', side: THREE.DoubleSide} );
const plane = new THREE.Mesh( grid, gridMaterial );

plane.position.z = -2;

const gridHelper = new THREE.GridHelper( window.innerWidth, 500, 'black', 'black' );

gridHelper.lookAt(0, 90, 0);
scene.add(gridHelper);
scene.add(plane);

const node = new THREE.CylinderGeometry( .8, .8, .1 );
node.rotateX(11 / 7);
const material = new THREE.MeshBasicMaterial( {color: '#0e67c0'} );
const nodeMesh = new THREE.Mesh( node, material );
scene.add( nodeMesh );



const dest = new THREE.CylinderGeometry( .8, .8, .1 );
dest.rotateX(11 / 7);
const destMaterial = new THREE.MeshBasicMaterial( {color: 'green'} );
const destMesh = new THREE.Mesh( dest, destMaterial );
destMesh.position.x = 20;
destMesh.position.y = 30;
scene.add( destMesh );



const circle = new THREE.CylinderGeometry( 1, 1, .09 );
circle.rotateX( 11 / 7 );
const circleMaterial = new THREE.MeshBasicMaterial( {color: '#0E67C0AB'} );
const circleMesh = new THREE.Mesh( circle, circleMaterial );
circleMesh.material.opacity = 0.1;
scene.add( circleMesh );

renderer.render(scene, camera);

const controls = new MapControls( camera, document.getElementById('three') );

document.getElementById('three').replaceChildren(renderer.domElement);

const fun = () => {
	requestAnimationFrame( fun );
	controls.update();
	renderer.render(scene, camera);
}

const coordinates = [
	{ x: 3, y: 2, z: 5},
	{ x: -1, y: -5, z: 5},
	{ x: -8, y: 3, z: 5},
	{ x: -6, y: -7, z: 5},
	{ x: -2, y: 8, z: 5},
	{ x: 4, y: -6, z: 5},
	{ x: 9, y: 1, z: 5},
	{ x: 5, y: 4, z: 5},
	{ x: -7, y: -9, z: 5},
	{ x: -2, y: 1, z: 5 }
];
const wifis = [];
const lines = {};


const range = () => {
	wifis.forEach((w, k) => {
		let l = new THREE.Line3( w.position.clone(), nodeMesh.position.clone() );
		if(lines[k]) {
			scene.remove(lines[k]);
		}
		if(l.distance() <= 50) {
			const line = new THREE.Line(
				new THREE.BufferGeometry().setFromPoints([l.start, nodeMesh.position.clone()]),
				new THREE.LineBasicMaterial( {color: '#3c70c2'} )
			)
			lines[k] = line;
			scene.add(line);
		}
	});
}

function App() {

	const [perspective, setPerspective] = useState(1);


	useEffect(() => {
		if(perspective === 1) {

			camera.position.z = 40;
			camera.position.y = -70;

		} else {

			camera.position.z = 120;
			camera.position.y = 0;

		}
		renderer.render(scene, camera);
	}, [perspective]);

	const handlePerspective = () => {
		setPerspective( perspective === 0 ? 1 : 0 );
	}

	useEffect(() => {

		coordinates.forEach((c, k) => {
			const wifi = new THREE.SphereGeometry( .2 );
			const material = new THREE.MeshBasicMaterial( {color: 'red'} );
			const wifiMesh = new THREE.Mesh( wifi, material );
			wifiMesh.position.x = c.x * 5;
			wifiMesh.position.y = c.y * 5;
			wifiMesh.position.z = c.z * 5;
			wifis.push(wifiMesh);

			scene.add( wifiMesh );
		});

		range();


		wifis.forEach((w) => {
			let l = new THREE.Line3( w.position.clone(), destMesh.position.clone() );

			if(l.distance() <= 50) {
				const line = new THREE.Line(
					new THREE.BufferGeometry().setFromPoints([l.start, l.end]),
					new THREE.LineBasicMaterial( {color: '#19c466'} )
				)
				scene.add(line);
			}
		});


	}, []);

	useEffect(fun);

	useEffect(() => {
		window.addEventListener('keydown', (evt) => {
			if(evt.key === "ArrowUp") {
				nodeMesh.position.y += 0.3;
				circleMesh.position.y += 0.3;
			} else if(evt.key === "ArrowDown") {
				nodeMesh.position.y -= 0.3;
				circleMesh.position.y -= 0.3;
			} else if(evt.key === "ArrowLeft") {
				nodeMesh.position.x -= 0.3;
				circleMesh.position.x -= 0.3;
			} else if(evt.key === "ArrowRight") {
				nodeMesh.position.x += 0.3;
				circleMesh.position.x += 0.3;
			} else {
				return null;
			}

			range();

		})
	}, []);

	return (
		<>
			<button style={perspectiveBtn} onClick={handlePerspective} >
				<span className={"material-symbols-outlined"}>3d_rotation</span>
			</button>
		</>
	);
}

const perspectiveBtn = {
	padding: "1rem",
	borderRadius: "4rem",
	border: "none",
	backgroundColor: "dodgerblue",
	position: "absolute",
	bottom: 0, right: 0,
	margin: "2rem",
	zIndex: 100,
	cursor: "pointer"
};

export default App;
