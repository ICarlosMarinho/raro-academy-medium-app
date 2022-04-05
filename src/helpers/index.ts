const defaultDateFormat: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "2-digit",
  year: "numeric"
};

export const formataData = (date: Date, format = defaultDateFormat) => {
  return Intl.DateTimeFormat("pt-BR", format).format(date);
};

export const parseArticle = (article: Article): Article => {
  return {
    ...article,
    autor: {
      id: article.autor.id,
      nome: article.autor.nome,
      avatar: article.autor.avatar
    }
  };
};

export const getTokenDataFromStorage = () => {
  try {
    const tokenDataString = localStorage.getItem("tokenData");

    if (tokenDataString) {
      return JSON.parse(tokenDataString) as TokenData;
    }

    return null;
  } catch (_error) {
    return null;
  }
};

export const setTokenDataToStorage = (tokenData: TokenData) => {
  try {
    localStorage.setItem("tokenData", JSON.stringify(tokenData));

    return true;
  } catch (_error) {
    return false;
  }
};

export const clearTokenDataFromStorage = () => {
  try {
    localStorage.removeItem("tokenData");

    return true;
  } catch (_error) {
    return false;
  }
};

export const getBase64 = (image: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(image);

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
  });
};

export const tokenExpired = (token: string) => {
  try {
    const now = new Date();
    const { exp } = JSON.parse(window.atob(token.split(".")[1]));
    const expiresIn = parseInt(exp) * 1000;

    return expiresIn < now.getTime();
  } catch (error) {
    return false;
  }
};
