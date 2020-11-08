const breeds_url = 'https://dog.ceo/api/breeds/list/all';
const select = document.querySelector('.breeds');
let searchBreedLink = 'https://dog.ceo/api/breed/hound/images';
let getRandom = null;
let randomArr = null;
let body = document.querySelector('body');
let img =  document.createElement('img');



function removeFirst() {
    document.querySelector('.first').style.display = 'none';
}
function retainImage() {
    document.querySelector('.first').style.display = 'block';
        document.querySelector('.first').style.margin = '0 auto';
}

fetch(breeds_url)
.then ((response) => {
  return response.json();
})
.then((data) => {
    const breedsObj = data.message;
    const breedsArr = Object.keys(breedsObj);

    for (let i = 0; i < breedsArr.length; i++) {
        const option = document.createElement('option');
        option.innerText = breedsArr[i];
        option.value = breedsArr[i]
        select.appendChild(option)
    }
    let firstOption = document.querySelector('option').value;
    return `https://dog.ceo/api/breed/${firstOption}/images`;
})
.then((data) => {
    fetch(data)
    .then(res => {
        return (res.json());
    })
    .then(log => {
        img.src = log.message[0];
        let logLngth = log.message.length;
        let randomImg = Math.floor(Math.random() * logLngth);
        img.src = log.message[randomImg];
        img.classList.add('first')
    }) 
    .then(() => {
    document.querySelector('.dog-child').appendChild(img);
    })
})

select.addEventListener('change', function(event) {
   fetch(`https://dog.ceo/api/breed/${event.target.value}/images/random`)
   .then(function(data) {
        document.querySelector('.start').classList.add('spin')
       return data.json();
   })
   .then((response) => {
        setTimeout(function () {
            document.querySelector('.start').classList.remove('spin')
            img.src = response.message;
        }, 800)
   })
})