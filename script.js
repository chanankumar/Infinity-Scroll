const count = 10;
const apiKey = 'gqumXkpQwrbDtNg4zHHprWdaYKBy1bjnfZ3F-lgK3JE';
const url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const imageContainer = document.getElementById('image-container')
let photosArray = [];
let imagesLoaded = 0;
let totalImages = 0 ;
let ready = false;

function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        console.log(imagesLoaded)
        ready = true;
        loader.hidden = true;
    }
} 

function setAttribute(element, attribute){
    for(const key in attribute){
        element.setAttribute(key, attribute[key])
    }
}

function displayPhotos(){
    totalImages = photosArray.length;
    imagesLoaded = 0;
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttribute(item,{
            href : photo.links.html,
            target : '_blank'
        });
        const img = document.createElement('img');
        setAttribute(img,{
            src : photo.urls.regular,
            alt : photo.alt_description,
            title : photo.alt_description,
            height : 600,
            width : 500
        });
        img.addEventListener('load',imageLoaded)
        item.appendChild(img);
        imageContainer.appendChild(item)
    })
}

async function getPhotos(){
    const response = await fetch(url);
    const data = await response.json();
    photosArray = data;
    displayPhotos();
}

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight- 100 && ready){
        getPhotos();
    }
});
getPhotos();