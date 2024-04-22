let importmap = {
	"imports": {
		"three": "https://lightcdn.github.io/threejs/build/three.module.js",
		"three/addons/": "https://lightcdn.github.io/threejs/examples/jsm/",
		"three-mesh-bvh": "https://lightcdn.github.io/threejs/plugins/three-mesh-bvh.module.js",
		"three-bvh-csg": "https://lightcdn.github.io/threejs/plugins/three-bvh-csg.module.js"
	}
};

var script = document.createElement('script');
script.setAttribute('type', 'importmap');
script.text = JSON.stringify(importmap);

var curr = document.currentScript;
curr.parentNode.insertBefore(script, curr.nextSibling);