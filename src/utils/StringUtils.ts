export const getVideoCode = (videoUrl: string) => {
  return videoUrl
  .split("v=")[1]
  .split("&")[0];
};
