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
 * Events, helpers and other logic required to render 3d models in
 * model Viewer. 
 */

Template.modelViewer.events({
    'click #sm-item-love':function()
    {
        var love = {
            postId: this._id
        };
 	Meteor.call('love', love, function(error, loveId) {
	    if (error) {
		sAlert.error(error.reason);
	    }
	});
    },

    'click #sm-item-embed':function() 
    {
	generateEmbedCode();
    },

    'click #sm-item-comment':function() 
    {
	$('#overlay-comments').css({'bottom':'0px'});
    },

    'click #comments-close-button':function() 
    {
	$('#overlay-comments').css({'bottom':'-10000px'});
    }
});

Template.modelViewer.helpers({
    lovers: function() 
    {
	loversObj = Lovers.findOne({postId: this._id});
	if (loversObj) {
	    loversArray = loversObj.lovers;
	    return loversArray.length;
        } else {
            return 0;
        }
    },

    comments: function() 
    {
	return Comments.find({postId: this._id});
    },

    model: function() 
    {
	return this.data;
    }
});

Template.modelViewer.rendered = function() 
{
    console.log("rendered");
    model = this.data;
    objList = getObjFiles(model);	
    console.log(objList);
     
    init();
    animate();
}

/**
 * Get list of OBJ files for the current .g database
 */

function getObjFiles(model) 
{
    var objUrls = [];
    sAlert.success("getting obj files", {effect: 'flip', onRouteClose: false, stack: false, timeout: 4000, position: 'top'});    
    modelId = model._id;
    OBJFiles.find({ gFile : modelId }).forEach( function (objFile) {
	objUrls.push(objFile.url());
    });
    console.log(objUrls);
    return objUrls;
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
    
    /** 
     * Create a scene, that will hold all our elements such 
     * as objects, cameras and lights
     */
    scene = new THREE.Scene();

    /**
     * Create a camera, which defines where we're looking at.
     */
    camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 100000);
    camera.position.z = 2000;
    camera.position.x = 2000;
    camera.position.y = 2000;
    
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
    grid = new THREE.GridHelper(3000, 100);
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
    for (i in objList) {
	loader.load( objList[i], function(object) {
	    var OBJMaterial = new THREE.MeshPhongMaterial({color: 0xeeeeee});
	    object.traverse(function(child) {
		if (child instanceof THREE.Mesh) {
		    child.material  = OBJMaterial;
		}
	    });
	    object.position.y = 0.1;
	    object.rotation.z =  90 * Math.PI/180;
	    object.rotation.x = -90 * Math.PI/180;
	    scene.add(object);
	});
    }

    /**
     * If webgl is there then use it otherwise use canvas
     */
    if (Detector.webgl) {
	renderer = new THREE.WebGLRenderer({antialias:true});
    } else {
	renderer = new THREE.CanvasRenderer(); 
    }

    /**
     * Sets size and color to renderer
     */
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x555555, 1); 
    container.appendChild(renderer.domElement);

    
    /**
     * orbitControls for zoom in/ zoom out and other basic controls
     */
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);    
	 
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener( 'keydown', onKeyDown, false );

    animate();

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
/**
 * Generate embed code for the current model, this iframe can
 * be added on any webpage to view the model.
 */
function generateEmbedCode()
{
    var thisURL = Meteor.absoluteUrl() + "/models/" + model._id;
    embedCode = "<iframe width=\"500\" height=\"250\" src=\"" + thisURL + "\" frameborder=\"0\"></iframe>";
    sAlert.success(embedCode, {effect: 'flip', onRouteClose: false, stack: false, timeout: 10000, position: 'top'});
    return embedCode;
}

/**
 * onKeyDown function helps to view model from 
 * different angles on keyboard button press.
 */

function onKeyDown( event )
{
    switch (event.keyCode)
    {
        case 84: /* T */
            camera.position.set( 0, 3000, 0 ); // top view
            camera.lookAt(scene.position);
            break;
        case 66: /* B */
            camera.position.set( 0, -3000, 0 ); // bottom view
            camera.lookAt(scene.position);
            break;
        case 70: /* F */
            camera.position.set( -3000, 0,  0); // front view
            camera.lookAt(scene.position);
            break;
        case 82: /* R */
            camera.position.set( 3000, 0, 0 ); // rear view
            camera.lookAt(scene.position);
            break;
        case 78: /* N */
            camera.position.set( 2000, 2000, 2000 ); // Reset view using N
            camera.lookAt(scene.position);
            break;                
    }
} 