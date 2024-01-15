document.addEventListener('DOMContentLoaded', (event) => {
    // Randomly choose a background class
    const randomBgClass = 'bg-' + Math.floor(Math.random() * 5 + 1);
    // Apply the class to the body element
    document.body.classList.add(randomBgClass);
});
