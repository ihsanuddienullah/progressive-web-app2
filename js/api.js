const base_url = 'https://api.football-data.org/v2/';
const api_token = 'b3dad9833b3a4b78af52563c2d2b6895';

const fetchDataApi = (url) => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': api_token,
    },
  });
};

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log('Error : ' + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log('Error : ' + error);
}

// Blok kode untuk melakukan request data json
function getArticles() {
  if ('caches' in window) {
    caches
      .match(base_url + 'competitions/2021/standings?standingType=TOTAL')
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            var articlesHTML = '';
            data.standings[0].table.forEach(function (team) {
              let urlTeamImage = team.team.crestUrl;
              if (urlTeamImage == null || urlTeamImage == '') {
                urlTeamImage = 'https://via.placeholder.com/350';
              } else {
                urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
              }
              articlesHTML += `
              <tr>
                <td>${team.position}</td>
                <td>
                  <ul style="margin:0">
                  <a href="./article.html?id=${team.team.id}">
                    <li class="collection-item avatar" style="display:flex;align-items:center">
                      <img src="${urlTeamImage}" width="15px" alt="" class="circle"> &emsp;
                      <span class="title">${team.team.name}</span>
                    </li>
                  </a>
                  </ul>
                </td>
                <td>${team.playedGames}</td>
                <td>${team.won}</td>
                <td>${team.draw}</td>
                <td>${team.lost}</td>
                <td>${team.goalDifference}</td>
                <td>${team.goalsFor}</td>
                <td>${team.goalsAgainst}</td>
                <td>${team.points}</td>
              </tr>
            `;
            });
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById('articles').innerHTML = articlesHTML;
          });
        }
      });
  }

  fetchDataApi(base_url + 'competitions/2021/standings?standingType=TOTAL')
    .then(status)
    .then(json)
    .then(function (data) {
      var articlesHTML = '';
      data.standings[0].table.forEach(function (team) {
        let urlTeamImage = team.team.crestUrl;
        if (urlTeamImage == null || urlTeamImage == '') {
          urlTeamImage = 'https://via.placeholder.com/350';
        } else {
          urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
        }
        articlesHTML += `
        <tr>
          <td>${team.position}</td>
          <td>
            <ul style="margin:0">
            <a href="./article.html?id=${team.team.id}">
              <li class="collection-item avatar" style="display:flex;align-items:center">
                <img src="${urlTeamImage}" width="15px" alt="" class="circle"> &emsp;
                <span class="title">${team.team.name}</span>
              </li>
            </a>
            </ul>
          </td>
          <td>${team.playedGames}</td>
          <td>${team.won}</td>
          <td>${team.draw}</td>
          <td>${team.lost}</td>
          <td>${team.goalDifference}</td>
          <td>${team.goalsFor}</td>
          <td>${team.goalsAgainst}</td>
          <td>${team.points}</td>
        </tr>
        `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById('articles').innerHTML = articlesHTML;
    })
    .catch(error);
}

function getArticleById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get('id');

    if ('caches' in window) {
      caches.match(base_url + 'teams/' + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            let urlTeamImage = data.crestUrl;
            if (urlTeamImage == null || urlTeamImage == '') {
              urlTeamImage = 'https://via.placeholder.com/350';
            } else {
              urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
            }
            var articleHTML = `
            <div class="row" style="margin:30px;display:flex;justify-content:center;align-items:center;flex-wrap:wrap">
              <div class="col s12 m6">
                <div style="justify-content: center;
                align-items: center;
                display: flex;">
                  <img src="${urlTeamImage}" class="image-responsive" alt="">
                </div>
              </div>
              <div class="col s12 m6">
                <ul class="collection with-header">
                  <li class="collection-header"><h4>${data.name}</h4></li>
                  <li class="collection-item">
                    <div style="display:flex; align-items:center">
                    <i class="material-icons">texture</i>
                    <span style="padding-left:8px">${data.venue}</span>
                    </div>
                  </li>
                  <li class="collection-item">
                    <div style="display:flex; align-items:center">
                    <i class="material-icons">group</i>
                    <span style="padding-left:8px">${data.clubColors}</span>
                    </div>
                  </li>
                  <li class="collection-item">
                    <div style="display:flex; align-items:center">
                    <i class="material-icons">location_on</i>
                    <span style="padding-left:8px">${data.address}</span>
                    </div>
                  </li>
                  <li class="collection-item">
                    <div style="display:flex; align-items:center">
                    <i class="material-icons">local_phone</i>
                    <span style="padding-left:8px">${data.phone}</span>
                    </div>
                  </li>
                  <li class="collection-item">
                    <div style="display:flex; align-items:center">
                    <i class="material-icons">email</i>
                    <span style="padding-left:8px">${data.email}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById('body-content').innerHTML = articleHTML;

            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetchDataApi(base_url + 'teams/' + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        let urlTeamImage = data.crestUrl;
        if (urlTeamImage == null || urlTeamImage == '') {
          urlTeamImage = 'https://via.placeholder.com/350';
        } else {
          urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
        }
        var articleHTML = `
          <div class="row" style="margin:30px;display:flex;justify-content:center;align-items:center;flex-wrap:wrap">
            <div class="col s12 m6">
              <div style="justify-content: center;
              align-items: center;
              display: flex;">
                <img src="${urlTeamImage}" class="image-responsive" alt="">
              </div>
            </div>
            <div class="col s12 m6">
              <ul class="collection with-header">
                <li class="collection-header"><h4>${data.name}</h4></li>
                <li class="collection-item">
                  <div style="display:flex; align-items:center">
                  <i class="material-icons">texture</i>
                  <span style="padding-left:8px">${data.venue}</span>
                  </div>
                </li>
                <li class="collection-item">
                  <div style="display:flex; align-items:center">
                  <i class="material-icons">group</i>
                  <span style="padding-left:8px">${data.clubColors}</span>
                  </div>
                </li>
                <li class="collection-item">
                  <div style="display:flex; align-items:center">
                  <i class="material-icons">location_on</i>
                  <span style="padding-left:8px">${data.address}</span>
                  </div>
                </li>
                <li class="collection-item">
                  <div style="display:flex; align-items:center">
                  <i class="material-icons">local_phone</i>
                  <span style="padding-left:8px">${data.phone}</span>
                  </div>
                </li>
                <li class="collection-item">
                  <div style="display:flex; align-items:center">
                  <i class="material-icons">email</i>
                  <span style="padding-left:8px">${data.email}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById('body-content').innerHTML = articleHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getSavedArticles() {
  getAll().then(function (data) {
    // Menyusun komponen card artikel secara dinamis
    var dataHTML = '';
    data.forEach(function (team) {
      let urlTeamImage = team.crestUrl;
      if (urlTeamImage == null || urlTeamImage == '') {
        urlTeamImage = 'https://via.placeholder.com/350';
      } else {
        urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
      }
      dataHTML += `
        <div class="card col s12 m4 l3" style="width:200px; margin:10px;">
          <a href="./article.html?id=${team.id}">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="responsive-img" src="${urlTeamImage}" style="height:200px;"/>
            </div>
          </a>
          <div class="card-content" style="display:flex;justify-content:center;align-items:center">
            <span class="card-title truncate">${team.name}</span>
          </div>
        </div>
      `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById('saved').innerHTML = dataHTML;
  });
}