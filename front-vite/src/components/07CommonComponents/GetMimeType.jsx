const getMimeType = (signature) => {
    // Convert to uppercase to ensure case-insensitive matching
    signature = signature.toUpperCase();

    // Normalize certain signatures for more consistent matching
    if (signature.startsWith('424D')) {
        signature = '424D';
    }

    switch (signature) {
        case 'FFD8FFDB':
        case 'FFD8FFE0':
        case 'FFD8FFE1':
        case 'FFD8FF': // Generic JPEG
            return 'image/jpeg';
        case '89504E47':
            return 'image/png';
        case '47494638':
            return 'image/gif';
        case '49492A00': // Corrected TIFF signature length
        case '4D4D002A': // Big-endian TIFF
            return 'image/tiff';
        case '424D':
            return 'image/bmp';
        case '00000100': // Corrected ICO signature
            return 'image/x-icon';
        case '25504446':
            return 'application/pdf';
        case '504B0304':
            return 'application/zip';
        default:
            return 'unknown';
    }
};

export default getMimeType;
