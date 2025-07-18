import axios from "axios"


export const imageUpload = async image =>{
    const formData = new FormData()
    formData.append('image', image)
    const {data} = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_API}`,
        formData
    )
    return data.data.display_url
}