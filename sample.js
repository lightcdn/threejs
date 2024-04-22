
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

	// Create a new tube geometry
	const tubeGeometry = new THREE.TubeGeometry(curve, 100, 2, 8, false);

	// Create a new material
	const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

	// Create a new mesh
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

function drawBuffer(vertices, indices) {

	var bufferGeometry = new THREE.BufferGeometry();
	bufferGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
	bufferGeometry.setIndex(new THREE.BufferAttribute(indices, 1));
	bufferGeometry.computeVertexNormals();
	
	//var mesh = new THREE.Mesh(bufferGeometry, new THREE.MeshStandardMaterial());

	var materials = [];
	var groups = [];
	
	for (let i = 0; i < indices.length / 3; i++) {
		materials.push(new THREE.MeshBasicMaterial({ color: rainbowArr[i] }));
		groups.push({ start: i*3, count: 3, materialIndex: i });
	}
	
	var mesh = new THREE.Mesh(bufferGeometry, materials);
	mesh.geometry.groups = groups;
	
	scene.add(mesh);
}
