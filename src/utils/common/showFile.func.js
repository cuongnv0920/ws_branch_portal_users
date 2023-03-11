export function showFile(path) {
  const fileName = path.split("/").slice(1);
  const lastDotIndex = fileName[0].lastIndexOf(".");
  const fileType = fileName[0].substring(lastDotIndex + 1);

  return {
    fileName: fileName[0],
    fileType,
  };
}
