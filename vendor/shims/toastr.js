(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['toastr'],
      __esModule: true,
    };
  }

  define('toastr', [], vendorModule);
})();
