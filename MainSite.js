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
      const noLongerPendingString = `<b>The holiday request has already recieved a response and is no longer pending, so your changes have not been added.</b><br>You may now close this window.`
      // do a GET on the url to trigger the flow and change the text displayed on the site.
    fetch(fullUrl, { method: "GET" })
      .then(response => {
        if (response.ok) {
          document.getElementById('display-text').innerHTML = successString;
          console.log("The GET request attempt was successful.");
        } 
        else if (response.body.message = "Holiday No Longer Pending") {
          document.getElementById('display-text').innerHTML = noLongerPendingString;
          console.log("The GET request attempt was successful.");
        }
        else {
          // Throw to trigger catch
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      })
      .catch(() => {
        document.getElementById('display-text').innerHTML = failedString;
        console.log("The GET request attempt failed.");
      })
      .finally(() => {
        console.log("The GET request attempt has finished.");
      });


    };
