// Load Problems To Do 
document.addEventListener('DOMContentLoaded', () => {
    const objectList = document.getElementById('To Do');
  
    // Retrieve all items from chrome.storage.local
    chrome.storage.local.get({completedProblemList: []}, function (result) {
        var completedProblemList = result.completedProblemList;
        
        completedProblemList.forEach((element, index) => {
            const li = document.createElement('li');
            const div = document.createElement('div');
            if (element.unformatedSubmitDate != undefined) {
                var today = new Date();
                var submitDate = new Date(element.unformatedSubmitDate)
                
                console.log("Todays Date: " + today)
                console.log("Submit Date: " + submitDate)
                var minutes = calculateDate(today, submitDate)
                if ( minutes > 120) {
                    li.appendChild(document.createTextNode(`${element.problemId}: minutes: ${minutes}`));
                    objectList.appendChild(li);
                }
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
                li.appendChild(document.createTextNode(`, Date: ${element.formatedSubmitDate}`));
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

  function calculateDate(today, submitDate) {
    let difference_in_time = today.getTime() - submitDate.getTime();
    console.log("Time difference: " + (difference_in_time / 1000) / 60)
    return (difference_in_time / 1000) / 60
  }