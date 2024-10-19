export const is_ascii = (str: string) => {
    return /^[\x00-\x7F]*$/.test(str)
}