export const isMobile = () => {
    return window.innerWidth < 1080;
  };
  
  export const addResizeListener = (callback) => {
    window.addEventListener('resize', callback);
  };
  
  export const removeResizeListener = (callback) => {
    window.removeEventListener('resize', callback);
  };