const repositories = document.querySelector('.content-main');
const carouselIndicators = document.querySelector('.carousel-indicators');
const carouselInner = document.querySelector('.carousel-inner');
const colleaguesContainer = document.querySelector('#secao4 .row');

// Função para buscar dados do perfil do JSON Server
function getProfile() {
    fetch('http://localhost:3000/perfil')
    .then(async res => {
        if (!res.ok) {
            throw new Error(res.status);
        }

        let data = await res.json();
        document.getElementById('perfil-img').src = data.imagem;
        document.getElementById('perfil-nome').textContent = data.nome;
        document.getElementById('perfil-descricao').textContent = data.descricao;
    })
    .catch(error => console.error('Erro ao buscar perfil:', error));
}

// Função para buscar repositórios do GitHub
function getApiGitHub() {
    fetch('https://api.github.com/users/lucaszanfa/repos')
    .then(async res => {
        if (!res.ok) {
            throw new Error(res.status);
        }

        let data = await res.json();
        data.map(item => {
            let project = document.createElement('div');
            project.classList.add('col-md-4');
            project.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <a href="${item.html_url}" class="btn btn-primary">Ver no GitHub</a>
                </div>
            </div>`;
            repositories.appendChild(project);
        });
    })
    .catch(error => console.error('Erro ao buscar repositórios:', error));
}

// Função para buscar conteúdos do JSON Server
function getContents() {
    fetch('http://localhost:3000/albuns')
    .then(async res => {
        if (!res.ok) {
            throw new Error(res.status);
        }

        let data = await res.json();
        data.forEach((content, index) => {
            let indicator = document.createElement('li');
            indicator.setAttribute('data-target', '#carouselExampleIndicators');
            indicator.setAttribute('data-slide-to', index);
            if (index === 0) indicator.classList.add('active');
            carouselIndicators.appendChild(indicator);

            let carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (index === 0) carouselItem.classList.add('active');
            carouselItem.innerHTML = `
            <img src="${content.image}" class="d-block w-100" alt="${content.title}">
            <div class="carousel-caption d-none d-md-block">
                <h5>${content.title}</h5>
            </div>`;
            carouselInner.appendChild(carouselItem);
        });
    })
    .catch(error => console.error('Erro ao buscar conteúdos:', error));
}

// Função para buscar colegas do JSON Server
function getColleagues() {
    fetch('http://localhost:3000/colegas')
    .then(async res => {
        if (!res.ok) {
            throw new Error(res.status);
        }

        let data = await res.json();
        data.map(colleague => {
            let colleagueCard = document.createElement('div');
            colleagueCard.classList.add('col-md-4');
            colleagueCard.innerHTML = `
            <div class="card">
                <img src="${colleague.image}" class="card-img-top" alt="${colleague.name}">
                <div class="card-body">
                    <h5 class="card-title">${colleague.name}</h5>
                    <a href="${colleague.github}" class="btn btn-primary">Perfil no GitHub</a>
                </div>
            </div>`;
            colleaguesContainer.appendChild(colleagueCard);
        });
    })
    .catch(error => console.error('Erro ao buscar colegas:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    getProfile();
    getApiGitHub();
    getContents();
    getColleagues();
});
