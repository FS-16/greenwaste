document.addEventListener('DOMContentLoaded', function () {
    const arrowContainers = document.querySelectorAll('.arrow-container'); 

    arrowContainers.forEach((arrowContainer) => {
        const question = arrowContainer.parentElement;
        const answer = question.querySelector('.answer');

        arrowContainer.addEventListener('click', () => {
            if (answer.style.display === 'none' || answer.style.display === '') {
                answer.style.display = 'block';
                arrowContainer.querySelector('.arrow').style.transform = 'rotate(180deg)';
            } else {
                answer.style.display = 'none';
                arrowContainer.querySelector('.arrow').style.transform = 'rotate(0deg)';
            }
        });
    });
});
