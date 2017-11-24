# e-bot7 Dev Sandbox

## Getting Started

### Tools

You will need the following tools to complete this task.

1. An ssh and/or sftp client

  You should have received ssh credentials (user + password or ssh private key) during the preparation. With these, you can access and edit existing files and create new files via ssh or sftp.

2. A modern browser, preferably Chrome/Chromium or Firefox

  Multi-browser support is not part of this task and the base application has not been tested in any browser except Chromium. Judgement of the result will also be done in Chromium, therefore it is strongly recommended to use that browser for development. (Google Chrome should be fine, too.)

### Vue.js and Feathers

You will need a basic understanding of the [Vue.js web framework](https://vuejs.org/) and the [Feathers API layer](https://feathersjs.com/) in order to complete this task.

### Provided Libraries

The application comes with a few npm libraries pre-installed, which you can see in the corresponding `package.json` files. The highlights are:

**Frontend**:

* Vue.js
* lodash
* font-awesome (icons)
* scss (may be used to style components)

**Backend**:

* Feathers
* lodash

Note: Your code should not rely on any libraries besides the ones already installed.


## The Basics

As part of the preparation you will receive a public URI that you can open in your browser. It will look something like [http://3f8he.rsb.e-bot7.de/](http://3f8he.rsb.e-bot7.de/).

Navigate your browser to this page and you should see a simple web form:

![Basic web form](images/basic-web-form.png)

This page will loads the frontend application code. In most cases, it will automatically reload whenever source files are changed. In the rare exceptions where the auto-reload does not trigger, you will have to manually refresh the page to see your changes.

You should be able to enter some data and submit the form, which will send the data to the backend, where it is saved to the database. The saved data will then be displayed in the list below the form:

![Saved form](images/saved-form.png)

If you encounter any problems loading and displaying the application at any point, or if the basic functionality describe above does not work when you first try the application, be sure to ask for assistance.


### Files and Folders

The sandbox app consists of a backend and a frontend application. You will find the source code of the backend server in the `srv/` folder. The frontend code is located in the `web/` folder.


### Frontend (`web`)

The frontend is a simple [Vue.js web framework](https://vuejs.org/) application. The entry point is the file `src/main.js`, which contains the basic setup of Vue and the feathers client which will be used for communication with the server (see below).

You can see that the app is made from several [single file component files](https://vuejs.org/v2/guide/single-file-components.html). The main component is located at `src/Entry.vue`.

### Backend (`srv`)

The backend server is based on the [Feathers API layer](https://feathersjs.com/). The app comes prepared with a single service named `quotes` which can be accessed via REST. The service uses a MongoDB instance as backend and supports the basic CRUD operations.

Similiar to the web app, the server is automatically restarted as soon as a file is changed.


### Database

The MongoDB instance is used to persist data from the application. For the task below, you may freely add fields, collections, and indices as you seem fit.


## Task description

To get an understanding of the task at hand, picture the following scenario. An application has been developed for a client which enables users to post quotes to a central database. You have recently taken over this project and have received a couple of new requirements by the client.


### Part I: Deleting Quotes

In the current state of the application, quotes may be added to the list but the user interface does not allow the user to delete one. The client wants their users to be able to delete any quote. They don't offer a detailed description of this "Deletion" feature, but expect an intuitive and simple process for the user.

After deletion of an item it should disappear from the list on the page.


### Part II: Improving the User Experience

The client is not satisfied with the user experience of the current form. They propose a few improvements:

1. While a request to the server is running, the user should see some kind of load indicator (e.g. a spinning icon).
2. In addition to showing a load icon, all form inputs and buttons should be disabled until all requests are finished.
3. After successfully saving a quote, the form input fields should be cleared.

### Part III: Validating Quotes on the Server

The client has decided they want to introduce a few formatting rules which the quotes have to follow in order to be accepted. Any request by a client that would result in an entry that does not adhere to these rules must be rejected by the server.

**Rule 1:** The length of the quote should be between 10 and 200 characters.

**Rule 2:** The quote has to contain at least eight unique letters. The case of the letters is irrelevant, so that "A" and "a" are considered the same letter. Any special character (including modified letters such as à, ö, Ç, ...) should not be considered in this rule.

**Rule 3:** The client wants to prevent plagiarism of existing quotes and has come up with a simple test to determine such cases. They consider a quote as plagiarized when the following condition is met:
The new quote contains 3 or more consecutive words which have been used in the same order in a previous quote. Two words with the same letters but different case are considered to be equivalent (e.g. apple equals Apple equals APPLE).


### Part IV: Alerting the User

In case one of the rules from Part III is violated by a submission, the user should be informed about that violation, e.g. by triggering a browser alert with a message "This quote violates rule 1."


### Part V: Improving Database Performance

In the database there is another collection that has not been used in the application so far, named `archived-quotes`. It consists of a large archive of quotes which were gathered from different sources. The client does not want those quotes to be displayed to the user, but the archive should be checked whenever a new quote is added in order to find possible plagiarisms (see rule 3 of Part III).

Simply checking each document in the `archived-quotes` collection would be straightforward to implement, but due to the size of the collection such a test would take a long time to complete, which would result in the entire application slowing down. Implement a solution that allows these queries to run in a much shorter time.

### Part VI: Bug Fixes

In the `web` application, there is an unused component at `src/components/LoopyButton.vue`. It was meant to appear somewhere inside the form, but was removed due to faulty behaviour. The planned behaviour was that this button should display a number which is incremented by 1 each time it is clicked. Find the bug in the component and fix it.


## Copyright

Copyright (C) e-bot7 GmbH - All Rights Reserved. Unauthorized copying and/or distribution of any file in this repository, via any medium is strictly prohibited.


Bugs in Promises

