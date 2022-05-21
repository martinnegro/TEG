export default (obj: Object): boolean => {
    let empty = true;
    for ( const key in obj ) {
      empty = false;
      break;
    };
    return empty
};