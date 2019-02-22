import Mopass from 'mopass-common';

function polling() {
  Mopass.Fetch.fetchPasswordsPromise().then((data) => {
    console.log(data);
  });

  setTimeout(polling, 1000 * 30);
}

polling();

