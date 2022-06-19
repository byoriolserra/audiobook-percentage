import promptSync from 'prompt-sync'

const prompt = promptSync({ sigint: true })

/// USE CASES ////

const timeToDecimal = (time: string): number => {
    const array: string[] = time.split(':')
    let decimal: number = parseInt(array[1], 10)
    decimal = (decimal / 6) * 10

    return parseFloat(parseInt(array[0], 10) + '.' + (decimal<10?'0':'') + decimal)
}

const calculateReadHours = (totalHours: number, leftHours: number): number => {
  return totalHours - leftHours
}

const calculateReadPercentage = (totalHours: number, readHours: number): string => {
  const percentage =  (readHours * 100) / totalHours
  return percentage.toString()
}

const fixPercentage = (longDecimal: string, fixed: number): string => {
    const re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?')
    const fixedDecimal = longDecimal.match(re)
    if (!fixedDecimal) {
        return longDecimal
    }
    return fixedDecimal[0]
}

///

const calculatePercentage = (totalHours: string, leftHours: string): string => {
  const totalHoursDecimal: number = timeToDecimal(totalHours)
  const leftHoursDecimal: number = timeToDecimal(leftHours)
  const readHours: number = calculateReadHours(totalHoursDecimal, leftHoursDecimal)
  const readPercentage: string = calculateReadPercentage(totalHoursDecimal, readHours)
  const fixedReadPercentage: string = fixPercentage(readPercentage, 2)
  
  return fixedReadPercentage + '%'
  
}

const totalHours: string = prompt('What are the total hours of the book?')
const leftHours: string = prompt('What are the left hours of the book?')
console.log(`You have read ${calculatePercentage(totalHours, leftHours)} of the book 📖!`)