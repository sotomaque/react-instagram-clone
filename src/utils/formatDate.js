import { format, isThisYear, formatDistanceStrict } from 'date-fns';

export function formatPostDate(date) {
    // if post was made this year -> MARCH 23
    const formatShort = format(new Date(date), "MMMM d").toUpperCase();
    // else -> MARCH 23, 2019
    const formatLong = format(new Date(date), "MMMM d yyyy").toUpperCase();

    return isThisYear(new Date(date)) ? formatShort : formatLong;
}

export function formatDateToNowShort(date) {
    // 5 days ago -> 5d
    // 7 weeks ago -> 7d
    return formatDistanceStrict(new Date(date), new Date(Date.now()))
        .split(' ')
        .map((s, i) => i === 1 ? s[0] : s)
        .join('')
}