export default function PicNameExtractor(profile_pic_url){  
    const imageName = profile_pic_url.split("/")[6].split(".")[0]

    return imageName
}