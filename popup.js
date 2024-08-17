// Load Problems To Do 
document.addEventListener('DOMContentLoaded', () => {
    const objectList = document.getElementById('To Do');
  
    // Retrieve all items from chrome.storage.local
    chrome.storage.local.get({completedProblemList: []}, function (result) {
        var completedProblemList = result.completedProblemList;
        

        completedProblemList.forEach((element, index) => {
            console.log(element)
            // console.log(element.problemId);
            // if (element.problemId && element.difficulty) {
            //     const li = document.createElement('li');
            //     // Create a clickable link for the problem ID
            //     const a = document.createElement('a');
            //     a.href = `https://leetcode.com/problems/${element.problemId}`;
            //     a.textContent = `Problem ID: ${element.problemId}`;
            //     a.target = "_blank"; // Open link in a new tab

            //     li.appendChild(a);
            //     li.appendChild(document.createTextNode(`, Difficulty: ${element.difficulty}`));
            //     li.appendChild(document.createTextNode(`, Date: ${element.submitDate}`));
            //     objectList.appendChild(li);
            // }
            console.log(element.formatedSubmitDate)
            console.log(element.unformatedSubmitDate)
            if (element.unformatedSubmitDate != undefined) {
                var today = new Date();
                var old = new Date(element.unformatedSubmitDate)
                console.log(element.unformatedSubmitDate)
                console.log(today)
                console.log(JSON.stringify(old))
                console.log(old.getDate())
                console.log(old)
            }
            
        });
    });
  });

// Load History
document.addEventListener('DOMContentLoaded', () => {
    const objectList = document.getElementById('History');
  
    // Retrieve all items from chrome.storage.local
    chrome.storage.local.get({completedProblemList: []}, function (result) {
        var completedProblemList = result.completedProblemList;
        

        completedProblemList.forEach((element, index) => {
            console.log(element.problemId);
            if (element.problemId && element.difficulty) {
                const li = document.createElement('li');
                // Create a clickable link for the problem ID
                const a = document.createElement('a');
                a.href = `https://leetcode.com/problems/${element.problemId}`;
                a.textContent = `Problem ID: ${element.problemId}`;
                a.target = "_blank"; // Open link in a new tab

                li.appendChild(a);
                li.appendChild(document.createTextNode(`, Difficulty: ${element.difficulty}`));
                li.appendChild(document.createTextNode(`, Date: ${element.unformatedSubmitDate}`));
                objectList.appendChild(li);
            }
        });
    });
  });
  
  // Listen for clear history button click and send message to background script to clear problem history
  document.getElementById('clearHistory').addEventListener('click', () => {handleClearHisotry()});

  function handleClearHisotry() {
    chrome.runtime.sendMessage({ action: 'clear'});
    window.location.reload();
  }