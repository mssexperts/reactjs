class Storage {
  static get(key) {
    const storage = JSON.parse(localStorage.getItem(key));

    return storage || '';
  }

  static delete(key) {
    localStorage.removeItem(key);

    return true;
  }

  static save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));

    return true;
  }
}

export default Storage;
