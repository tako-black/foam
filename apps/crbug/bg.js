var p;
function launch() {
  if ( ! p ) p = Project.create();
  p.launchBrowser();
}

if ( chrome.app.runtime ) {
  ajsonp = (function() {
    var factory = OAuthXhrFactory.create({
      authAgent: ChromeAuthAgent.create({}),
      responseType: "json"
    });

    return function(url, params) {
      return function(ret) {
        var xhr = factory.make();
        return xhr.asend(ret, "GET", url + (params ? '?' + params.join('&') : ''));
      };
    };
  })();

  chrome.app.runtime.onLaunched.addListener(function(opt_launchData) {
    console.log('launched');
    if ( opt_launchData ) console.log(opt_launchData.url);
    launch();
  });
}
