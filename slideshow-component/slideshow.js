const lbContainer = document.body.querySelector('.fv-lightbox-container');
const btnShowSlide = document.body.querySelector('#btnShowSlide');

lbContainer.onclick = function(event) {    
    if (event.target == lbContainer) {
       lbContainer.style.display = 'none'; 
    }
}

btnShowSlide.onclick = function() {
    lbContainer.style.display = 'block';
}