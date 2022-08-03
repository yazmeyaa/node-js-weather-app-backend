function addPrefix(message: string) {
    const currentDate = new Date()
    const day = currentDate.getDay()
    const month = currentDate.getMonth()
    const year = currentDate.getFullYear()
    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()

    return `${day}.${month}.${year} ${hours}:${minutes} => ${message}`
}

export default addPrefix