document.addEventListener('DOMContentLoaded', () => {
    /**
     * The goal here is to display an overlay, which stays visible until all images in the html page are loaded
     * For that, I first create Promises for each individual image element, which resolves once the image is loaded
     * Then, I will create another Promise which resolves once all Promises before resolve.
     */

    // With querySelectorAll, I can retreive multiple html elements using the css selector sytnax
    const images = [...document.querySelectorAll('img')];

    // For each image inside our page, we create a promise
    const imagePromises = images.map(image => imageLoaded(image));
    
    // Promise.all: Wait for all promises inside the imagePromises array to complete
    const allImagesLoaded = Promise.all(imagePromises);
    
    const loader = document.getElementById('loading-overlay');
    
    // Displaying the loading overlay before the images are finished loading
    loader.style.display = 'flex';

    allImagesLoaded.then(() => {
        console.log('images loaded');
        loader.style.display = 'none';
    });

    /**
     * Returns a promise, which resolves once the image is loaded loaded
     * @param {HTMLImageElement} imageElement
     */
    function imageLoaded(imageElement) {
        return new Promise((resolve, reject) => {
            if (imageElement.complete) {
                // If my script is so slow, that the image is loaded before I create my promise, I resolve the promise right away
                resolve();
            } else {
                // Otherwise, I resolve it once the image 'load' event fires
                imageElement.addEventListener('load', () => {
                    resolve();
                });
                // If any error happens during image loading (e.g. the image source couldn't be found), I reject the promise.
                imageElement.addEventListener('error', (error) => {
                    reject(error);
                })
            }
        });
    }
});