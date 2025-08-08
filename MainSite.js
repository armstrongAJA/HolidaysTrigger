function escapeHTML(str) {
  return str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
}
 
window.onload = function() {
  const params = new URLSearchParams(window.location.search);
  // extract parameters
  const baseUrl = encodeURIComponent(params.get("baseurl"));
  const itemid = escapeHTML(params.get("itemid"));
  const status = escapeHTML(params.get("status").toLowerCase());
  //buildURL
  const fullUrl = decodeURIComponent(baseUrl) + "&itemid=" + encodeURIComponent(itemid) + "&status=" + encodeURIComponent(status);
  const notFoundString = `<b>The holiday request was not found.</b><br>It may have been deleted.`
  const noLongerPendingString = `<b>The holiday request has already been {status}.</b><br>You may now close this window.`
  const successString = `<b>The holiday has been ${status}.</b><br>You may now close this window.`;
  const failedString = `<b>The holiday was not ${status} as the attempt failed.</b><br>Please try again by refreshing the page, or contact your system administrator if the problem persists.`;
  // do a GET on the url to trigger the flow and change the text displayed on the site.
  fetch(fullUrl, { method: "GET" })
    .then(response => {
      if (response.status === 200 && response.body.message === "Item not pending.") {
        const itemStatus = response.body.itemStatus;
        const safeItemStatus = escapeHTML(itemStatus.toLowerCase());
        document.getElementById('display-text').innerHTML = noLongerPendingString.replace("{status}", safeItemStatus);
        console.log("The GET request attempt was successful - but the item wasn't pending.");
      }
      else if (response.status === 200 && response.body.message === "Item updated successfully.") {
        document.getElementById('display-text').innerHTML = successString;
        console.log("The GET request attempt was successful.");
      }
      else {
        // Throw to trigger catch
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    })
    .catch(response => {
      if (response.status === 404) {
        document.getElementById('display-text').innerHTML = notFoundString;
        console.log("The GET request attempt failed - the item was not found.");
      }
      else {
        document.getElementById('display-text').innerHTML = failedString;
        console.log("The GET request attempt failed.");
      }
    })
    .finally(() => {
      console.log("The GET request attempt has finished. The body was:");
      console.log(response.body)
    });
};
