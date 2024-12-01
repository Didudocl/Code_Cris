import axios from './root.service.js';

export async function sendScan(scanPayload) {
    try {
        const response = await axios.post('/scan', scanPayload);
        return response.data.data;
    } catch (error) {
        console.log("Error: ", error);
    }
}

export async function sendScanEnd(scanID, scanEndTime) {
    try {
        const response = await axios.patch(`/scan/?id=${scanID}`, {scanEndTime});
        return response.data.data;
    } catch (error) {
        console.log("Error: ", error);
    }
}