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

async function showError(error) {
    await $("#badThingsHappened").val(error);
    if (await $("#badThingsHappened").hasClass("is-hidden")) {
        await $("#badThingsHappened").removeClass("is-hidden");
    }
}
// Pops up with a error.

async function handleDomainKey() {
    const key = await $("#keyField").val().replace(/ /g,'');
    const domain = await $("#domainField").val().toLowerCase().replace(/ /g,'');
    if (key === "") {
        await showError("No key was provided.");
    } else {
        if (domain === "") {
            await showError("No domain was provided.");
        } else {
            if (!/^[a-z0-9-]{1,63}\.(bread\.moe|ate-a-ta\.co|blobs\.party|died-at-a\.party|died-while\.racing|hacked-my\.stream|hacked-my\.webcam|had-a\.party|is-a-ta\.co|pinged-b1nzy-for\.fun|stop-pings\.me|tits-are\.life|uses-ifunny\.co|wears-supre\.me|went-to-the-gucci\.store|worstme\.me|tried-to-do\.science)$/.test(domain)) {
                await showError("The domain given is invalid.")
            } else {
                return key, domain;
            }
        }
    }
}
// Handles getting the domain and key.

async function downloadShareX() {
    const result = await handleDomainKey();
    if (result === undefined) {
        return;
    }
    const key, domain = result;
}
// Creates the ShareX template.
