class LSControler {
    constructor() {
        
    }
    setItem(item, value) {
        if(typeof(Storage)) {
            return localStorage.setItem(item, value)
        }
        else {
            return false;
        }
    }

    getItem(item) {
        if(typeof(Storage)) {
            return localStorage.getItem(item)
        }
        else {
            return false;
        }
    }

    removeItem(item) {
        if (typeof (Storage)) {
            localStorage.removeItem(item)
        } else {
            return false;
        }
    }
}