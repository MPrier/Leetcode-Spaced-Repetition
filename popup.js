// Load Problems To Do 
document.addEventListener('DOMContentLoaded', () => {
    const objectList = document.getElementById('To Do');
  
    // Retrieve all items from chrome.storage.local
    chrome.storage.local.get({completedProblemList: []}, function (result) {
        var completedProblemList = result.completedProblemList;
        
        completedProblemList.forEach((element, index) => {
            const li = document.createElement('li');
            const div = document.createElement('div');
            var today = new Date();
            var rev = new Date(element.nextReviewDate)
            console.log("rev: " + rev)
            
            if (calculateDate(new Date(today.toDateString()), rev) <= 0) {
                var today = new Date();
                var rev = new Date(element.nextReviewDate)

                //rev.setDate(rev.getDate() + 14)
                //var submitDate = new Date(element.unformatedSubmitDate)
                
               // console.log("Todays Date: " + today)
                //console.log("Review Date: " + rev.toDateString())
                //var minutes = calculateDate(today, submitDate)
            
                li.appendChild(document.createTextNode(`${element.problemId}: Review Date: ${rev.toDateString()}`));
                objectList.appendChild(li);
                
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
            if (element.problemId) {
                const li = document.createElement('li');
                // Create a clickable link for the problem ID
                const a = document.createElement('a');
                a.href = `https://leetcode.com/problems/${element.problemId}`;
                a.textContent = `Problem ID: ${element.problemId}`;
                a.target = "_blank"; // Open link in a new tab
                var rev = new Date(element.nextReviewDate)

                li.appendChild(a);
                li.appendChild(document.createTextNode(`, Repitition: ${element.repetitions}`));
                li.appendChild(document.createTextNode(`, Next Review Date: ${rev.toDateString()}`));
                li.appendChild(document.createTextNode(`, Interval: ${element.interval}`));
                li.appendChild(document.createTextNode(`, Ease Factor: ${element.eFactor}`));
                objectList.appendChild(li);
            }
        });
    });
  });
  
  // Listen for clear history button click and send message to background script to clear problem history
  document.getElementById('clearHistory').addEventListener('click', () => {handleClearHisotry()});
  document.getElementById('test').addEventListener('click', () => {handleTest()});

  function handleTest() {
    chrome.runtime.sendMessage({ action: 'test'});
  }

  function handleClearHisotry() {
    chrome.runtime.sendMessage({ action: 'clear'});
    window.location.reload();
  }

  function calculateDate(today, submitDate) {
    let difference_in_time = submitDate.getTime() - today.getTime();
    let difference_in_days = (difference_in_time / (1000 * 3600 * 24));

    console.log("Total number of days between dates: " + today.toDateString() + " and " + submitDate.toDateString() +": " + difference_in_days + " days");
    return difference_in_days
  }