export const stringToColor = (string: string) => {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }

  export const replaceUrlParams = (url: string, params: any) => {
    return url.replace(/:(\w+)/g, (_, key) => params[key] ?? `:${key}`);
  }

  export const getCurrentMonthAndYear = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based (0 = January, so add 1)
    const currentYear = currentDate.getFullYear();
    return {currentMonth, currentYear};
  }