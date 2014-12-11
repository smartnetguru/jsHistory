var lusu = {
  
  'get' : function(page, callback) {
    request = new XMLHttpRequest();
    request.open('GET', page, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400){
        if(typeof callback == 'function') {
          callback(request.responseText);
        } else {
          return request.responseText;
        }
      } else {
        return false;
      }
    };

    request.onerror = function() {
      return false;
    };

    request.send();
  },
  'require': function(script) {
  
  },
  'doc': {
    'ready' : function(callback) {
      document.addEventListener('DOMContentLoaded', function() {
        if(typeof callback == 'function') {
          return callback();
        }
        
        return true;
      });
    }
  },
  'history' : {
    'regex' : /<body\s*[^>]*>([\S\s]*?)<\/body>/i,
    'push': function(page, callback) {
      if(page != undefined) {
        if (history && history.pushState) {
          history.pushState(page, '', page);
          
          this.historyDone(page);
          
          if(typeof callback == 'function') {
            callback();
          } else {
            return true;
          }
        }
      } 
    },
    'historyDone': function(page) {
      var regex = this.regex;

      lusu.get(page, function(response) {
        var body = regex.exec(response);
        var body = (body != null ? body[1] : response);
        
        document.body.innerHTML = body;
      });
    },
    'change': function() {
      window.addEventListener('popstate', function(e) {
        if(e.state != null) {
          lusu.history.push(e.state);
        } else {
          lusu.history.push('');
        }
      });
    }
  }
};