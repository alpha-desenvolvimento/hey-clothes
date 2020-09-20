function getRequestParams(req, paramList) {
  if (typeof paramList == "string") {
    return req.body[paramList] || req.headers[`x-access-${paramList}`];
  } else if (Array.isArray(paramList)) {
    const values = {};

    for (const value of paramList) {
      values[value] = req.body[value] || req.headers[`x-access-${value}`];
    }

    return values;
  }
  return null;
}

module.exports = { getRequestParams };
