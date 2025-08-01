    window.onload = function() {
      const params = new URLSearchParams(window.location.search);
      
      // extract parameters
      const baseUrl = params.get("baseurl"); 
      const itemid = params.get("itemid"); // read from query string
      const status = params.get("status");
      //buildURL
      const fullUrl = decodeURIComponent(baseUrl) + "&itemid=" + encodeURIComponent(itemid) + "&status=" + encodeURIComponent(status);
      const successString = `<b>The holiday has been ${status}.</b><br>You may now close this window.`;
      const failedString = `<b>The holiday was not ${status} as the attempt failed.</b><br>Please try again by refreshing the page, or contact your system administrator if the problem persists.`;
      
      // do a GET on the url to trigger the flow and change the text displayed on the site.
      fetch(fullUrl, { method: "GET" })
        .then(() => {
          document.getElementById('display-text').innerHTML = successString;
          //document.getElementById('display-text').textContent = successString;
          console.log("The GET request attempt was successful.");
        })
        .catch(() => {
          document.getElementById('display-text').innerHTML = failedString;
          console.log("The GET request attempt failed.");
        })
        .finally(() => {
          console.log("The GET request attempt has finished.");
        });

    };
