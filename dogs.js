let currentImageIndex = 0;
let images;
let breedContainers = {};

function showImage(index) {
  const images = document.querySelectorAll('#image-carousel img');

  images.forEach((image, i) => {
    if (i === index) {
      image.style.display = 'block';
    } else {
      image.style.display = 'none';
    }
  });
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  showImage(currentImageIndex);
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  showImage(currentImageIndex);
}

if (annyang) {

  var commands = {
    'Load dog breed': function (breed) {
      showBreed(breed);
    },
    'hello': function () {
      alert('Hello, World');
    },
    'change the color to :color': function (color) {
      document.body.style.backgroundColor = color;
    },
    'navigate to :page': function (page) {
      window.location.href = page.toLowerCase() + '.html';
    }
  };
  annyang.addCommands(commands);

  document.getElementById('audioOn').addEventListener('click', function () {
    annyang.start();
  });

  document.getElementById('audioOff').addEventListener('click', function () {
    annyang.abort();
  });
}


let breed = [];
window.onload = function () {

  const imageContainer = document.getElementById('image-carousel');

  fetch('https://dog.ceo/api/breeds/image/random/10')
    .then(response => response.json())
    .then(data => {
      if (data && data.status === "success") {
        const imageUrls = data.message;

        // Set a fixed size for all images
        const imageSize = { width: 800, height: 600 };

        images = imageUrls.map(url => {
          const imgElement = document.createElement('img');
          imgElement.src = url;
          imgElement.alt = 'Dog Image';
          imgElement.width = imageSize.width;
          imgElement.height = imageSize.height;
          imageContainer.appendChild(imgElement);
          return imgElement;
        });

        showImage(currentImageIndex);
      } else {
        console.error("Error fetching dog images: Invalid response data.");
      }
    })
    .catch(error => console.error("Error fetching dog images: " + error));

  function getRandomBreeds(breeds, count) {
    const shuffledBreeds = breeds.sort(() => 0.5 - Math.random());
    return shuffledBreeds.slice(0, count);
  }


  function displayBreedContainer(name, description, minLife, maxLife) {
    console.log("Displaying Breed Container:", name, description, minLife, maxLife);

    const infoContainer = document.getElementById('breed-info');
    infoContainer.innerHTML = '';

    const nameElement = document.createElement('h2');
    nameElement.textContent = name;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;

    const lifeElement = document.createElement('p');
    lifeElement.textContent = `Life Expectancy: ${minLife} - ${maxLife} years`;

    infoContainer.appendChild(nameElement);
    infoContainer.appendChild(descriptionElement);
    infoContainer.appendChild(lifeElement);

    infoContainer.style.display = 'block';
  }

  fetch('https://dogapi.dog/api/v2/breeds')
    .then(response => response.json())
    .then(data => {
      console.log(data.data)
      showBreed(data.data)
      brand = data.data;
    })
    .catch(error => console.error('Error fetching dog breeds:', error));

  function showBreed(data) {
    let html = '';
    data.forEach((ele) => {
      html += `
        <a href="javascript:;" class="btns">${ele.attributes.name}</a>
      `
    })
    document.querySelector('#breed-buttons').innerHTML = html;
    document.querySelectorAll('#breed-buttons .btns').forEach((ele, i) => {
      ele.addEventListener('click', function () {
        let breed = brand[i];
        showBreedDetail(breed)
      })

    })
  }
  function showBreedDetail(breed) {
    console.log(breed)
    let html = '';
    html += `
      <p>Name:${breed.attributes.name}</p>
      <p>Description:${breed.attributes.description}</p>
      <p>Min life:${breed.attributes.life.min}</p>
      <p>Max life:${breed.attributes.life.max}</p>
    
    `
    document.querySelector('#breed-info').innerHTML = html;
    document.querySelector('#breed-info').style.display = 'block'
  }
};