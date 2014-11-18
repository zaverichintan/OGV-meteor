# Online Geometry Viewer

Online Geometry Viewer is an online web application, where users can upload, view
and share 3D CAD models. They can also host these models online, can like (love)
or comment on them. In a nutshell it can be looked at as a social blogging 
platform for 3D models. 

----------------------
#Installation Steps
#### Debian and Ubuntu based Linux distributions

* Install Nodejs :

  * sudo apt-get install python-software-properties python g++ make
  * sudo add-apt-repository ppa:chris-lea/node.js
  * sudo apt-get update
  * sudo apt-get install nodejs

* Install mongoDB

  * sudo apt-get install mongodb

* Install Meteor

  * sudo apt-get install curl
  * curl https://install.meteor.com/ | sh

* Clone the OGV Repository

  * sudo apt-get install git
  * git clone https://github.com/BRL-CAD/OGV-meteor

* Run OGV
    
  * cd OGV-meteor/OGV
  * meteor

* Open Browser and type in URL

  * http://localhost:3000

