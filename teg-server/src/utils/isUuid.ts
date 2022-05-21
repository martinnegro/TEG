export default (maybeUuid: any): boolean => {
    if ( typeof maybeUuid !== 'string' ) return false;
    if ( maybeUuid.length < 0 ) return false;
    
    const uuidRegex = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/
    if (maybeUuid.match(uuidRegex)) return true
    return false
};