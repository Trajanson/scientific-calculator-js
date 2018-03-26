class Store {
    constructor() {
        this.storedInput = "0";
        this.previouslyStoredInput = "0";
    }

    reset() {
        this.storedInput = "0";
        this.previouslyStoredInput = "0";
    }

    setStoredInput(
        newNumber,
    ) {
        this.storedInput = newNumber;
    }

    getStoredInput() {
        return this.storedInput;
    }

    setPreviouslyStoredInput(
        newNumber,
    ) {
        this.previouslyStoredInput = newNumber;
    }

    getPreviouslyStoredInput() {
        return this.previouslyStoredInput;
    }
}

export const store = new Store();