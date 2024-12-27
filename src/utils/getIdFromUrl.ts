const getIdFromUrl = (url: string) => url.split("/")[url.split("/").length - 1];

export default getIdFromUrl;
