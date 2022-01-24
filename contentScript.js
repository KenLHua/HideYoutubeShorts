var deletionQueue = new Set()

let removeByTitle = element => {
    console.log('removingByTitle')
    var elements = element.querySelectorAll('a#video-title');
    for(let i = 0; i <elements.length; i++){
        if(elements[i].title.includes('#shorts')){
            console.log('Adding to queue:', elements[i].title)
            deletionQueue.add(elements[i])
            
        }
    }
}

let removeByLength = element => {
    var elements = document.querySelectorAll('ytd-thumbnail-overlay-time-status-renderer')
}

let removeShortsFromElement = (element) => {
    removeByTitle(element)
    deletionQueue.forEach(video => {
        let container = video.closest("ytd-item-section-renderer")
        container.parentElement.removeChild(container);
    })
    deletionQueue.clear()
}

// Remove shorts that load on page load
let subBox = document.querySelector('#contents')
removeShortsFromElement(subBox)



var videosSet = new Set()
// Remove shorts that load on scroll
var observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        for (let i = 0; i < mutation.addedNodes.length; i++) {
            videosSet.add(mutation.addedNodes[i])
        }
        videosSet.forEach(video => {
            removeShortsFromElement(video)
        })
        videosSet.clear()
    })
})
observer.observe(subBox, {childList: true})