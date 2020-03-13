const lbContainer = document.body.querySelector('.fv-lightbox-container');
const slideContainer = document.body.querySelector('.fv-slide-image');
const btnShowSlide = document.body.querySelector('#btnShowSlide');

let slideElements = [];
let currentSlideIndex = 0;
const videoSources = [
    'youtube.com', 
    'vimeo.com'
]

lbContainer.onclick = function(event) {    
    if (event.target == lbContainer) {
       lbContainer.style.display = 'none'; 
    }
}

document.body.onload = function(){
   slideElements = detectAllMedia(); 
}

function isVideoSourceUrl(url) {
    let testExp = '';
    result = videoSources.some(function(videoSource){
        testExp = new RegExp(`^(https?:\/\/)?(www\.)?${videoSource}`);
        return testExp.test(url);
    });
  
    return result;
} 



btnShowSlide.onclick = function() {    
    slideContainer.innerHTML = slideElements[0];
    lbContainer.style.display = 'block';
}

function detectAllMedia() {    
    selector = 'img, video, iframe'
    //detect all supported elements
    const mediaElements = document.body.querySelectorAll(selector);

    //iterate thru list and add to array  
                
    mediaElements.forEach(element => {
        //strip their current classes

        element.className = "";
        switch (element.tagName) {
            case 'IMG': {
                slideElements.push(`<img src="${element.getAttribute('src')}" />`);
                break;  
            }  
            case 'VIDEO': {
                slideElements.push(`<video src="${element.getAttribute('src')}" controls></video>`);
            }    
            case 'IFRAME': {
                if(isVideoSourceUrl(element.getAttribute('src'))) {
                    slideElements.push(`<iframe width=800 height=400 src="${element.getAttribute('src')}" ></iframe>`);
                }
            }                     
            
        }
    });

    return slideElements;
        
}

function moveSlide(steps) {
    let newIndex = currentSlideIndex + steps;
    if (newIndex > slideElements.length - 1){
        newIndex = 0;
    } 
    if (newIndex < 0){
        newIndex = slideElements.length - 1
    }

    showSlide(newIndex);
}

function showSlide(slideIndex) {
    currentSlideIndex = slideIndex;
    slideContainer.innerHTML = slideElements[slideIndex];
}