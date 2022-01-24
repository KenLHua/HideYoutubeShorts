
let removeShortsFromElement = (element) => {
    var elements = document.querySelectorAll('a#video-title');
    for(let i = 0; i <elements.length; i++){
        if(elements[i].title.includes('#shorts')){
            console.log(elements[i].title)
            let item = elements[i].closest("ytd-item-section-renderer")
            item.parentElement.removeChild(item);
            
        }
    }
}

let subBox = document.querySelector('#contents')
var insertedNodes = []
var observer = new MutationObserver(function(mutations){
    mutations.forEach(function(mutation){
        for ( let i = 0; i < mutation.addedNodes.length; i++){
            removeShortsFromElement(mutation.addedNodes[i])
        }
    })
})
observer.observe(subBox, {childList: true})


