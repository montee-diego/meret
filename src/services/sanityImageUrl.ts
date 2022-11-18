import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "@services/sanityClient";

const builder = imageUrlBuilder(sanityClient);
const sanityImageUrl = (source: string) => builder.image(source);

export default sanityImageUrl;
