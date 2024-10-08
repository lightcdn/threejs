
var textureLoader;
var fontLoader, gltfLoader;
var font;

var renderer, scene, camera;
var ambientLight, directionalLight;
var controls;
var xGridHelper, yGridHelper, zGridHelper;

var evaluator;

//const enableGrid = 0;
const enableGrid = 1;
const gridSize = 40;

async function initTHREE() {

	THREE.Cache.enabled = true;
	
	textureLoader = new THREE.TextureLoader();
	fontLoader = new FontLoader();
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(threeDiv.clientWidth, threeDiv.clientHeight);
	//renderer.shadowMap.enabled = true;
	//renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	renderer.setAnimationLoop(animate);
	threeDiv.appendChild(renderer.domElement);

	scene = new THREE.Scene();
	//scene.fog = new THREE.Fog( 0x000000, 50, 1000 );

	ambientLight = new THREE.AmbientLight(0xffffff, 2);
	directionalLight = new THREE.DirectionalLight(0xffffff, 2);
	directionalLight.position.set(1, 2, 1).normalize();

	camera = new THREE.PerspectiveCamera(100, threeDiv.clientWidth / threeDiv.clientHeight, 0.1, 1000);
	camera.position.z = 5;

	if(OrbitControls) {
		controls = new OrbitControls(camera, renderer.domElement);
	}
	
	if(enableGrid) {
		xGridHelper = new THREE.GridHelper(gridSize, gridSize, 'red', 'pink');

		yGridHelper = new THREE.GridHelper(gridSize, gridSize, 'green', 'lightgreen');
		yGridHelper.rotation.x = Math.PI/2;

		zGridHelper = new THREE.GridHelper(gridSize, gridSize, 'blue','lightblue');
		zGridHelper.rotation.z = Math.PI/2;
	}
	
	evaluator = new Evaluator();
	
	//var fontResponse = await fetch("../threejs/examples/fonts/optimer_bold.typeface.json");
	var fontResponse = await fetch("https://lightcdn.github.io/threejs/examples/fonts/optimer_bold.typeface.json");
	var fontJson = await fontResponse.json();
	font = fontLoader.parse(fontJson);

}

var animate = function () {
	if(controls) controls.update();
	renderer.render(scene, camera);
};

function preEval() {
	scene.clear();

	if(enableGrid) {
		scene.add( zGridHelper );
		scene.add( yGridHelper );
		scene.add( xGridHelper );
	}
	
	scene.add(ambientLight);
	scene.add(directionalLight);
}

function postEval() {
	
	//drawPolygon();
	//drawTetra();
	//drawTetraThree();
	
	//drawExtrudeShape();
	
	drawFloorPlan();
	
	//drawShop();
	//drawBakery();
	
}
