import getMimetype from './GetMimeType';
import apiEndpoint from "../06Services/endpoint";

const HandleNewImageURLChange = async (event, duomenys, setDuomenys,
    validateField, setImageLoading, setUrlLinkValid, setBlobPromise) => {

    setDuomenys({
        ...duomenys,
        [event.target.name]: event.target.value,
    });

    let checkUrl = validateField(event);

    if (checkUrl === true && event.target.value.trim() !== "") {
        try {
            const response = await fetch(apiEndpoint+`/api/istaigos/getImageFromUrl?url=${event.target.value}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                setUrlLinkValid(false);
                console.error("NOT OK: ", response.status)
            } else if (response.ok) {
                // Read the response as JSON
                const data = await response.json();
                console.log("Response status: ", response.status);
                console.log("Received data: ", JSON.stringify(data));
    
                // Check if the contentType indicates an image
                if (data.contentType.split('/').shift() === "image") {
                    // Decode the base64 image string
                    const byteCharacters = atob(data.image); // Decode base64
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i); // Convert characters to byte values
                    }
                    const byteArray = new Uint8Array(byteNumbers); // Create a byte array
                    
                    // Create the Blob
                    const imageBlob = new Blob([byteArray], { type: data.contentType });
                    console.log("Image Blob Size:", imageBlob.size); // Log the size of the Blob
                    setBlobPromise(imageBlob);
                    setUrlLinkValid(true);
                } else if (data.contentType === "binary/octet-stream") {
                    let binaryFileType = undefined;
                    let hex = undefined; 
                    const bytesArray = [];
                    const blob = new Blob([new Uint8Array(data.image)], { type: data.contentType });

                    const blobArrayBuffer = await blob.arrayBuffer();
                    const bytes = new Uint8Array(blobArrayBuffer);
                    
                    console.log('BYTES: ', bytes);
                    bytes.forEach((byte) => {
                        bytesArray.push(byte.toString(16));
                    });
                    hex = bytesArray.join('').toUpperCase();
                    binaryFileType = getMimetype(hex);
                    console.log("binaryFileType: ", binaryFileType, " hex: ", hex);

                    if (binaryFileType.split('/').shift() === "image") {
                        setBlobPromise(blob);
                        setUrlLinkValid(true);
                    } else {
                        setUrlLinkValid(false);
                    }
                }
            }
        } catch (ex) {
            setUrlLinkValid(false);
            console.log("Error response: " + ex.status)
            console.error("URL fetch error: \n", ex)
            return null;
        }
        
    } else {
        setUrlLinkValid(false);
        console.error("Netinkamas URL. Validacija grąžino FALSE")
    }
}

export default HandleNewImageURLChange