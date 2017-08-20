'use strcit'

const sendJson = function (res, err, data) {
  let result = {
    success: (err === null || err === undefined) ? true : false,
    data: data,
    error: err
  }

  res.json(result);
}

export {
  sendJson
}