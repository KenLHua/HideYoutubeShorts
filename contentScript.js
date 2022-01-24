var elements = document.querySelectorAll('a#video-title');
for(let i = 0; i <elements.length; i++){
    if(elements[i].title.includes('#shorts')){
        console.log(elements[i].title)
        let item = elements[i].closest("ytd-item-section-renderer")
        console.log(item)
        item.parentElement.removeChild(item);
        
    }
}
