const shuffle = (numbersArray: Array<any>) => {
    let qty = numbersArray.length;
    let randomPos

    for (let i = qty - 1; i >= 1; i--) {
        randomPos = Math.floor(Math.random() * qty--);
        let tmp = numbersArray[randomPos];
        numbersArray[randomPos] = numbersArray[i];
        numbersArray[i] = tmp;
    }
};

export default shuffle;