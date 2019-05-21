# e-bot7 Dev Sandbox

## Getting Started

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

As you are reading this you have already successfully run the Makefile to start the application. You can visit the app at http://localhost:8380/ 

Navigate your browser to this page and you should see a simple web form:

![Basic web form](images/basic-web-form.png)

This page will load the frontend application code. In most cases, it will automatically reload whenever source files are changed. In the rare exceptions where the auto-reload does not trigger, you will have to manually refresh the page to see your changes.

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

You can access the mongo shell with this command:
```
docker exec -it ebot7-recruit mongo app
```

### Logs

You can view output of Node.js with this command:
```
docker logs -f ebot7-recruit
```

## Task description

**Important!**
You do not have to do all of the following tasks. There are separate tests for front end, back end, and full stack developers. Only do the tasks assigned to the position you applied for. For example, "Part IV: Deleting Quotes [Full stack, Front end]" should be completed by full stack and front end applicants, but not back end applicants.

To get an understanding of the tasks at hand, picture the following scenario. An application has been developed for a client which enables users to post quotes to a central database. You have recently taken over this project and have received a couple of new requirements by the client.


### Part I: Group Quotes by Author [Front end]

Change the homepage layout so that quotes are grouped by author. Each group of quotes should have the author's name as a header. Consider how to efficiently lay out the page for maximum readability.

### Part II: Merge QuoteItem and QuoteForm Into Single Component[Front end]

Replace the QuoteItem and QuoteForm component with a single component called EditableQuote. 
The QuoteItems in the QuoteList should be replaced by EditableQuotes. The QuoteForm component should no longer appear on the page. Part III explains how new quotes should be added.

EditableQuote should:

  * Have two modes, a display and edit mode. The display mode should only show the quote, not the author. Clicking the component should cause the author and quote to appear in text inputs. Only one quote should be in edit mode at a time. Clicking on a quote should make all other quotes revert to display mode.
  * Automatically save changes to the server as the user types.
  * Indicate when changes are being saved, on both display and edit mode.

### Part III: Add a Button For Adding a New Quote [Front end]

Add a button for adding a new quote. Clicking this button should display a modal with an empty EditableQuote.

### Part IV: Deleting Quotes [Full stack, Front end]

In the current state of the application, quotes may be added to the list but the user interface does not allow the user to delete one. The client wants their users to be able to delete any quote. They don't offer a detailed description of this "Deletion" feature, but expect an intuitive and simple process for the user.

After deletion of an item it should disappear from the list on the page.

### Part V: Search Bar (Bonus) [Front end]

**Only do this task if you are satisfied with the completeness of all other tasks**

Create a search bar component which allows the user to search both authors and quotes. The filtered quotes should still be grouped by author. Highlight the matching text where it appears in either the quote or author. The search bar should check the server, not just the local quotes.

### Part VI: Improving the User Experience [Full stack]

The client is not satisfied with the user experience of the current form. They propose a few improvements:

1. While a request to the server is running, the user should see some kind of load indicator (e.g. a spinning icon).
2. In addition to showing a load icon, all form inputs and buttons should be disabled until all requests are finished.
3. After successfully saving a quote, the form input fields should be cleared.

### Part VII: Validating Quotes on the Server [Full stack, Back end]

The client has decided they want to introduce a few formatting rules which the quotes have to follow in order to be accepted. Any request by a client that would result in an entry that does not adhere to these rules must be rejected by the server.

**Rule 1:** The length of the quote should be between 10 and 200 characters.

**Rule 2:** The quote has to contain at least eight unique letters. The case of the letters is irrelevant, so that "A" and "a" are considered the same letter. Any special character (including modified letters such as à, ö, Ç, ...) should not be considered in this rule.

**Rule 3:** The client wants to prevent plagiarism of existing quotes and has come up with a simple test to determine such cases. They consider a quote as plagiarized when the following condition is met:
The new quote contains 3 or more consecutive words which have been used in the same order in a previous quote. Two words with the same letters but different case are considered to be equivalent (e.g. apple equals Apple equals APPLE).


### Part VIII: Alerting the User [Full stack]

In case one of the rules from Part VII is violated by a submission, the user should be informed about that violation, e.g. by triggering a browser alert with a message "This quote violates rule 1."


### Part IX: Improving Database Performance [Full stack, Back end]

In the database there is another collection that has not been used in the application so far, named `archived-quotes`. It consists of a large archive of quotes which were gathered from different sources. The client does not want those quotes to be displayed to the user, but the archive should be checked whenever a new quote is added in order to find possible plagiarisms (see rule 3 of Part VII).

Simply checking each document in the `archived-quotes` collection would be straightforward to implement, but due to the size of the collection such a test would take a long time to complete, which would result in the entire application slowing down. Implement a solution that allows these queries to run in a much shorter time.

### Part X: Bug Fixes [Full stack, Front end]

In the `web` application, there is an unused component at `src/components/LoopyButton.vue`. It was meant to appear somewhere inside the form, but was removed due to faulty behaviour. The planned behaviour was that this button should display a number which is incremented by 1 each time it is clicked. Find the bug in the component and fix it.

## Submission

**Very Important!** In order for us to evaluate your submission please make sure all your changes are committed and these commits have been pushed to your git repository. 
```
git push
```
Once everything is pushed you can run `make clean` to free up all resources used by the docker container. We will review your result over the coming days and get back to you once we are finished :)

## Copyright

Copyright (C) e-bot7 GmbH - All Rights Reserved. Unauthorized copying and/or distribution of any file in this repository, via any medium is strictly prohibited.

