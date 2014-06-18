/**
/*               M O D E L _ V I E W E R . J S
 * BRL-CAD
 *
 * Copyright (c) 1995-2013 United States Government as represented by
 * the U.S. Army Research Laboratory.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public License
 * version 2.1 as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this file; see the file named COPYING for more
 * information.
 */

/** @file OGV/client/views/model_viewer.js
 * Renders model into modelViewer.html
 * Loads the model after the template has been rendered
 */

Template.modelViewer.rendered = function() 
{
    console.log("rendered");
    model = this.data;
    modelName = model.name;    

    init();
    animate();
}

/**
 * Initializes the model viewer
 */

function init() 
{
    /**
     * Setting Up the scene: 
     * Grabs the model-container div from template into a variable
     * named container, and sets up the scene 
     */
    container = document.getElementById('model-container');
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 500;
 

    scene = new THREE.Scene();
    
    /**
     * Light up the scene 
     */
    
    ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);
    directionalLight = new THREE.PointLight(0xaaaaaa);
    directionalLight.position = camera.position;
    scene.add(directionalLight);
   
    /** Axes */
    axes = new THREE.AxisHelper(10000);
    scene.add(axes);

    /** Grid */
    grid = new THREE.GridHelper(300, 10);
    scene.add(grid); 	 

    /**
     * Loader Managerial tasks
     */

    manager = new THREE.LoadingManager();
    manager.onProgress = function(item, loaded, total) 
    {
	console.log(item, loaded, total);
    };

    /**
     * Adds the model to the viewer aka loads OBJ files 
     * using OBJ-Loader
     */

    loader = new THREE.OBJLoader(manager);

    /**
     * Adds material to the model, which hence controls 
     * how the model shall look 
     */

    loader.load( '/' + modelName, function(object) {
	var OBJMaterial = new THREE.MeshPhongMaterial({color: 0xeeeeee});
	object.traverse(function(child) {
	    if (child instanceof THREE.Mesh) {
		child.material  = OBJMaterial;
	   }
	});

	object.position.y = - 80;
	scene.add(object);
    });

    /**
     * Renders the model, using renderer and assigns size to it
     */

    renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x555555, 1); 
    container.appendChild(renderer.domElement);

    
    /**
     * orbitControls for zoom in/ zoom out and other basic controls
     */
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', animate );    
	 
    window.addEventListener( 'resize', onWindowResize, false );1

}

/**
 * when window resizes, the size of modelviewer needs to resize
 */
function onWindowResize() 
{

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();
}

function render() 
{
    renderer.render(scene, camera);
}

function animate() 
{
    requestAnimationFrame( animate );
    render();

}

