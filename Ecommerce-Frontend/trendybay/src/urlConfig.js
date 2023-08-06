export const api = 'http://localhost:2000/api'; // api end points url

// function to provide url for product images:
export const  generatePublicURL = (fileName) => {
    return `http://localhost:2000/public/${fileName}`
}