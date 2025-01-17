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