function getRequestParams(req, paramList) {
  if (typeof paramList == "string") {
    return req.body[paramList] || req.headers[`x-access-${paramList}`];
  } else if (Array.isArray(paramList)) {
    const values = {};

    for (const value of paramList) {
      let newValue = req.body[value] || req.headers[`x-access-${value}`];
      if (newValue != undefined) values[value] = newValue;
    }

    return values;
  }
  return null;
}

module.exports = { getRequestParams };
