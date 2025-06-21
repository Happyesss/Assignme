
document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById('video');
    const flipButton = document.getElementById('flipButton');
    const captureButton = document.getElementById('captureButton');
    const retakeButton = document.getElementById('retakeButton');
    const preview = document.getElementById('preview');
    const uploadButton = document.getElementById('uploadButton');
    const fileInput = document.getElementById('fileInput');
    const selectFileButton = document.getElementById('selectFileButton');
    let currentStream = null;
    let useFrontCamera = true;
    let images = []; // In-memory array to store captured images

    function getCameraStream() {
        if (currentStream) {
            currentStream.getTracks().forEach(track => track.stop());
        }

        const constraints = {
            video: {
                facingMode: useFrontCamera ? 'user' : 'environment',
            }
        };

        navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
                currentStream = stream;
                video.srcObject = stream;
                video.addEventListener('loadedmetadata', () => {
                    // Optionally set up canvas size based on video dimensions
                });
            })
            .catch(error => {
                console.error('Error accessing the camera:', error);
                alert('Error accessing the camera.');
            });
    }

    getCameraStream();

    flipButton.addEventListener('click', () => {
        useFrontCamera = !useFrontCamera;
        getCameraStream();
    });

    captureButton.addEventListener('click', () => {
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;

        const scale = 7.5; // Increase the scale for a more zoomed-in capture
        const captureWidth = videoWidth / scale;
        const captureHeight = videoHeight / scale;

        // Calculate the offset to center the capture
        const xOffset = (videoWidth - captureWidth) / 2;
        const yOffset = (videoHeight - captureHeight) / 2;

        const canvas = document.createElement('canvas');
        canvas.width = captureWidth;
        canvas.height = captureHeight;
        const context = canvas.getContext('2d');

        context.drawImage(video, xOffset, yOffset, captureWidth, captureHeight, 0, 0, canvas.width, canvas.height);

        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/png');
        preview.appendChild(img);

        images.push(canvas.toDataURL('image/png')); // Store in in-memory array
    });

    retakeButton.addEventListener('click', () => {
        if (preview.lastChild) {
            preview.removeChild(preview.lastChild);
            images.pop();
        }
    });

    uploadButton.addEventListener('click', async () => {
        if (images.length === 0) {
            alert('Please capture some images.');
            return;
        }

        const formData = new FormData();
        images.forEach((dataUrl, index) => {
            const blob = dataURItoBlob(dataUrl);
            formData.append('files', blob, `${index + 1}.png`);
        });

        formData.append('spacing', 500); // Example spacing value

        try {
            const response = await fetch('https://ff-test-cr3w.onrender.com/generate-font', {
                method: 'POST',
                body: formData
            });

            const data = await response.arrayBuffer();

            if (response.ok) {
                const blob = new Blob([data], { type: 'font/ttf' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'generated_font.ttf';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                alert('Font generation successful!');
            } else {
                console.log("Error:", await response.text());
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Font generation failed.');
        }

        while (preview.firstChild) {
            preview.removeChild(preview.firstChild);
        }        images = []; // Clear the in-memory array
    });

    // Add null checks to prevent errors if elements don't exist
    if (selectFileButton) {
        selectFileButton.addEventListener('click', () => {
            if (fileInput) {
                fileInput.click();
            }
        });
    }

    if (fileInput) {
        fileInput.addEventListener('change', () => {
            const files = fileInput.files;
            if (files.length === 0) {
                alert('Please select an image file.');
                return;
            }

            const formData = new FormData();
            formData.append('files', files[0]);

            fetch('https://ff-test-cr3w.onrender.com/generate-font', {
                method: 'POST',
                body: formData
            })
            .then(response => response.arrayBuffer())
            .then(data => {
                const blob = new Blob([data], { type: 'font/ttf' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'generated_font.ttf';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                alert('Font generation successful!');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Font generation failed.');
            });
        });
    }

    // Display any previously captured images (if applicable)
    images.forEach(dataUrl => {
        const img = document.createElement('img');
        img.src = dataUrl;
        preview.appendChild(img);
    });

    function dataURItoBlob(dataURI) {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }
});