function getURLValue(key) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === key) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}
// Gets the value from the URL

$(document).ready(async () => {
    const keyFromURL = getURLValue("key");
    if (keyFromURL) { await $("#keyField").val(keyFromURL); }
    // Gets the key from the URL.
});
// Handles the window loading.
