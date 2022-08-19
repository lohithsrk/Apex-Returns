export const onlyNumberKey = (evt) => {
    // Only ASCII character in that range allowed
    var ASCIICode = evt.target.value.slice(-1).charCodeAt(0)
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
        return evt.preventDefault()
    }
    return true;
}