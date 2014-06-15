/**
 * Loads the model after the template has been rendered
 */

Template.modelViewer.rendered = function() 
{
    console.log("rendered");
    mouseX = 0, mouseY = 0;
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
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
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 100;
    scene = new THREE.Scene();
    
    /**
     * Light up the scene 
     */
    
    var ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);
    var directionalLight = new THREE.PointLight(0xaaaaaa);
    directionalLight.position = camera.position;
    scene.add(directionalLight);
   
    /** Axes */
    var axes = new THREE.AxisHelper(10000);
    scene.add(axes);

    /** Grid */
    var grid = new THREE.GridHelper(300, 10);
    scene.add(grid); 	 

    /**
     * Loader Managerial tasks
     */

    var manager = new THREE.LoadingManager();
    manager.onProgress = function(item, loaded, total) 
    {
	console.log(item, loaded, total);
    };

    /**
     * Adds the model to the viewer aka loads OBJ files 
     * using OBJ-Loader
     */

    var loader = new THREE.OBJLoader(manager);

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

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() 
{
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) 
{
    mouseX = (event.clientX - windowHalfX) / 2;
    mouseY = (event.clientY - windowHalfY) / 2;
}


function animate() 
{
    requestAnimationFrame(animate);
    render();
}

function render() 
{
    camera.position.x += (mouseX - camera.position.x) * .05;
    camera.position.y += (-mouseY - camera.position.y) * .05;

    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

