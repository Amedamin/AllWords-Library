const carouselInner = document.querySelector('#carouselExampleControls1 .carousel-inner');
const items = document.querySelectorAll('#carouselExampleControls1 .carousel-item');
const itemCount = items.length;
let position = 0;

document.querySelector('.carousel-control-next').addEventListener('click', () => {
    if (position < itemCount - 1) { // تغيير الشرط ليتوافق مع عدد العناصر
        position++;
        carouselInner.style.transform = 'translateX(-${position * 100}%)'; // استخدام 100% لتحريك العنصر بالكامل
    }
});

document.querySelector('.carousel-control-prev').addEventListener('click', () => {
    if (position > 0) {
        position--;
        carouselInner.style.transform = 'translateX(-${position * 100}%)';
    }
});