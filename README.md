# Feathers.js - Vue Sandbox

## Getting Started

### Vue.js and Feathers

You will need a basic understanding of the [Vue.js web framework](https://vuejs.org/) and the [Feathers API layer](https://feathersjs.com/) in order to use this library.

### Provided Libraries

The application comes with a few npm libraries pre-installed, which you can see in the corresponding `package.json` files. The highlights are:

**Frontend**:

* Vue.js
* Vue-Socket.io
* lodash
* font-awesome (icons)
* scss (may be used to style components)

**Backend**:

* Feathers
* lodash
* Socket.io
* Redis

## The Basics

As you are reading this you have already successfully run the Makefile to start the application. You can visit the app at http://localhost:8380/ 

Navigate your browser to this page and you should see a the home page

This page will load the frontend application code. In most cases, it will automatically reload whenever source files are changed. In the rare exceptions where the auto-reload does not trigger, you will have to manually refresh the page to see your changes.

### Files and Folders

The sandbox app consists of a backend and a frontend application. You will find the source code of the backend server in the `srv/` folder. The frontend code is located in the `web/` folder.


### Frontend (`app/web`)

The frontend is a simple [Vue.js web framework](https://vuejs.org/) application. The entry point is the file `src/main.js`, which contains the basic setup of Vue and the feathers client which will be used for communication with the server (see below).

You can see that the app is made from several [single file component files](https://vuejs.org/v2/guide/single-file-components.html). The main component is located at `src/Entry.vue`.

### Backend (`app/srv`)

The backend server is based on the [Feathers API layer](https://feathersjs.com/). The app comes prepared with a single service named `quotes` which can be accessed via REST. The service uses a MongoDB instance as backend and supports the basic CRUD operations.

Similiar to the web app, the server is automatically restarted as soon as a file is changed.


### Database

The MongoDB instance is used to persist data from the application. For the task below, you may freely add fields, collections, and indices as you seem fit.

You can access the mongo shell with this command:
`docker exec -it container_name mongo app`

### Logs

You can view output of Node.js with this command:
`docker logs -f container_name`

## Copyright
MIT Licensed.