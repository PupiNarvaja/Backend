const cookieParser = () => {
    return (document.cookie || "").split("; ").reduce((obj, cookie) => {
      const [name, value] = cookie.split("=");
      obj[name] = decodeURI(value);
      return obj;
    }, {});
}

export default cookieParser