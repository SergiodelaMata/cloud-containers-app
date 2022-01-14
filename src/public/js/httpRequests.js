async function getRequest(url) {
  const response = await fetch(url, {
    method: "GET",
  });
  return await response.json();
}

async function postRequest(url, data) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return await response.json();
}

async function putRequest(url, data = null) {
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(data ? data : {}),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return await response.json();
}

async function deleteRequest(url) {
  const response = await fetch(url, {
    method: "DELETE",
  });
  return await response.json();
}
