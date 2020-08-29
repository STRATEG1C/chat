class LocalStorageService {
    load(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    save(key, data) {
        const preparedData = JSON.stringify(data);
        localStorage.setItem(key, preparedData);
    }

    clear(key) {
        localStorage.removeItem(key);
    }
}

export default LocalStorageService;
