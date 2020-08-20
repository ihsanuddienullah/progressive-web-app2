let dbPromised = idb.open('liga-inggris', 1, function (upgradeDb) {
  let clubsObjectStore = upgradeDb.createObjectStore('teams', {
    keyPath: 'id',
  });
  clubsObjectStore.createIndex('name', 'name', {
    unique: false,
  });
});

function saveForLater(team) {
  dbPromised
    .then(function (db) {
      let tx = db.transaction('teams', 'readwrite');
      let store = tx.objectStore('teams');
      console.log(team);
      store.put(team);
      return tx.complete;
    })
    .then(function () {
      console.log('Team saved successfully.');
    });
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction('teams', 'readonly');
        let store = tx.objectStore('teams');
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
        let tx = db.transaction('teams', 'readonly');
        let store = tx.objectStore('teams');
        return store.get(id);
      })
      .then(function (club) {
        console.log(club);
        if (club !== undefined) {
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
      console.log('removed successfully');
    });
}
