export const ratings = (rating) => {
    if(rating >= 4.5) {
        return 'bg-green-800';
    } else if(rating >= 4.0) {
        return 'bg-green-600';
    } else if(rating >= 3.0) {
        return 'bg-yellow-600';
    } else if(rating >= 2.0) {
        return 'bg-yellow-400';
    } else {
        return 'bg-gray-400';
    }
}