export const formatNumberWithDots = (number: number | string, prefix?: string, suffix?: string): string => {
    return `${prefix}${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}${suffix}`;
}