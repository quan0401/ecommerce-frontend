type ICheckFileType = 'image' | 'video';

export const validateImage = (file: File, type: ICheckFileType): boolean => {
  if (type === 'image') {
    const validateImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    return file && validateImageTypes.indexOf(file.type) > -1;
  } else {
    const validVideoTypes = ['video/m4v', 'video/avi', 'video/mpg', 'video/mp4', 'video/webm'];
    return file && validVideoTypes.indexOf(type) > -1;
  }
};

export const checkImageSize = (file: File, type: ICheckFileType): string => {
  let fileError = '';
  const isValid: boolean = validateImage(file, type);
  if (!isValid) {
    fileError = `File ${file.name} not accepted`;
  }
  if (file.size > 5e7) {
    fileError = 'File is too large. Must be smaller than 50MB';
  }
  return fileError;
};

export const checkImageOrVideo = (file: File, type: ICheckFileType): boolean => {
  let isValid = true;
  if (!validateImage(file, type)) {
    window.alert(`File ${file.name} not accepted`);
    isValid = false;
    return false;
  }
  if (checkImageSize(file, type)) {
    window.alert(checkImageSize(file, type));
    isValid = false;
    return false;
  }
  return isValid;
};

export const readAsBase64 = async (file: File): Promise<string | ArrayBuffer | null> => {
  const reader: FileReader = new FileReader();
  const fileValue: Promise<string | ArrayBuffer | null> = new Promise((resolve, reject) => {
    reader.addEventListener('load', () => {
      resolve(reader.result);
    });

    reader.addEventListener('error', (event: ProgressEvent<FileReader>) => {
      reject(event);
    });
    reader.readAsDataURL(file);
  });
  return fileValue;
};
