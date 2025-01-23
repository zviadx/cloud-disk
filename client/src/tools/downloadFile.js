// import axios from "axios";


export const getDownloadFile = (file) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:5000/api/files/download?file=${file._id}`, {
            headers: {authorization: `Bearer ${localStorage.getItem('token')}`}
        })
                if (response.status === 200) {
                    const blob = await response.blob()
                    const downloadUrl = window.URL.createObjectURL(blob)
                    const link = document.createElement('a')
                    link.href = downloadUrl
                    link.download = file.name
                    document.body.appendChild(link)
                    link.click()
                    link.remove()
                } else {
                    alert("ყლეში ვართ")
                }

    } catch (err) {
        alert(err.message)
    }

}