function normalizeString(number: number) {
    return number < 10 ? '0' + number : number
}

function debug(message: string) {
    const currentDate = new Date()
    const hours = normalizeString(currentDate.getHours())
    const minutes = normalizeString(currentDate.getMinutes())

    console.log( `${hours}:${minutes} @_> ${message}`)
}

export default debug