Javascript History libary
========
An history push libary fore modern web applications.
______

Set a new url for the history:
`lusu.history.push( string page, function callback );`

```
lusu.history.push('/page/id/3', function() {
   // Action when the load is done.
 });
```
If you want to do a get request:

`lusu.doc.get( string page, function callback );`

```
lusu.doc.get('page', function(response) {
   // Action.
 });
```
If you want to trigger an action when the document is ready:

`lusu.doc.get( function callback );`

```
lusu.doc.ready(function() {
   // Action.
 });
```

Triggers when the back button is pressed:
```
lusu.history.change();
```
