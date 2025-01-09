// console.log("Hello, GAS")
// console.log("This is zaim register.")

// Ref : https://github.com/googleworkspace/apps-script-oauth1/blob/main/samples/Twitter.gs
function run(){
    var service = getService_();
    if (service.hasAccess()) {
        var url = 'https://api.zaim.net/v2/home/money';
        var response = service.fetch(url, {
          method: 'get'
        });
        var result = JSON.parse(response.getContentText());
        Logger.log(JSON.stringify(result, null, 2));
    } else {
        var authorizationUrl = service.authorize();
        Logger.log('Open the following URL and re-run the script: %s',
            authorizationUrl);
      }
}

function reset() {
    var service = getService_();
    service.reset();
  }
  
  function getService_() {
    return OAuth1.createService('Zaim')
        // Set the endpoint URLs.
        .setAccessTokenUrl('https://api.zaim.net/v2/auth/access')
        .setRequestTokenUrl('https://api.zaim.net/v2/auth/request')
        .setAuthorizationUrl('https://auth.zaim.net/users/auth')
  
        // Set the consumer key and secret.
        .setConsumerKey(CONSUMER_KEY)
        .setConsumerSecret(CONSUMER_SECRET)
  
        // Set the name of the callback function in the script referenced
        // above that should be invoked to complete the OAuth flow.
        .setCallbackFunction('authCallback')
    
        // Using a cache will reduce the need to read from 
        // the property store and may increase performance.
        .setCache(CacheService.getUserCache())
  
        // Set the property store where authorized tokens should be persisted.
        .setPropertyStore(PropertiesService.getUserProperties());
  }
  
/**
 * Handles the OAuth callback.
 */
function authCallback(request) {
    var service = getService_();
    var authorized = service.handleCallback(request);
    if (authorized) {
      return HtmlService.createHtmlOutput('Success!');
    } else {
      return HtmlService.createHtmlOutput('Denied');
    }
  }