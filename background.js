const SITE_URL = 'https://www.youtube.com/feed/subscriptions'

var singleton = null

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == "complete") {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
            let url = tabs[0].url;
            console.log(url)
            if (url === SITE_URL) {
                console.log('promised')
                if(!singleton) {
                    singleton = setTimeout(() => {
                    return new Promise(resolve => {
                        chrome.scripting.executeScript({
                            target: { tabId: tabId },
                            files: ['contentScript.js'],
                        }, resolve);
                    })
                }, 2000)}
            }
        });
    }
})
