var deletionQueue = new Set()
var videoDuration = 60
var retryQueue = new Set()

var singletonInterval = null


let filterVideoByTitle = video => {
    if (video.title.toLowerCase().includes('#shorts')) {
        console.log('Adding to queue by title:', video.title)
        deletionQueue.add(video)
        return null
    }
    return video
}

let filterVideoByDesc = video => {
    if(video.innerHTML.toLowerCase().includes('#shorts')){
        deletionQueue.add(video)
        return false
    }
    return true
}

let filterVideoByLength = (durationElement, duration) => {
    try {
        let timeElement = durationElement.getElementsByTagName('span')[0]
        let timeArray = timeElement.innerHTML.split(':')
        let timeInSeconds = 0
        for (let i = 0; i < timeArray.length; i++) {
            timeInSeconds = timeInSeconds + Math.pow(60, timeArray.length - i - 1) * parseInt(timeArray[i], 10)
        }
        if (timeInSeconds < duration) {
            deletionQueue.add(durationElement)
            return false
        }
        return true
    }
    catch (error) {
        return true
    }
}

var retryQueue = new Set()
let retryTimeFilter = () => {
    if (!singletonInterval) {
        console.log('setting timer')
        singletonInterval = setInterval(() => {
            console.log("Reapplying duration filter")
            retryQueue.forEach(commonParent => {
                let titleElement = commonParent.querySelector('a#video-title')
                let durationElement = commonParent.querySelector('ytd-thumbnail-overlay-time-status-renderer')
                if(durationElement)
                    retryQueue.delete(commonParent)
                    if(titleElement.title.toLowerCase().includes("make your ram 30%")){
                        console.log(commonParent)
                    }
                    if (!filterVideoByLength(durationElement, videoDuration)){
                        console.log('Adding based on duration', titleElement.title)
                    }
            })
            deletionQueue.forEach(video => {
                let container = video.closest("ytd-item-section-renderer")
                container.parentElement.removeChild(container);
            })
            deletionQueue.clear()
            console.log(retryQueue)
            if(retryQueue.size === 0 ){
                console.log('clearing interval')
                window.clearInterval(singletonInterval)
                singletonInterval = null
            }
        }, 3000)
    }
}

let parseForDeletion = commonParent => {
    if (commonParent.tagName.toLowerCase() !== 'ytd-item-section-renderer'){
        return;
    }
    let titleElement = commonParent.querySelector('a#video-title');
    if (filterVideoByTitle(titleElement) === null) return
    let descElement = commonParent.querySelector('yt-formatted-string#description-text')
    if(!filterVideoByDesc(descElement)){
        console.log('Adding based on desc', titleElement.title)
        return
    }
    let durationElement = commonParent.querySelector('ytd-thumbnail-overlay-time-status-renderer')
    if(durationElement){
        if(!filterVideoByLength(durationElement, videoDuration))
            console.log('Adding based on duration', titleElement.title)
    }
    else
        retryQueue.add(commonParent)
        
    }
    

// Remove shorts that load on page load
let removeVideosOnLoad = () => {
    let commonParents = document.getElementsByTagName('ytd-item-section-renderer')
    console.log(commonParents.length)
    for (let i = 0; i < commonParents.length; i++) {
        let titleElement = commonParents[i].querySelector('a#video-title')
        if (filterVideoByTitle(titleElement) === null) continue
        let descElement = commonParents[i].querySelector('yt-formatted-string#descripti on-text')
        if(!filterVideoByDesc(descElement)) return
        let durationElement = commonParents[i].getElementsByTagName('ytd-thumbnail-overlay-time-status-renderer')[0]
        if(durationElement){
            if(!filterVideoByLength(durationElement, videoDuration))
                console.log('Adding based on duration', titleElement.title)
        }
        else
            retryQueue.add(commonParents[i])
        

    }
    deletionQueue.forEach(video => {
        let container = video.closest("ytd-item-section-renderer")
        container.parentElement.removeChild(container);
    })
    deletionQueue.clear()
}
removeVideosOnLoad()
let subBox = document.querySelector('#contents')







var videosSet = new Set()
// Remove shorts that load on scroll
var observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        for (let i = 0; i < mutation.addedNodes.length; i++) {
            videosSet.add(mutation.addedNodes[i])
        }
    })
    videosSet.forEach(video => {
        parseForDeletion(video)
    })
    deletionQueue.forEach(video => {
        let container = video.closest("ytd-item-section-renderer")
        container.parentElement.removeChild(container);
    })
    deletionQueue.clear()
    videosSet.clear()
    retryTimeFilter()
})

if(!subBox)
    setTimeout(() => observer.observe(document.querySelector('#contents'), { childList: true }), 500)
else
    observer.observe(subBox, { childList: true })

    