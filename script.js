window.location.href = "https://itsabook.de";

document.addEventListener('mousemove', setBackground);

const svgFiles = ['f01.svg', 'f02.svg', 'f03.svg'];
const basePath = 'assets/svg/';

document.addEventListener('DOMContentLoaded', (e) => {
    setBackground(e)
    displayRandomSVG()
    setInfoSVGs()
});

window.addEventListener('resize', (e) => {
    setBackground(e)
    displayRandomSVG()
    setInfoSVGs()
});


function displayRandomSVG() {
    const randomSVG = svgFiles[Math.floor(Math.random() * svgFiles.length)];
    const svgPath = basePath + randomSVG;
    const container = document.getElementById('svg-container');
    const imgElement = document.createElement('img');
    imgElement.src = svgPath;

    imgElement.onload = () => {
        const maxWidth = window.innerWidth - imgElement.width;
        const maxHeight = window.innerHeight - imgElement.height - 180;

        const randomX = Math.floor(Math.random() * maxWidth);
        const randomY = Math.floor(Math.random() * maxHeight) + 180;

        container.style.left = `${randomX}px`;
        container.style.top = `${randomY}px`;
    };

    container.innerHTML = '';
    container.appendChild(imgElement);

    setTimeout(() => {
        imgElement.classList.add("visible")
    }, 100)
}

function setBackground(e) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const mouseX = e.clientX || window.innerWidth / 2;
    const mouseY = e.clientY || window.innerHeight / 2;

    const xPercent = mouseX / width * 40 + 60;
    const yPercent = mouseY / height * 40;

    // Adjust the gradient direction and color stops based on mouse position
    document.querySelector('.gradient-background').style.background = `linear-gradient(#d9abd2 0%, #ecb4b4 ${yPercent}%, #e67401 ${xPercent}%, #282728 100%)`;
}

function setInfoSVGs() {
    const infoSVGFiles = [
        { name: 'info01.svg', width: 33, height: 180 },
        { name: 'info02.svg', width: 213, height: 219 },
        { name: 'info03.svg', width: 288, height: 320 },
        { name: 'info04.svg', width: 135, height: 272 },
        { name: 'info05.svg', width: 177, height: 280 },
    ];

    const basePath = 'assets/svg/';
    const maxAttempts = 100; // Maximum attempts to find a non-colliding position
    let positions = []; // Reset this array on each call
    const container = document.getElementById('svg-container-infos');

    // Clear container before adding new SVGs
    container.innerHTML = '';
    positions = []; // Clear positions for new run

    function doesCollide(testRect) {
        return positions.some(pos => {
            return !(
                testRect.right < pos.left ||
                testRect.left > pos.right ||
                testRect.bottom < pos.top ||
                testRect.top > pos.bottom
            );
        });
    }

    function placeSVG(svgFile) {
        const name = svgFile.name;
        const width = isMobile() ? svgFile.width * 1 : svgFile.width * 1.2
        const height = isMobile() ? svgFile.height * 1 : svgFile.height * 1.2

        const svgPath = basePath + name;

        let placed = false;
        let attempts = 0;

        while (!placed && attempts < maxAttempts) {
            const x = Math.floor(Math.random() * ((window.innerWidth - 100) - width)) + 50;
            const y = Math.floor(Math.random() * ((window.innerHeight - 200) - height)) + 100;
            const delay = Math.random() * 2000;

            const testRect = { left: x, top: y, right: x + width, bottom: y + height };

            if (!doesCollide(testRect)) {
                const imgElement = document.createElement('img');
                imgElement.src = svgPath;
                imgElement.style.position = 'absolute';
                imgElement.style.left = `${x}px`;
                imgElement.style.top = `${y}px`;
                imgElement.style.width = `${width}px`;
                imgElement.style.height = `${height}px`;
                container.appendChild(imgElement);

                setTimeout(() => {
                    imgElement.classList.add('visible');
                }, delay);

                positions.push(testRect);
                placed = true;
            }

            attempts++;
            console.log(attempts)
        }
    }

    // Place each SVG randomly
    infoSVGFiles.forEach(svgFile => {
        placeSVG(svgFile);
    });
}


function isMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
}