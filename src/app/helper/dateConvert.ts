export const convertDate = (isoString: string) => {

    // Convert to a Date object
    const date: Date = new Date(isoString);

    // Format the date and time
    const formattedDate: string = date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });

    return formattedDate;
}

export const dateDiff = (isoString: string) => {

    // Convert to a Date object
    const date: any = new Date(isoString);

    const now : any = new Date();

    var hours = (date - now) / 36e5;

    if(Math.sign(hours) === 1) {
        return outputTimeLeft(hours)
    }
    else return 'Due'
}

const outputTimeLeft = (hours : number) => {
    const hoursFormatted = Math.floor(hours)
    if(hoursFormatted === 0) return `${Math.floor(hours * 60)} minutes`;
    if(hoursFormatted > 23) return `${Math.floor(hours / 24)} day${Math.floor(hours / 24) > 1 ? 's' : ''}`;
    else return hoursFormatted.toString() + ' hours'
}