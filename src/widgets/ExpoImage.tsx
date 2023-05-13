import React, { memo, useCallback } from "react";
import { Image, ImageContentFit } from "expo-image";
import { logoBlurHash } from "../components/blurHash";
import { Colors } from "../constants/Colors";
import { photoUtil } from "../utils/photo";

type Props = {
  uri?: string;
  cacheUri?: string;
  width: number | string;
  height: number | string;
  borderRadius?: number;
  contentFit?: ImageContentFit;
  backgroundColor?: string
};

const ExpoImage = memo(({ uri, cacheUri,width, height,borderRadius,contentFit,backgroundColor }: Props) => {

    const imageStyle = useCallback(() => {
       return{
        width          : width,
        height         : height,
        borderRadius   : borderRadius ? borderRadius : 0,
        backgroundColor: backgroundColor?backgroundColor: Colors.white
        
       };
    },[backgroundColor, borderRadius, height, width]);
  return (
    <Image
      contentFit={contentFit ? contentFit : "cover"}
      placeholder={logoBlurHash}
      source={uri ? photoUtil(uri): cacheUri ? cacheUri : require("../assets/logo.png")}
      style={imageStyle()}
      transition={1000}
    />
  );
});

ExpoImage.displayName = "ExpoImage";

export { ExpoImage };

