//old code version 1.0
// document.addEventListener("DOMContentLoaded", () => {
//     const video = document.getElementById('video');
//     const flipButton = document.getElementById('flipButton');
//     const captureButton = document.getElementById('captureButton');
//     const preview = document.getElementById('preview');
//     const uploadButton = document.getElementById('uploadButton');
//     const fileInput = document.getElementById('fileInput');
//     const selectFileButton = document.getElementById('selectFileButton');
//     let currentStream = null;
//     let useFrontCamera = true;

//     function getCameraStream() {
//         if (currentStream) {
//             currentStream.getTracks().forEach(track => track.stop());
//         }

//         const constraints = {
//             video: {
//                 facingMode: useFrontCamera ? 'user' : 'environment'
//             }
//         };

//         navigator.mediaDevices.getUserMedia(constraints)
//             .then(stream => {
//                 currentStream = stream;
//                 video.srcObject = stream;
//             })
//             .catch(error => {
//                 console.error('Error accessing the camera:', error);
//                 alert('Error accessing the camera.');
//             });
//     }

//     getCameraStream();

//     flipButton.addEventListener('click', () => {
//         useFrontCamera = !useFrontCamera;
//         getCameraStream();
//     });

//     captureButton.addEventListener('click', () => {
//         const canvas = document.createElement('canvas');
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         canvas.getContext('2d').drawImage(video, 0, 0);
//         const img = document.createElement('img');
//         img.src = canvas.toDataURL('image/png');
//         preview.appendChild(img);

//         let imageCount = parseInt(localStorage.getItem('imageCount')) || 0;
//         imageCount++;
//         localStorage.setItem('imageCount', imageCount);
//         localStorage.setItem(`${imageCount}.png`, canvas.toDataURL('image/png'));
//     });

//     uploadButton.addEventListener('click', async () => {
//         const imageCount = parseInt(localStorage.getItem('imageCount')) || 0;
//         if (imageCount === 0) {
//             alert('Please capture some images.');
//             return;
//         }

//         const formData = new FormData();
//         for (let i = 1; i <= imageCount; i++) {
//             const dataUrl = localStorage.getItem(`${i}.png`);
//             if (dataUrl) {
//                 const blob = dataURItoBlob(dataUrl);
//                 formData.append('files', blob, `${i}.png`);
//             }
//         }

//         formData.append('spacing', 500); // Example spacing value

//         try {
//             const response = await fetch('https://ff-test-cr3w.onrender.com/generate-font', {
//                 method: 'POST',
//                 body: formData
//             });

//             const data = await response.arrayBuffer();

//             if (response.ok) {
//                 const blob = new Blob([data], { type: 'font/ttf' });
//                 const url = window.URL.createObjectURL(blob);
//                 const a = document.createElement('a');
//                 a.style.display = 'none';
//                 a.href = url;
//                 a.download = 'generated_font.ttf';
//                 document.body.appendChild(a);
//                 a.click();
//                 window.URL.revokeObjectURL(url);
//                 alert('Font generation successful!');
//             } else {
//                 console.log("Error:", await response.text());
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('Font generation failed.');
//         }

//         while (preview.firstChild) {
//             preview.removeChild(preview.firstChild);
//         }

//         localStorage.clear();
//     });

//     selectFileButton.addEventListener('click', () => {
//         fileInput.click();
//     });

//     fileInput.addEventListener('change', () => {
//         const files = fileInput.files;
//         if (files.length === 0) {
//             alert('Please select an image file.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('files', files[0]);

//         fetch('https://ff-test-cr3w.onrender.com/generate-font', {
//             method: 'POST',
//             body: formData
//         })
//         .then(response => response.arrayBuffer())
//         .then(data => {
//             const blob = new Blob([data], { type: 'font/ttf' });
//             const url = window.URL.createObjectURL(blob);
//             const a = document.createElement('a');
//             a.style.display = 'none';
//             a.href = url;
//             a.download = 'generated_font.ttf';
//             document.body.appendChild(a);
//             a.click();
//             window.URL.revokeObjectURL(url);
//             alert('Font generation successful!');
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('Font generation failed.');
//         });
//     });

//     const imageCount = parseInt(localStorage.getItem('imageCount')) || 0;
//     for (let i = 1; i <= imageCount; i++) {
//         const dataUrl = localStorage.getItem(`${i}.png`);
//         if (dataUrl) {
//             const img = document.createElement('img');
//             img.src = dataUrl;
//             preview.appendChild(img);
//         }
//     }

//     function dataURItoBlob(dataURI) {
//         const byteString = atob(dataURI.split(',')[1]);
//         const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
//         const ab = new ArrayBuffer(byteString.length);
//         const ia = new Uint8Array(ab);
//         for (let i = 0; i < byteString.length; i++) {
//             ia[i] = byteString.charCodeAt(i);
//         }
//         return new Blob([ab], { type: mimeString });
//     }
// });


//code version 1.1
// document.addEventListener("DOMContentLoaded", () => {
//     const video = document.getElementById('video');
//     const flipButton = document.getElementById('flipButton');
//     const captureButton = document.getElementById('captureButton');
//     const preview = document.getElementById('preview');
//     const uploadButton = document.getElementById('uploadButton');
//     const fileInput = document.getElementById('fileInput');
//     const selectFileButton = document.getElementById('selectFileButton');
//     let currentStream = null;
//     let useFrontCamera = true;

//     function getCameraStream() {
//         if (currentStream) {
//             currentStream.getTracks().forEach(track => track.stop());
//         }

//         const constraints = {
//             video: {
//                 facingMode: useFrontCamera ? 'user' : 'environment'
//             }
//         };

//         navigator.mediaDevices.getUserMedia(constraints)
//             .then(stream => {
//                 currentStream = stream;
//                 video.srcObject = stream;
//                 video.addEventListener('loadedmetadata', () => {
//                     // Optionally set up canvas size based on video dimensions
//                 });
//             })
//             .catch(error => {
//                 console.error('Error accessing the camera:', error);
//                 alert('Error accessing the camera.');
//             });
//     }

//     getCameraStream();

//     flipButton.addEventListener('click', () => {
//         useFrontCamera = !useFrontCamera;
//         getCameraStream();
//     });

//     captureButton.addEventListener('click', () => {
//         const videoContainer = document.querySelector('.video-container');
//         const videoWidth = video.videoWidth;
//         const videoHeight = video.videoHeight;
    
//         // Calculate the visible area
//         const containerWidth = videoContainer.clientWidth;
//         const containerHeight = videoContainer.clientHeight;
//         const scale = 1.8; // The scale applied to the video
//         const captureWidth = containerWidth / scale;
//         const captureHeight = containerHeight / scale;
    
//         // Calculate the offset to center the capture
//         const xOffset = (videoWidth - captureWidth) / 2;
//         const yOffset = (videoHeight - captureHeight) / 2;
    
//         const canvas = document.createElement('canvas');
//         canvas.width = containerWidth;
//         canvas.height = containerHeight;
//         const context = canvas.getContext('2d');
    
//         context.drawImage(video, xOffset, yOffset, videoWidth / scale, videoHeight / scale, 0, 0, canvas.width, canvas.height);
    
//         const img = document.createElement('img');
//         img.src = canvas.toDataURL('image/png');
//         preview.appendChild(img);
    
//         let imageCount = parseInt(localStorage.getItem('imageCount')) || 0;
//         imageCount++;
//         localStorage.setItem('imageCount', imageCount);
//         localStorage.setItem(`${imageCount}.png`, canvas.toDataURL('image/png'));
//     });
    

//     uploadButton.addEventListener('click', async () => {
//         const imageCount = parseInt(localStorage.getItem('imageCount')) || 0;
//         if (imageCount === 0) {
//             alert('Please capture some images.');
//             return;
//         }

//         const formData = new FormData();
//         for (let i = 1; i <= imageCount; i++) {
//             const dataUrl = localStorage.getItem(`${i}.png`);
//             if (dataUrl) {
//                 const blob = dataURItoBlob(dataUrl);
//                 formData.append('files', blob, `${i}.png`);
//             }
//         }

//         formData.append('spacing', 500); // Example spacing value

//         try {
//             const response = await fetch('https://ff-test-cr3w.onrender.com/generate-font', {
//                 method: 'POST',
//                 body: formData
//             });

//             const data = await response.arrayBuffer();

//             if (response.ok) {
//                 const blob = new Blob([data], { type: 'font/ttf' });
//                 const url = window.URL.createObjectURL(blob);
//                 const a = document.createElement('a');
//                 a.style.display = 'none';
//                 a.href = url;
//                 a.download = 'generated_font.ttf';
//                 document.body.appendChild(a);
//                 a.click();
//                 window.URL.revokeObjectURL(url);
//                 alert('Font generation successful!');
//             } else {
//                 console.log("Error:", await response.text());
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('Font generation failed.');
//         }

//         while (preview.firstChild) {
//             preview.removeChild(preview.firstChild);
//         }

//         localStorage.clear();
//     });

//     selectFileButton.addEventListener('click', () => {
//         fileInput.click();
//     });

//     fileInput.addEventListener('change', () => {
//         const files = fileInput.files;
//         if (files.length === 0) {
//             alert('Please select an image file.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('files', files[0]);

//         fetch('https://ff-test-cr3w.onrender.com/generate-font', {
//             method: 'POST',
//             body: formData
//         })
//         .then(response => response.arrayBuffer())
//         .then(data => {
//             const blob = new Blob([data], { type: 'font/ttf' });
//             const url = window.URL.createObjectURL(blob);
//             const a = document.createElement('a');
//             a.style.display = 'none';
//             a.href = url;
//             a.download = 'generated_font.ttf';
//             document.body.appendChild(a);
//             a.click();
//             window.URL.revokeObjectURL(url);
//             alert('Font generation successful!');
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('Font generation failed.');
//         });
//     });

//     const imageCount = parseInt(localStorage.getItem('imageCount')) || 0;
//     for (let i = 1; i <= imageCount; i++) {
//         const dataUrl = localStorage.getItem(`${i}.png`);
//         if (dataUrl) {
//             const img = document.createElement('img');
//             img.src = dataUrl;
//             preview.appendChild(img);
//         }
//     }

//     function dataURItoBlob(dataURI) {
//         const byteString = atob(dataURI.split(',')[1]);
//         const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
//         const ab = new ArrayBuffer(byteString.length);
//         const ia = new Uint8Array(ab);
//         for (let i = 0; i < byteString.length; i++) {
//             ia[i] = byteString.charCodeAt(i);
//         }
//         return new Blob([ab], { type: mimeString });
//     }
// });







//===================================version 1.2=================================================
// document.addEventListener("DOMContentLoaded", () => {
//     const video = document.getElementById('video');
//     const flipButton = document.getElementById('flipButton');
//     const captureButton = document.getElementById('captureButton');
//     const preview = document.getElementById('preview');
//     const uploadButton = document.getElementById('uploadButton');
//     const fileInput = document.getElementById('fileInput');
//     const selectFileButton = document.getElementById('selectFileButton');
//     let currentStream = null;
//     let useFrontCamera = true;
//     let images = []; // In-memory array to store captured images

//     function getCameraStream() {
//         if (currentStream) {
//             currentStream.getTracks().forEach(track => track.stop());
//         }

//         const constraints = {
//             video: {
//                 facingMode: useFrontCamera ? 'user' : 'environment'
//             }
//         };

//         navigator.mediaDevices.getUserMedia(constraints)
//             .then(stream => {
//                 currentStream = stream;
//                 video.srcObject = stream;
//                 video.addEventListener('loadedmetadata', () => {
//                     // Optionally set up canvas size based on video dimensions
//                 });
//             })
//             .catch(error => {
//                 console.error('Error accessing the camera:', error);
//                 alert('Error accessing the camera.');
//             });
//     }

//     getCameraStream();

//     flipButton.addEventListener('click', () => {
//         useFrontCamera = !useFrontCamera;
//         getCameraStream();
//     });

//     captureButton.addEventListener('click', () => {
//         const videoContainer = document.querySelector('.video-container');
//         const videoWidth = video.videoWidth;
//         const videoHeight = video.videoHeight;

//         // Calculate the visible area
//         const containerWidth = videoContainer.clientWidth;
//         const containerHeight = videoContainer.clientHeight;
//         const scale = 1.8; // The scale applied to the video
//         const captureWidth = containerWidth / scale;
//         const captureHeight = containerHeight / scale;

//         // Calculate the offset to center the capture
//         const xOffset = (videoWidth - captureWidth) / 3;
//         const yOffset = (videoHeight - captureHeight) / 2;

//         const canvas = document.createElement('canvas');
//         canvas.width = containerWidth;
//         canvas.height = containerHeight;
//         const context = canvas.getContext('2d');

//         context.drawImage(video, xOffset, yOffset, videoWidth / scale, videoHeight / scale, 0, 0, canvas.width, canvas.height);

//         const img = document.createElement('img');
//         img.src = canvas.toDataURL('image/png');
//         preview.appendChild(img);

//         images.push(canvas.toDataURL('image/png')); // Store in in-memory array
//     });

//     uploadButton.addEventListener('click', async () => {
//         if (images.length === 0) {
//             alert('Please capture some images.');
//             return;
//         }

//         const formData = new FormData();
//         images.forEach((dataUrl, index) => {
//             const blob = dataURItoBlob(dataUrl);
//             formData.append('files', blob, `${index + 1}.png`);
//         });

//         formData.append('spacing', 500); // Example spacing value

//         try {
//             const response = await fetch('https://ff-test-cr3w.onrender.com/generate-font', {
//                 method: 'POST',
//                 body: formData
//             });

//             const data = await response.arrayBuffer();

//             if (response.ok) {
//                 const blob = new Blob([data], { type: 'font/ttf' });
//                 const url = window.URL.createObjectURL(blob);
//                 const a = document.createElement('a');
//                 a.style.display = 'none';
//                 a.href = url;
//                 a.download = 'generated_font.ttf';
//                 document.body.appendChild(a);
//                 a.click();
//                 window.URL.revokeObjectURL(url);
//                 alert('Font generation successful!');
//             } else {
//                 console.log("Error:", await response.text());
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('Font generation failed.');
//         }

//         while (preview.firstChild) {
//             preview.removeChild(preview.firstChild);
//         }

//         images = []; // Clear the in-memory array
//     });

//     selectFileButton.addEventListener('click', () => {
//         fileInput.click();
//     });

//     fileInput.addEventListener('change', () => {
//         const files = fileInput.files;
//         if (files.length === 0) {
//             alert('Please select an image file.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('files', files[0]);

//         fetch('https://ff-test-cr3w.onrender.com/generate-font', {
//             method: 'POST',
//             body: formData
//         })
//         .then(response => response.arrayBuffer())
//         .then(data => {
//             const blob = new Blob([data], { type: 'font/ttf' });
//             const url = window.URL.createObjectURL(blob);
//             const a = document.createElement('a');
//             a.style.display = 'none';
//             a.href = url;
//             a.download = 'generated_font.ttf';
//             document.body.appendChild(a);
//             a.click();
//             window.URL.revokeObjectURL(url);
//             alert('Font generation successful!');
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('Font generation failed.');
//         });
//     });

//     // Display any previously captured images (if applicable)
//     images.forEach(dataUrl => {
//         const img = document.createElement('img');
//         img.src = dataUrl;
//         preview.appendChild(img);
//     });

//     function dataURItoBlob(dataURI) {
//         const byteString = atob(dataURI.split(',')[1]);
//         const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
//         const ab = new ArrayBuffer(byteString.length);
//         const ia = new Uint8Array(ab);
//         for (let i = 0; i < byteString.length; i++) {
//             ia[i] = byteString.charCodeAt(i);
//         }
//         return new Blob([ab], { type: mimeString });
//     }
// });

// ============= version 1.3 ====================
// document.addEventListener("DOMContentLoaded", () => {
//     const video = document.getElementById('video');
//     const flipButton = document.getElementById('flipButton');
//     const captureButton = document.getElementById('captureButton');
//     const preview = document.getElementById('preview');
//     const uploadButton = document.getElementById('uploadButton');
//     const fileInput = document.getElementById('fileInput');
//     const selectFileButton = document.getElementById('selectFileButton');
//     let currentStream = null;
//     let useFrontCamera = true;
//     let images = []; // In-memory array to store captured images

//     function getCameraStream() {
//         if (currentStream) {
//             currentStream.getTracks().forEach(track => track.stop());
//         }

//         const constraints = {
//             video: {
//                 facingMode: useFrontCamera ? 'user' : 'environment',
               
//             }
//         };

//         navigator.mediaDevices.getUserMedia(constraints)
//             .then(stream => {
//                 currentStream = stream;
//                 video.srcObject = stream;
//                 video.addEventListener('loadedmetadata', () => {
//                     // Optionally set up canvas size based on video dimensions
//                 });
//             })
//             .catch(error => {
//                 console.error('Error accessing the camera:', error);
//                 alert('Error accessing the camera.');
//             });
//     }

//     getCameraStream();

//     flipButton.addEventListener('click', () => {
//         useFrontCamera = !useFrontCamera;
//         getCameraStream();
//     });

//     captureButton.addEventListener('click', () => {
//         const videoWidth = video.videoWidth;
//         const videoHeight = video.videoHeight;

//         const scale = 7.5; // Increase the scale for a more zoomed-in capture
//         const captureWidth = videoWidth / scale;
//         const captureHeight = videoHeight / scale;

//         // Calculate the offset to center the capture
//         const xOffset = (videoWidth - captureWidth) / 2;
//         const yOffset = (videoHeight - captureHeight) / 2;

//         const canvas = document.createElement('canvas');
//         canvas.width = captureWidth;
//         canvas.height = captureHeight;
//         const context = canvas.getContext('2d');

//         context.drawImage(video, xOffset, yOffset, captureWidth, captureHeight, 0, 0, canvas.width, canvas.height);

//         const img = document.createElement('img');
//         img.src = canvas.toDataURL('image/png');
//         preview.appendChild(img);

//         images.push(canvas.toDataURL('image/png')); // Store in in-memory array
//     });

//     uploadButton.addEventListener('click', async () => {
//         if (images.length === 0) {
//             alert('Please capture some images.');
//             return;
//         }

//         const formData = new FormData();
//         images.forEach((dataUrl, index) => {
//             const blob = dataURItoBlob(dataUrl);
//             formData.append('files', blob, `${index + 1}.png`);
//         });

//         formData.append('spacing', 500); // Example spacing value

//         try {
//             const response = await fetch('https://ff-test-cr3w.onrender.com/generate-font', {
//                 method: 'POST',
//                 body: formData
//             });

//             const data = await response.arrayBuffer();

//             if (response.ok) {
//                 const blob = new Blob([data], { type: 'font/ttf' });
//                 const url = window.URL.createObjectURL(blob);
//                 const a = document.createElement('a');
//                 a.style.display = 'none';
//                 a.href = url;
//                 a.download = 'generated_font.ttf';
//                 document.body.appendChild(a);
//                 a.click();
//                 window.URL.revokeObjectURL(url);
//                 alert('Font generation successful!');
//             } else {
//                 console.log("Error:", await response.text());
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('Font generation failed.');
//         }

//         while (preview.firstChild) {
//             preview.removeChild(preview.firstChild);
//         }

//         images = []; // Clear the in-memory array
//     });

//     selectFileButton.addEventListener('click', () => {
//         fileInput.click();
//     });

//     fileInput.addEventListener('change', () => {
//         const files = fileInput.files;
//         if (files.length === 0) {
//             alert('Please select an image file.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('files', files[0]);

//         fetch('https://ff-test-cr3w.onrender.com/generate-font', {
//             method: 'POST',
//             body: formData
//         })
//         .then(response => response.arrayBuffer())
//         .then(data => {
//             const blob = new Blob([data], { type: 'font/ttf' });
//             const url = window.URL.createObjectURL(blob);
//             const a = document.createElement('a');
//             a.style.display = 'none';
//             a.href = url;
//             a.download = 'generated_font.ttf';
//             document.body.appendChild(a);
//             a.click();
//             window.URL.revokeObjectURL(url);
//             alert('Font generation successful!');
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('Font generation failed.');
//         });
//     });

//     // Display any previously captured images (if applicable)
//     images.forEach(dataUrl => {
//         const img = document.createElement('img');
//         img.src = dataUrl;
//         preview.appendChild(img);
//     });

//     function dataURItoBlob(dataURI) {
//         const byteString = atob(dataURI.split(',')[1]);
//         const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
//         const ab = new ArrayBuffer(byteString.length);
//         const ia = new Uint8Array(ab);
//         for (let i = 0; i < byteString.length; i++) {
//             ia[i] = byteString.charCodeAt(i);
//         }
//         return new Blob([ab], { type: mimeString });
//     }
// });


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
