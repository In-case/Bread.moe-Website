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

    $("#downloadShareX").click(async() => {
        const result = await handleDomainKey();
        if (result === undefined) {
            return;
        }
        const sharexTemplate = {
            Name: "Bread.moe Uploader",
            DestinationType: "ImageUploader",
            RequestURL: "https://api-allowed.bread.moe/api/v1/upload",
            FileFormName: "file",
            Arguments: {
                domain: result[1],
            },
            Headers: {
                Authorization: `Bearer ${result[0]}`,
            },
            URL: "$json:url$",
        }
        const blob = new Blob([JSON.stringify(sharexTemplate, undefined, 4)], {type: "application/sxcu"});
        const anchor = document.createElement("a");
        anchor.download = "template.sxcu";
        anchor.href = URL.createObjectURL(blob);
        anchor.dataset.downloadurl = `document/sxcu:${anchor.download}:${anchor.href}`;
        anchor.click();
        if (!await $("#badThingsHappened").hasClass("is-hidden")) {
            await $("#badThingsHappened").addClass("is-hidden");
        }
    });
    // Creates the ShareX template.

    $("#downloadKShare").click(async() => {
        const result = await handleDomainKey();
        if (result === undefined) {
            return;
        }
        const kshareTemplate = {
            name: "bread.moe",
            desc: "Bread.moe Uploader",
            target: "https://api-allowed.bread.moe/api/v1/upload",
            format: "multipart-form-data",
            headers: {
                Authorization: `Bearer ${result[0]}`
            },
            body: [
                {
                    name: "domain",
                    body: result[1]
                },
                {
                    "_Content-Type": "/%contenttype/",
                    filename: "/image.%format/",
                    name: "file",
                    body: "/%imagedata/"
                }
            ],
            return: ".url"
        };
        const blob = new Blob([JSON.stringify(kshareTemplate, undefined, 4)], {type: "application/uploader"});
        const anchor = document.createElement("a");
        anchor.download = "template.uploader";
        anchor.href = URL.createObjectURL(blob);
        anchor.dataset.downloadurl = `document/uploader:${anchor.download}:${anchor.href}`;
        anchor.click();
        if (!await $("#badThingsHappened").hasClass("is-hidden")) {
            await $("#badThingsHappened").addClass("is-hidden");
        }
    });
    // Creates the KShare template.
});
// Handles the window loading.

async function showError(error) {
    await $("#badThingsHappened").text(error);
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
            if (!/^[a-z0-9-]{1,63}\.(bread\.moe|ate-a-ta\.co|blobs\.party|died-at-a\.party|died-while\.racing|hacked-my\.stream|hacked-my\.webcam|had-a\.party|is-a-ta\.co|pinged-b1nzy-for\.fun|stop-pings\.me|tits-are\.life|uses-ifunny\.co|wears-supre\.me|went-to-the-gucci\.store|worstme\.me|tried-to-do\.science|was-dropped-by-lin\.us)$/.test(domain)) {
                await showError("The domain given is invalid.")
            } else {
                return [key, domain];
            }
        }
    }
}
// Handles getting the domain and key.
