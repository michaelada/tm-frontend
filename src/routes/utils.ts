// ----------------------------------------------------------------------

export const hasParams = (url: string): boolean => {
  const queryString = url.split('?')[1];
  return queryString ? new URLSearchParams(queryString).toString().length > 0 : false;
};

// ----------------------------------------------------------------------

export function removeLastSlash(pathname: string): string {
  /**
   * Remove last slash
   * [1]
   * @input  = '/dashboard/calendar/'
   * @output = '/dashboard/calendar'
   * [2]
   * @input  = '/dashboard/calendar'
   * @output = '/dashboard/calendar'
   */
  if (pathname !== '/' && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

// ----------------------------------------------------------------------

export function removeParams(url: string): string {
  try {
    const urlObj = new URL(url, window.location.origin);

    return removeLastSlash(urlObj.pathname);
  } catch (error) {
    return url;
  }
}

// ----------------------------------------------------------------------

export function isExternalLink(url: string): boolean {
  return url.startsWith('http');
}

export function formatAddress (address: any) {
    let formattedAddress = `${address.address1}, ${address.address2}`;
    if (address.address3 && address.address3 !== '') {
      formattedAddress += `, ${address.address3}`;
    }
    if (address.address4 && address.address4 !== '') {
      formattedAddress += `, ${address.address4}`;
    }
    if (address.city && address.city !== '') {
      formattedAddress += `, ${address.city}`;
    }
    if (address.county && address.county !== '') {
      formattedAddress += `, ${address.county}`;
    }
    return formattedAddress;
  }
