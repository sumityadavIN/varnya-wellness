function toggleAccordion(element) {
    const content = element.nextElementSibling;
    const span = element.querySelector('span');
    
    // Close other open items (optional)
    document.querySelectorAll('.accordion-content').forEach(item => {
        if (item !== content) {
            item.style.maxHeight = null;
            item.previousElementSibling.querySelector('span').innerText = '+';
        }
    });

    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        span.innerText = '+';
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        span.innerText = '-';
    }
}
