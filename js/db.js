var dbPromised = idb.open('liga-inggris', 1, function (upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore('teams', {
    keyPath: 'id',
  });
  articlesObjectStore.createIndex('name', 'name', {
    unique: false,
  });
});

function saveForLater(team) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction('teams', 'readwrite');
      var store = tx.objectStore('teams');
      console.log(team);
      store.put(team);
      return tx.complete;
    })
    .then(function () {
      console.log('Team berhasil di simpan.');
    });
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction('teams', 'readonly');
        var store = tx.objectStore('teams');
        return store.getAll();
      })
      .then(function (teams) {
        resolve(teams);
      });
  });
}

function getById(id) {
  console.log(id);
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction('teams', 'readonly');
        var store = tx.objectStore('teams');
        return store.get(id);
      })
      .then(function (article) {
        console.log(article);
        if (article !== undefined) {
          resolve(true);
        } else {
          reject();
        }
      });
  });
}

function deleteFavTeam(team) {
  dbPromised
    .then(function (db) {
      let tx = db.transaction('teams', 'readwrite');
      let store = tx.objectStore('teams');
      // console.log(team);
      store.delete(team);
      return tx.complete;
    })
    .then(function () {
      console.log('berhasil dihapus');
    });
}
