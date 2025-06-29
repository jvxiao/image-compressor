
export const frindlyFileSize = (bytes) => {
  const kB = bytes / 1024;
  if(kB > 0 && kB < 1024) {
    return kB.toFixed(2) + ' kB';
  }
  if(kB > 1024) {
    const MB = kB / 1024;
     if(MB > 0 && MB < 1024) {
        return MB.toFixed(2) + ' MB';
     }
     if(MB > 1024) {
      const GB = MB / 1024;
        if(GB > 0 && GB < 1024) {
            return GB.toFixed(2) + ' G';
        }
     }
  }
}