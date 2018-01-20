(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['tippy'],
      __esModule: true,
    };
  }

  define('tippy', [], vendorModule);
})();
