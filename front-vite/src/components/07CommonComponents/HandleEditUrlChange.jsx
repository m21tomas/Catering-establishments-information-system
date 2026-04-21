import getMimetype from './GetMimeType';
import apiEndpoint from "../06Services/endpoint";

const HandleEditUrlChange = async (event, editCanteenData, setEditCanteenData,
    checkImageUrlString, setImageLoading, setEditUrlLinkValid, setEditBlob) => {

    setEditCanteenData({
        ...editCanteenData,
        [event.target.name]: event.target.value,
    });

    let checkUrl = checkImageUrlString(event);
    if (checkUrl === true) {
        try {
            const response = await fetch(apiEndpoint+`/api/istaigos/getImageFromUrl?url=${event.target.value}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setImageLoading(response.status);
            if (!response.ok) {
                setEditUrlLinkValid(false);
                console.error("NOT OK: ", response.status)
            }
            else if (response.ok) {
                const data = await response.json();
                if (data.contentType.split('/').shift() === "image") {
                    const byteCharacters = atob(data.image);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const imageBlob = new Blob([byteArray], { type: data.contentType });
                    setEditBlob(imageBlob);
                    setEditUrlLinkValid(true);
                }
                else if (data.contentType === "binary/octet-stream") {
                    try {
                        const bytesArray = [];
                        const blob = data.image;
                        const buf = await blob.arrayBuffer(); // Await arrayBuffer to simplify
                
                        const bytes = new Uint8Array(buf);
                        bytes.forEach(byte => bytesArray.push(byte.toString(16)));
                        
                        const hex = bytesArray.join('').toUpperCase();
                        const binaryFileType = getMimetype(hex) || ''; // Ensure it's a string if undefined
                
                        if (binaryFileType.startsWith("image")) {
                            setEditBlob(new Blob([bytes], { type: binaryFileType })); // Set as a blob
                            setEditUrlLinkValid(true);
                        } else {
                            console.warn("Invalid binary file type:", binaryFileType);
                            setEditUrlLinkValid(false);
                        }
                    } catch (error) {
                        console.error("Error processing binary data:", error);
                        setEditUrlLinkValid(false);
                    }
                }
                
                else {
                    setEditUrlLinkValid(false);
                }
            }
        } catch (ex) {
            setEditUrlLinkValid(false);
            console.log("Error response: " + ex.status)
            console.error("URL fetch error: \n", ex)
            return null;
        }
    } else {
        setEditUrlLinkValid(false);
        console.error("Netinkamas URL. Validacija grąžino FALSE")
    }
}

export default HandleEditUrlChange