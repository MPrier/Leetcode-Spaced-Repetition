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
            }, (newWindow) => {
                console.log('Popup opened, window ID:', newWindow.id);
                chrome.storage.local.set({ popupWindowId: newWindow.id });
              });
        }
    },
    { urls: ["*://leetcode.com/*"] }
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action == 'storeResponse') {
        console.log(request.option);
        
        chrome.storage.local.get('popupWindowId', (data) => {
            if (data.popupWindowId) {
              chrome.windows.remove(data.popupWindowId);
              console.log('Popup closed, window ID:', data.popupWindowId);
            }
          });
    }
});