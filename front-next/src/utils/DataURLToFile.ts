

export function dataURLtoFile(dataurl: string, filename: string) {
  let arr = dataurl.split(","),
    //@ts-ignore
    mime = arr[0]?.match(/:(.*?);/)[1],
    bstr = window.atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
