export const dateGen = ():string => {
    const year = new Date().getFullYear()
    const month = new Date().getMonth();
    const date = new Date().getDate();
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const seconds = new Date().getSeconds();
    return `${date < 10 ? `0${date}` : date}/${month < 10 ? `0${month}` : month}/${year} ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}