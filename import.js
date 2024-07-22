
import * as THREE from 'three';
window.THREE = THREE;

import * as OrbitControls from 'three/addons/controls/OrbitControls.js';
window.OrbitControls = OrbitControls.OrbitControls;

import * as FontLoader from 'three/addons/loaders/FontLoader.js';
window.FontLoader = FontLoader.FontLoader;


import * as GLTFLoader from 'three/addons/loaders/GLTFLoader.js';
window.GLTFLoader = GLTFLoader.GLTFLoader;

import * as TextGeometry from 'three/addons/geometries/TextGeometry.js';
window.TextGeometry = TextGeometry.TextGeometry;

import { ADDITION, Brush, DIFFERENCE, EdgesHelper, Evaluator, GridMaterial, HOLLOW_INTERSECTION, HOLLOW_SUBTRACTION, HalfEdgeHelper, HalfEdgeMap, INTERSECTION, Operation, OperationGroup, PointsHelper, REVERSE_SUBTRACTION, SUBTRACTION, TriangleSetHelper, TriangleSplitter, computeMeshVolume, generateRandomTriangleColors, getTriangleDefinitions, logTriangleDefinitions } from 'three-bvh-csg';
[ window.ADDITION, window.Brush, window.DIFFERENCE, window.EdgesHelper, window.Evaluator, window.GridMaterial, window.HOLLOW_INTERSECTION, window.HOLLOW_SUBTRACTION, window.HalfEdgeHelper, window.HalfEdgeMap, window.INTERSECTION, window.Operation, window.OperationGroup, window.PointsHelper, window.REVERSE_SUBTRACTION, window.SUBTRACTION, window.TriangleSetHelper, window.TriangleSplitter, window.computeMeshVolume, window.generateRandomTriangleColors, window.getTriangleDefinitions, window.logTriangleDefinitions ]
= [ ADDITION, Brush, DIFFERENCE, EdgesHelper, Evaluator, GridMaterial, HOLLOW_INTERSECTION, HOLLOW_SUBTRACTION, HalfEdgeHelper, HalfEdgeMap, INTERSECTION, Operation, OperationGroup, PointsHelper, REVERSE_SUBTRACTION, SUBTRACTION, TriangleSetHelper, TriangleSplitter, computeMeshVolume, generateRandomTriangleColors, getTriangleDefinitions, logTriangleDefinitions ];
