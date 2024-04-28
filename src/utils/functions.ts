
export const getDateString = (dateStr: Date) => {
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
    });
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
    });
    const date = new Date(dateStr);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
    }).format(date);
    if (today === formattedDate) return 'Today';
    if (tomorrow === formattedDate) return 'Tomorrow';
    return `${formattedDate.slice(0, 3)} ${formattedDate.slice(7)}`;
}
