Javascript History libary
========
An history push libary fore modern web applications.
______

Set a new url for the history:
`lusu.history.push( string page [, function callback ]);`

```
lusu.history.push('/page/id/3', function() {
   // Action when the load is done.
 });
```
If you want to do a get request:

`lusu.doc.get( string page [, function callback]);`

```
lusu.doc.get('page', function(response) {
   // callback function with response (not required)
 });
```
If you want to trigger an action when the document is ready:

`lusu.doc.ready( function callback );`

```
lusu.doc.ready(function() {
   // Code to run when the DOM is ready to execute Javascript.
 });
```

Triggers when the back button is pressed, needs to be called before the document ready:
```
lusu.history.change();
```

### initialize function

The initialize function will be called when a history.push is requested to-reset the addEventListener for the new document, you can add an event listener by using `lusu.add.eventListeners('a')`, this will add the history push event to all the `a` attributes.

```
lusu.initialize = function() {
  lusu.add.eventListeners('a');
  console.log('Load!');
};
```