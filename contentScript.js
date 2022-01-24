var deletionQueue = new Set()
var videoDuration = 60


let filterVideoByTitle = video => {
    // console.log(video)

    if(video.title.includes('#shorts')){
        console.log('Adding to queue by title:', video.title)
        deletionQueue.add(video)
        return null
    }
    return video
} 

let filterVideoByLength = (video,duration) => {
}

let parseForDeletion = commonParent => {
    if(commonParent !== 'ytd-item-section-renderer') return
    let titleElement = commonParent.querySelector('a#video-title');
    if(filterVideoByTitle(titleElement) === null) return
    let durationElement = commonParent.querySelector('ytd-thumbnail-overlay-time-status-renderer')
    filterVideoByLength(durationElement,videoDuration)

}



// Remove shorts that load on page load
let removeVideosOnLoad = () => {
    let commonParents = document.getElementsByTagName('ytd-item-section-renderer')
    console.log(commonParents.length)
    for( let i = 0; i < commonParents.length; i++){
        let titleElement = commonParents[i].querySelector('a#video-title')
        if(filterVideoByTitle(titleElement) === null) continue
        let durationElement = commonParents[i].querySelector('ytd-thumbnail-overlay-time-status-renderer')
        filterVideoByLength(durationElement,videoDuration)
    
    }
    deletionQueue.forEach(video => {
        let container = video.closest("ytd-item-section-renderer")
        container.parentElement.removeChild(container);
    })
    deletionQueue.clear()
    console.log('finish page load parsing')
}
removeVideosOnLoad()


let subBox = document.querySelector('#contents')



var videosSet = new Set()
var x = 0
// Remove shorts that load on scroll
var observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if( x == 0){
            console.log(mutation.addedNodes[0])
            x=1;
        }
        for (let i = 0; i < mutation.addedNodes.length; i++) {
            videosSet.add(mutation.addedNodes[i])
        }
        videosSet.forEach(video => {
            parseForDeletion(video)
        })
        deletionQueue.forEach(video => {
            let container = video.closest("ytd-item-section-renderer")
            container.parentElement.removeChild(container);
        })
        deletionQueue.clear()
        videosSet.clear()
    })
})
observer.observe(subBox, {childList: true})