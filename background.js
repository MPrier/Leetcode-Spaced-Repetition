chrome.webRequest.onCompleted.addListener(
    function(details) {
        if (details.url.includes('/problems/') && details.url.includes('/submit')) {
            const urlParts = details.url.split('/');
            const problemIdIndex = urlParts.indexOf('problems') + 1;
            const problemId = urlParts[problemIdIndex];
            
            console.log(`Problem submitted: ${problemId}`);
            
            chrome.windows.create({
                url: chrome.runtime.getURL("difficulty.html"),
                type: "popup",
                width: 400,
                height: 600
            });
        }
    },
    { urls: ["*://leetcode.com/*"] }
);