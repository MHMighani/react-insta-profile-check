export default function PicNameExtractor(profile_pic_url) {
	const splitedUrl = profile_pic_url.split('/');
	const imageName = splitedUrl[splitedUrl.length - 1].split('.')[0];

	return imageName;
}
