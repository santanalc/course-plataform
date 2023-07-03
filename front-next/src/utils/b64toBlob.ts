export async function b64toBlob(b64Data: string) {
  // let sliceSize = 512;

  // var b64DataString = b64Data.substr(b64Data.indexOf(",") + 1);
  // var byteCharacters = atob(b64DataString);
  // var byteArrays = [];

  // for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
  //   var slice = byteCharacters.slice(offset, offset + sliceSize);

  //   var byteNumbers = new Array(slice.length);
  //   for (var i = 0; i < slice.length; i++) {
  //     byteNumbers[i] = slice.charCodeAt(i);
  //   }

  //   var byteArray = new Uint8Array(byteNumbers);

  //   byteArrays.push(byteArray);
  // }

  // var blob = new Blob(byteArrays, {
  //   type: "image/png",
  // });

  const base64Response = await fetch(b64Data);

  return base64Response.blob();
}
