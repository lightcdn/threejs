
var rainbowMap = {
    'red': '#FF0000',
    'orange': '#FFA500',
    'yellow': '#FFFF00',
    'green': '#008000',
    'blue': '#0000FF',
    'indigo': '#4B0082',
    'violet': '#EE82EE'
};

var rainbowArr = [
    '#FF0000',
    '#FFA500',
    '#FFFF00',
    '#008000',
    '#0000FF',
    '#4B0082',
    '#EE82EE'
];

const NG1 = Math.PI/180;

function drawShop() {
	
	const floorMaterial = new THREE.MeshBasicMaterial({ 
	//map: floorTexture 
	});
	const floor = new THREE.PlaneGeometry(10, 10); 
	const floorMesh = new THREE.Mesh(floor, floorMaterial);
	floorMesh.receiveShadow = true; // Enable shadows for added realism
	scene.add(floorMesh);


	const woodMaterial = new THREE.MeshBasicMaterial({ color: 0xc67117 });
	const shelf1 = new THREE.BoxGeometry(2, 1, 0.5); // Adjust dimensions
	const shelfMesh1 = new THREE.Mesh(shelf1, woodMaterial);
	shelfMesh1.position.set(-2, 1, 1);
	scene.add(shelfMesh1);
	
	const glassMaterial = new THREE.MeshBasicMaterial({ color: 0xadf5ff, transparent: true, opacity: 0.8 });
	const rollingCase = new THREE.CylinderGeometry(0.75, 0.75, 1.5); // Adjust dimensions
	const rollingCaseMesh = new THREE.Mesh(rollingCase, glassMaterial);
	rollingCaseMesh.position.set(1, 0.75, 1);
	scene.add(rollingCaseMesh);
	
	const displayCaseMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 });
	const displayCase = new THREE.PlaneGeometry(2, 1.5); // Adjust dimensions
	const displayCaseMesh = new THREE.Mesh(displayCase, displayCaseMaterial);
	displayCaseMesh.position.set(1, 1.5, 1);
	scene.add(displayCaseMesh);
	
	
}

	
function drawBakery() {
	
	//const bakedTexture = textureLoader.load('https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room10/a58985d7d47b6e294f1e7c54c654b0b0636df69c/dist/baked-01.jpg')
	const bakedTexture = textureLoader.load('https://cdn.jsdelivr.net/gh/ricardoolivaalonso/ThreeJS-Room10/dist/baked-01.jpg')
	
	bakedTexture.flipY = false
	bakedTexture.encoding = THREE.sRGBEncoding


	//const bakedTexture2 = textureLoader.load('https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room10/a58985d7d47b6e294f1e7c54c654b0b0636df69c/dist/baked-02.jpg')
	const bakedTexture2 = textureLoader.load('https://cdn.jsdelivr.net/gh/ricardoolivaalonso/ThreeJS-Room10/dist/baked-02.jpg')
	bakedTexture2.flipY = false
	bakedTexture2.encoding = THREE.sRGBEncoding

	const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })
	const bakedMaterial2 = new THREE.MeshBasicMaterial({ map: bakedTexture2})

	
	//Loader
	const loader = new GLTFLoader()
	//loader.load('https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room10/a58985d7d47b6e294f1e7c54c654b0b0636df69c/dist/model-01.glb',
	loader.load('https://cdn.jsdelivr.net/gh/ricardoolivaalonso/ThreeJS-Room10/dist/model-01.glb',
		(gltf) => {
			const model = gltf.scene
			model.traverse( child => child.material = bakedMaterial )
			model.traverse( child => {
				setTimeout(function() {
				if(!child.parent) return;
				scene.add(child)
				});
			})
			//scene.add(model)
		},
		( xhr ) => {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' )
		}
	)
	
	//loader.load('https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room10/a58985d7d47b6e294f1e7c54c654b0b0636df69c/dist/model-02.glb',
	loader.load('https://cdn.jsdelivr.net/gh/ricardoolivaalonso/ThreeJS-Room10/dist/model-02.glb',
		(gltf) => {
			const model = gltf.scene
			model.traverse( child => child.material = bakedMaterial2 )
			model.traverse( child => {
				setTimeout(function() {
				if(!child.parent) return;
				//scene.add(child)
				});
			})
			//scene.add(model)
			//loading.style.display = 'none'
		},
		( xhr ) => {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' )
		}
	)

}


function drawExtrudeShape() {

	//PROFILE SHAPE
	var spts = [];
	spts.push(new THREE.Vector2(0, 0));
	spts.push(new THREE.Vector2(10, 0));
	spts.push(new THREE.Vector2(10, 25));
	spts.push(new THREE.Vector2(-5, 25));
	spts.push(new THREE.Vector2(-5, 20));
	spts.push(new THREE.Vector2(0, 20));


	var closedSpline = new THREE.CatmullRomCurve3( [
		new THREE.Vector3( -6, -10,  6 ),
		new THREE.Vector3( -6,   2,  6 ),
		new THREE.Vector3( -6,  12,  6 ),
		new THREE.Vector3(  6,   2, -6 ),
	] );

	//closedSpline.closed = true;

	//EXTRUSION SETTINGS
	var extrudeSettings = {
	steps: 200,
	bevelEnabled: true,
	extrudePath: closedSpline
	};

	// GENERATE SCENE GEOMETRY
	var shape = new THREE.Shape( spts );

	var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
	var material2 = new THREE.MeshLambertMaterial( { color: 0xff8000, wireframe: false } );

	var mesh = new THREE.Mesh( geometry, material2 );

	scene.add( mesh );
}


var height = .1;

var floorWidth = 31.5;
var floorDepth = 28;

var layout = [

	{ size : [ 16, 1, 5, 6 ], color: 'gray', map: 'tiles1.jpg'  },
	{ size : [ 21, 1, 10, 11 ], color: 'khaki', map: 'tiles3.jpg' },

	{ size : [ 1, 7, 5, 11 ], color: 'gray', map: 'tiles1.jpg' },
	{ size : [ 6, 7, 8, 5 ], color: 'white', map: 'tiles2.jpg' },
	{ size : [ 14, 7, 7, 5 ], color: 'white', map: 'tiles2.jpg' },

	{ size : [ 6, 12, 11, 10 ], color: 'khaki', map: 'tiles3.jpg' },
	{ size : [ 17, 12, 16, 10 ], color: 'yellow', map: 'tiles3.jpg' },

	{ size : [ 14, 21, 5, 7.5 ], color: 'gray', map: 'tiles1.jpg' },
	{ size : [ 19, 21, 7.5, 7.5 ], color: 'khaki', map: 'tiles3.jpg' },

];

function createRoom(x, z, width, depth, color, map) {

	let texture = textureLoader.load(map);
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 4, 4 );

	const roomGeometry = new THREE.BoxGeometry(width, height, depth);
	const room = new THREE.Mesh(roomGeometry, new THREE.MeshStandardMaterial({ 
	//color: color || 0xffffff 
	map : texture
	}));
	room.position.x = x + width/2;
	room.position.z = z + depth/2;
	room.receiveShadow = true;
	return room;
}

function drawFloorPlan() {

	// Create floor
	const floorGeometry = new THREE.BoxGeometry(floorWidth, height, floorDepth);
	const floorMaterial = new THREE.MeshStandardMaterial({ color: '#795548' });
	const floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.x = floorWidth/2;
	floor.position.z = floorDepth/2;
	floor.position.y = -.1;
	floor.receiveShadow = true;
	scene.add(floor);

	for (let roomLayout of layout) {
		let size = roomLayout.size;
		let color = roomLayout.color;
		let map = roomLayout.map;
		let room = createRoom(size[0], size[1], size[2], size[3], color, map);
		scene.add(room);
	}

	// Position the camera
	camera.position.z = 0;
	//camera.position.z = 10;
	camera.position.y = 5;

}

function drawBCurve() {

	// Create a curve
	const curve = new THREE.QuadraticBezierCurve3(
	  new THREE.Vector3(0, 0, 0),
	  new THREE.Vector3(10, 0, 0),
	  new THREE.Vector3(10, 10, 0)
	);

	// Create a geometry
	const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));

	// Create a material
	const material = new THREE.MeshPhongMaterial({color: 0xffffff});

	// Create a mesh
	const mesh = new THREE.Mesh(geometry, material);

	// Add the mesh to the scene
	scene.add(mesh);
}

function drawCurveTube() {

	// Create a new curve
	const curve = new THREE.CatmullRomCurve3([
	  new THREE.Vector3(0, 0, 0),
	  new THREE.Vector3(10, 0, 0),
	  new THREE.Vector3(10, 10, 0),
	  new THREE.Vector3(0, 10, 0)
	]);

	const tubeGeometry = new THREE.TubeGeometry(curve, 100, 2, 8, false);
	const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	const mesh = new THREE.Mesh(tubeGeometry, material);
	scene.add(mesh);	
}

function drawSquares() {
	drawSquare1();
	drawSquare2();
	drawSquare3();
}

function drawSquare1() {

	var vertices1 = new Float32Array([
		-1, -1, 0,
		1, -1, 0,
		1, 1, 0
	]);
	
	var vertices2 = new Float32Array([
		1, 1, 0,
		-1, 1, 0,
		-1, -1, 0
	]);
	
	drawSquare(vertices1, vertices2);
}

function drawSquare2() {
	
	var vertices3 = new Float32Array([
		0, 1, -1,
		0, 1, 1,
		0, -1, 1,
	]);
	
	var vertices4 = new Float32Array([
		0, -1, 1,
		0, -1, -1,
		0, 1, -1,
	]);

	drawSquare(vertices3, vertices4);
}
	
function drawSquare3() {
	
	var vertices5 = new Float32Array([
		1, 0, -1,
		-1, 0, -1,
		-1, 0, 1,
	]);
	
	var vertices6 = new Float32Array([
		-1, 0, 1,
		1, 0, 1,
		1, 0, -1,
	]);
	
	drawSquare(vertices5, vertices6);
}

function drawSquare(vertices1, vertices2) {
	drawTriangle(vertices1);
	drawTriangle(vertices2);
}

function drawPolygon(shape, radius) {
	
	shape = 3;
	radius = 1;
	
	var centeroid;
	//centeroid = true;
	
	var vertex = [];
	if(centeroid) vertex.push(0, 0, 0);
	
	var index = [];
	
	for (let i = 0; i < shape; i++) {
		
		const rotation = ( (Math.PI*2) / shape) * i;
		var deltax = radius * Math.cos(rotation);
		var deltay = radius * Math.sin(rotation);
		
		vertex.push(deltax, deltay, 0);
		if(centeroid || i<shape-2) {
		index.push(0, i+1, i+2);
		}
	}
	
	if(centeroid) vertex.push(vertex[3], vertex[4], vertex[5]);
	var vertices = new Float32Array(vertex);
	var indices = new Uint32Array(index);
	
	drawBuffer(vertices, indices);
}


function drawTriangle(vertices) {
	var indices = new Uint32Array([0, 1, 2]);
	drawBuffer(vertices, indices);
}

function drawTetra() {
	let geometry = new THREE.TetrahedronGeometry(4);
	let material = new THREE.MeshStandardMaterial({ roughness: 0.25, color: 'red'});
	let tetra = new THREE.Mesh(geometry, material);
	//tetra.rotation.set(0,1.25,(Math.PI/180)*45);
	tetra.rotation.set(0,2,-(Math.PI/180)*45);
	scene.add(tetra);
}



function drawTetraThree() {

	let geometry1 = new THREE.TetrahedronGeometry(4);
	let material1 = new THREE.MeshStandardMaterial({ side: 2, roughness: 0.25, color: 'red', wireframe: false});
	var base = new Brush(geometry1, material1);
	
	let geometry2 = new THREE.TetrahedronGeometry(1.5);
	let material2 = new THREE.MeshStandardMaterial({ roughness: 0.25, color: 'blue'});
	var stroke = new Brush(geometry2, material2);
	//stroke.rotation.set(NG1*30,0,-NG1*45);	

	
	var op = 1;
	
	//T
	//base = applyStroke(base, stroke, -2,2,-2);
	
	base = applyStroke(base, stroke, op, -1,2,-2);
	base = applyStroke(base, stroke, op, -2,1,-2);
	base = applyStroke(base, stroke, op, -2,2,-1);
	
	//----------------------
	
	//L2
	//base = applyStroke(base, stroke, op, -2,0,0);
	base = applyStroke(base, stroke, op, -2,1,0);
	base = applyStroke(base, stroke, op, -2,0,-1);
	
	// L3	
	//base = applyStroke(base, stroke, op, -2,-1,1);
	base = applyStroke(base, stroke, op, -2,0,1);
	base = applyStroke(base, stroke, op, -2,-1,0);
	
	// L4
	//base = applyStroke(base, stroke, op, -2,-2,2);
	base = applyStroke(base, stroke, op, -2,-1,2);
	base = applyStroke(base, stroke, op, -2,-2,1);
	
	//-----------------
	
	// R2
	//base = applyStroke(base, stroke, 0,2,0);
	base = applyStroke(base, stroke, op, -1,2,0);
	base = applyStroke(base, stroke, op, 0,2,-1);
	
	// R3
	//base = applyStroke(base, stroke, op, 1,2,1);
	base = applyStroke(base, stroke, op, 0,2,1);
	base = applyStroke(base, stroke, op, 1,2,0);

	// R4
	//base = applyStroke(base, stroke, op, 2,2,2);
	base = applyStroke(base, stroke, op, 1,2,2);
	base = applyStroke(base, stroke, op, 2,2,1);
	
	//------------------
	
	
	// C2
	//base = applyStroke(base, stroke, op, 0,0,-2);
	base = applyStroke(base, stroke, op, 0,1,-2);
	base = applyStroke(base, stroke, op, -1,0,-2);
	
	// C3
	//base = applyStroke(base, stroke, op, 1,-1,-2);
	base = applyStroke(base, stroke, op, 1,0,-2);
	base = applyStroke(base, stroke, op, 0,-1,-2);
	
	// C4
	//base = applyStroke(base, stroke, op, 2,-2,-2);
	base = applyStroke(base, stroke, op, 2,-1,-2);
	base = applyStroke(base, stroke, op, 1,-2,-2);
	
	//-------k
	
	// MR3
	//base = applyStroke(base, stroke, 0, 1,1,0);
	base = applyStroke(base, stroke, op, 1,1,-1);

	// MR4
	//base = applyStroke(base, stroke, op, 2,0,0);
	
	base = applyStroke(base, stroke, op, 2,-1,0);
	base = applyStroke(base, stroke, op, 2,0,-1);
	
	base = applyStroke(base, stroke, op, 2,0,1);
	base = applyStroke(base, stroke, op, 2,1,0);
	
	//MC3
	//base = applyStroke(base, stroke, 0, -1,1,0);
	base = applyStroke(base, stroke, op, -1,1,1);
	
	//MC4
	//base = applyStroke(base, stroke, op, 0,0,2);
	base = applyStroke(base, stroke, op, 0,1,2);
	base = applyStroke(base, stroke, op, -1,0,2);
	
	//---------------------------------------
	
	//ML3
	base = applyStroke(base, stroke, op, -1,-1,-1);
	
	//---------------------------
	
	// MB3
	//base = applyStroke(base, stroke, op, 1,0,1);
	base = applyStroke(base, stroke, op, 1,-1,1);
	
	//-------------------------
	
	// LB
	base = applyStroke(base, stroke, op, -1,-2,2);
	// RB
	base = applyStroke(base, stroke, op, 2,1,2);
	// BC
	base = applyStroke(base, stroke, op, 2,-2,-1);
		
	//------------------------
	
	//MCB
	base = applyStroke(base, stroke, op, 1,0,2);
	base = applyStroke(base, stroke, op, 0,-1,2);
	
	// MLB
	base = applyStroke(base, stroke, op, 0,-2,1);
	base = applyStroke(base, stroke, op, -1,-2,0);
	
	// MRB
	base = applyStroke(base, stroke, op, 1,-2,0);
	base = applyStroke(base, stroke, op, 0,-2,-1);
	
	//--------------------------
	
	
	
	scene.add(base);
	//base.rotation.set(0,2,-NG1*45);
	base.rotation.set(NG1*30,0,-NG1*45);
}

function applyStroke(base, stroke, op, x,y,z) {
	stroke.position.set(x,y,z);
	stroke.updateMatrixWorld();
	return evaluator.evaluate( base, stroke, op );
}

function drawBuffer(vertices, indices) {

	var bufferGeometry = new THREE.BufferGeometry();
	bufferGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
	bufferGeometry.setIndex(new THREE.BufferAttribute(indices, 1));
	bufferGeometry.computeVertexNormals();
	
	//var mesh = new THREE.Mesh(bufferGeometry, new THREE.MeshStandardMaterial());

	var materials = [];
	var groups = [];
	for (let i = 0; i < indices.length / 3; i++) {
		materials.push(new THREE.MeshStandardMaterial({ color: rainbowArr[i] }));
		groups.push({ start: i*3, count: 3, materialIndex: i });
	}
	var mesh = new THREE.Mesh(bufferGeometry, materials);
	mesh.geometry.groups = groups;
	
	scene.add(mesh);
}
