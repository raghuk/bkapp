
export function getTime(date2, date1) {
    var diff =(date2.getTime() - date1.getTime()) / 1000;
    diff /= (60*60*24);
    return Math.abs(Math.round(diff));
}
