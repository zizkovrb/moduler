(function( window, document ) {

  var Moduler = {
    config : {
      cssPath : '/css/',
      jsPath : '/js/',
      media : 'screen'
    },

    init : function( options ) {

      this.config.cssPath = options.cssPath || this.config.cssPath;
      this.config.jsPath = options.jsPath || this.config.jsPath;

      this.cssElements = document.querySelectorAll('[data-moduler-css]')
      this.jsElements = document.querySelectorAll('[data-moduler-js]')

      this.iterateCSS( this.cssElements, this.config.media, this.config.cssPath );
      this.iterateJS( this.jsElements, this.config.jsPath );
    },

    iterateCSS : function( elements, media, path ) {
      elements.forEach(function( currentValue ) {
        var name = currentValue.getAttribute('data-moduler-css');
        var fullpath = path + name;

        this.loadCSS( fullpath, media );
      });
    },

    iterateJS : function( elements, path ) {
      elements.forEach(function( currentValue ) {
        var name = currentValue.getAttribute('data-moduler-js');
        var fullpath = path + name;

        this.loadCSS( fullpath );
      });
    },

    loadCSS : function( href, media, callback ) {
      "use strict";
    	var ss = document.createElement( "link" );
    	var ref = document.querySelector('script');
    	var sheets = document.styleSheets;
    	ss.rel = "stylesheet";
    	ss.href = href;
    	// temporarily, set media to something non-matching to ensure it'll fetch without blocking render
    	ss.media = "only x";
    	// DEPRECATED
    	if( callback ) {
    		ss.onload = callback;
    	}

    	// inject link
    	ref.parentNode.insertBefore( ss, ref );
    	// This function sets the link's media back to `all` so that the stylesheet applies once it loads
    	// It is designed to poll until document.styleSheets includes the new sheet.
    	ss.onloadcssdefined = function( cb ){
    		var defined;
    		for( var i = 0; i < sheets.length; i++ ){
    			if( sheets[ i ].href && sheets[ i ].href.indexOf( href ) > -1 ){
    				defined = true;
    			}
    		}
    		if( defined ){
    			cb();
    		} else {
    			setTimeout(function() {
    				ss.onloadcssdefined( cb );
    			});
    		}
    	};
    	ss.onloadcssdefined(function() {
    		ss.media = media || "all";
    	});
    	return ss;
    },

    loadJS : function( src, callback ) {
      "use strict";
    	var script = document.createElement( "script" );
    	script.src = src;
    	script.async = true;
    	document.body.appendChild( script );
    	if (callback && typeof(callback) === "function") {
    		script.onload = callback;
    	}
    	return script;
    }
  }

})(window, document)
